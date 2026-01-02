// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./HealthBadgeSBT.sol";
import "./ProtocolCommitmentRegistry.sol";

/**
 * @title QuadraticStaking
 * @notice Quadratic staking with adherence multipliers based on health badges
 * @dev APY scales quadratically with verified adherence badges
 */
contract QuadraticStaking is Ownable {
    IERC20 public token; // $tabledadrian token
    HealthBadgeSBT public badgeSBT;
    ProtocolCommitmentRegistry public commitmentRegistry;
    
    // Base APY (5% = 500 basis points)
    uint256 public constant BASE_APY_BPS = 500; // 5%
    
    // Badge multipliers (in basis points)
    uint256 public constant BADGE_MULTIPLIER_BPS = 200; // +2% per badge
    uint256 public constant CLINICIAN_BONUS_BPS = 300; // +3% for clinician badge
    uint256 public constant MAX_BADGES = 3; // Max concurrent badges for multiplier
    
    // Slash percentage (10% = 1000 basis points)
    uint256 public constant SLASH_PERCENTAGE_BPS = 1000; // 10%
    
    // Mapping: user => staked amount
    mapping(address => uint256) public stakedAmounts;
    
    // Mapping: user => stake start timestamp
    mapping(address => uint256) public stakeStartTimes;
    
    // Mapping: user => badge IDs used for multiplier
    mapping(address => uint256[]) public userBadgeIds;
    
    // Events
    event Staked(address indexed user, uint256 amount, uint256[] badgeIds);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);
    event StakeSlashed(address indexed user, uint256 amount, uint256 protocolId);
    
    constructor(
        address _token,
        address _badgeSBT,
        address _commitmentRegistry
    ) Ownable(msg.sender) {
        token = IERC20(_token);
        badgeSBT = HealthBadgeSBT(_badgeSBT);
        commitmentRegistry = ProtocolCommitmentRegistry(_commitmentRegistry);
    }
    
    /**
     * @notice Stake tokens with adherence badges
     * @param amount Amount of tokens to stake
     * @param badgeIds Array of badge token IDs for multiplier calculation
     */
    function stakeWithAdherence(
        uint256 amount,
        uint256[] calldata badgeIds
    ) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            token.transferFrom(msg.sender, address(this), amount),
            "Token transfer failed"
        );
        
        // Verify badges belong to user and are valid
        uint256 validBadgeCount = 0;
        for (uint256 i = 0; i < badgeIds.length && i < MAX_BADGES; i++) {
            if (badgeSBT.ownerOf(badgeIds[i]) == msg.sender) {
                validBadgeCount++;
            }
        }
        
        // Update stake
        stakedAmounts[msg.sender] += amount;
        stakeStartTimes[msg.sender] = block.timestamp;
        
        // Store badge IDs (up to MAX_BADGES)
        delete userBadgeIds[msg.sender];
        for (uint256 i = 0; i < validBadgeCount; i++) {
            userBadgeIds[msg.sender].push(badgeIds[i]);
        }
        
        emit Staked(msg.sender, amount, badgeIds);
    }
    
    /**
     * @notice Calculate APY for a user based on badges
     * @param user The user address
     * @return apyBps APY in basis points
     */
    function calculateAPY(address user) external view returns (uint256 apyBps) {
        uint256 apy = BASE_APY_BPS;
        
        // Add badge multiplier (up to MAX_BADGES)
        uint256 badgeCount = userBadgeIds[user].length;
        if (badgeCount > MAX_BADGES) {
            badgeCount = MAX_BADGES;
        }
        apy += badgeCount * BADGE_MULTIPLIER_BPS;
        
        // Check for clinician-attested badge (badge type 1)
        bool hasClinicianBadge = false;
        for (uint256 i = 0; i < userBadgeIds[user].length; i++) {
            HealthBadgeSBT.BadgeType badgeType = badgeSBT.badgeTypes(userBadgeIds[user][i]);
            if (badgeType == HealthBadgeSBT.BadgeType.CLINICIAN_ATTESTED) {
                hasClinicianBadge = true;
                break;
            }
        }
        
        if (hasClinicianBadge) {
            apy += CLINICIAN_BONUS_BPS;
        }
        
        return apy;
    }
    
    /**
     * @notice Calculate rewards earned by a user
     * @param user The user address
     * @return rewards Amount of tokens earned as rewards
     */
    function calculateRewards(address user) external view returns (uint256 rewards) {
        uint256 staked = stakedAmounts[user];
        if (staked == 0) {
            return 0;
        }
        
        uint256 apyBps = this.calculateAPY(user);
        uint256 stakeDuration = block.timestamp - stakeStartTimes[user];
        uint256 secondsInYear = 365 days;
        
        // rewards = staked * (APY / 10000) * (duration / secondsInYear)
        rewards = (staked * apyBps * stakeDuration) / (10000 * secondsInYear);
        
        return rewards;
    }
    
    /**
     * @notice Claim staking rewards
     */
    function claimRewards() external {
        uint256 rewards = this.calculateRewards(msg.sender);
        require(rewards > 0, "No rewards to claim");
        
        // Reset stake start time (compound interest)
        stakeStartTimes[msg.sender] = block.timestamp;
        
        require(
            token.transfer(msg.sender, rewards),
            "Reward transfer failed"
        );
        
        emit RewardsClaimed(msg.sender, rewards);
    }
    
    /**
     * @notice Unstake tokens
     * @param amount Amount to unstake
     */
    function unstake(uint256 amount) external {
        require(amount > 0, "Amount must be greater than 0");
        require(
            stakedAmounts[msg.sender] >= amount,
            "Insufficient staked balance"
        );
        
        stakedAmounts[msg.sender] -= amount;
        
        require(
            token.transfer(msg.sender, amount),
            "Unstake transfer failed"
        );
        
        emit Unstaked(msg.sender, amount);
    }
    
    /**
     * @notice Slash stake for missed protocol commitments
     * @param user The user address
     * @param protocolId The protocol ID
     * @param amount The amount to slash
     */
    function slash(
        address user,
        uint256 protocolId,
        uint256 amount
    ) external {
        // Only commitment registry can call this
        require(
            msg.sender == address(commitmentRegistry),
            "Only commitment registry can slash"
        );
        
        // Check if user has missed reveals
        (bool shouldSlash, ) = commitmentRegistry.checkMissedReveals(
            user,
            protocolId
        );
        require(shouldSlash, "Slash threshold not met");
        
        uint256 slashAmount = (stakedAmounts[user] * SLASH_PERCENTAGE_BPS) / 10000;
        if (slashAmount > amount) {
            slashAmount = amount;
        }
        
        if (slashAmount > 0 && stakedAmounts[user] >= slashAmount) {
            stakedAmounts[user] -= slashAmount;
            
            // Transfer slashed amount to treasury (or burn)
            require(
                token.transfer(owner(), slashAmount),
                "Slash transfer failed"
            );
            
            emit StakeSlashed(user, slashAmount, protocolId);
        }
    }
    
    /**
     * @notice Get user's staking info
     * @param user The user address
     * @return stakedAmount Current staked amount
     * @return apyBps Current APY in basis points
     * @return rewards Current rewards earned
     * @return badgeCount Number of badges used for multiplier
     */
    function getStakingInfo(address user)
        external
        view
        returns (
            uint256 stakedAmount,
            uint256 apyBps,
            uint256 rewards,
            uint256 badgeCount
        )
    {
        stakedAmount = stakedAmounts[user];
        apyBps = this.calculateAPY(user);
        rewards = this.calculateRewards(user);
        badgeCount = userBadgeIds[user].length;
    }
}













