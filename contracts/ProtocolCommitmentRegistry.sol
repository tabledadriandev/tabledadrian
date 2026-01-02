// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ProtocolCommitmentRegistry
 * @notice Manages time-locked commitments for protocol adherence
 * @dev Users commit to protocol intents, reveal daily, track streaks
 */
contract ProtocolCommitmentRegistry {
    // Mapping: user => protocolId => day => commitment
    mapping(address => mapping(uint256 => mapping(uint256 => bytes32))) public commitments;
    
    // Mapping: user => protocolId => day => revealed
    mapping(address => mapping(uint256 => mapping(uint256 => bool))) public revealed;
    
    // Mapping: user => protocolId => streak length
    mapping(address => mapping(uint256 => uint256)) public streaks;
    
    // Mapping: user => protocolId => last commitment day
    mapping(address => mapping(uint256 => uint256)) public lastCommitmentDay;
    
    // Mapping: user => protocolId => missed reveals count
    mapping(address => mapping(uint256 => uint256)) public missedReveals;
    
    // Time window for reveals (24 hours in seconds)
    uint256 public constant REVEAL_WINDOW = 24 hours;
    
    // Slash threshold (3 missed reveals)
    uint256 public constant SLASH_THRESHOLD = 3;
    
    // Events
    event ProtocolCommitted(
        address indexed user,
        uint256 indexed protocolId,
        uint256 indexed day,
        bytes32 commitment
    );
    
    event ProtocolRevealed(
        address indexed user,
        uint256 indexed protocolId,
        uint256 indexed day,
        bytes32 nonce,
        bytes32 protocolHash
    );
    
    event StreakUpdated(
        address indexed user,
        uint256 indexed protocolId,
        uint256 newStreak
    );
    
    event StakeSlashed(
        address indexed user,
        uint256 indexed protocolId,
        uint256 amount
    );
    
    /**
     * @notice Commit to a protocol for a specific day
     * @param commitment The Pedersen commitment hash
     * @param protocolId The protocol identifier
     * @param day The day number (Unix timestamp / 86400)
     */
    function commitProtocol(
        bytes32 commitment,
        uint256 protocolId,
        uint256 day
    ) external {
        require(commitment != bytes32(0), "Invalid commitment");
        require(protocolId > 0, "Invalid protocol ID");
        require(day > 0, "Invalid day");
        
        // Prevent overwriting existing commitments
        require(
            commitments[msg.sender][protocolId][day] == bytes32(0),
            "Commitment already exists for this day"
        );
        
        commitments[msg.sender][protocolId][day] = commitment;
        lastCommitmentDay[msg.sender][protocolId] = day;
        
        emit ProtocolCommitted(msg.sender, protocolId, day, commitment);
    }
    
    /**
     * @notice Reveal a protocol commitment
     * @param nonce The random nonce used in the commitment
     * @param protocolHash The hash of the protocol intent
     * @param protocolId The protocol identifier
     * @param day The day number
     */
    function revealProtocol(
        bytes32 nonce,
        bytes32 protocolHash,
        uint256 protocolId,
        uint256 day
    ) external {
        bytes32 commitment = commitments[msg.sender][protocolId][day];
        require(commitment != bytes32(0), "No commitment found");
        require(!revealed[msg.sender][protocolId][day], "Already revealed");
        
        // Verify commitment matches reveal
        bytes32 computedCommitment = keccak256(abi.encodePacked(protocolHash, nonce));
        require(computedCommitment == commitment, "Invalid reveal");
        
        // Check reveal window (must reveal within 24 hours of commitment day)
        uint256 currentDay = block.timestamp / 86400;
        require(day >= currentDay - 1 && day <= currentDay, "Reveal window expired");
        
        revealed[msg.sender][protocolId][day] = true;
        
        // Update streak
        uint256 currentStreak = streaks[msg.sender][protocolId];
        if (day == currentStreak + 1 || currentStreak == 0) {
            streaks[msg.sender][protocolId] = day;
            emit StreakUpdated(msg.sender, protocolId, day);
        } else {
            // Streak broken
            streaks[msg.sender][protocolId] = 0;
            missedReveals[msg.sender][protocolId]++;
            
            emit StreakUpdated(msg.sender, protocolId, 0);
        }
        
        emit ProtocolRevealed(msg.sender, protocolId, day, nonce, protocolHash);
    }
    
    /**
     * @notice Check current streak for a protocol
     * @param user The user address
     * @param protocolId The protocol identifier
     * @return streak The current streak length (in days)
     */
    function checkStreak(address user, uint256 protocolId)
        external
        view
        returns (uint256 streak)
    {
        return streaks[user][protocolId];
    }
    
    /**
     * @notice Check if user has missed reveals (for slashing)
     * @param user The user address
     * @param protocolId The protocol identifier
     * @return shouldSlash Whether stake should be slashed
     * @return missedCount Number of missed reveals
     */
    function checkMissedReveals(address user, uint256 protocolId)
        external
        view
        returns (bool shouldSlash, uint256 missedCount)
    {
        missedCount = missedReveals[user][protocolId];
        shouldSlash = missedCount >= SLASH_THRESHOLD;
    }
    
    /**
     * @notice Slash stake for missed reveals (called by staking contract)
     * @param user The user address
     * @param protocolId The protocol identifier
     * @param amount The amount to slash
     */
    function slashStake(
        address user,
        uint256 protocolId,
        uint256 amount
    ) external {
        // In production, this would be called by the staking contract
        // For now, we just emit an event
        require(
            missedReveals[user][protocolId] >= SLASH_THRESHOLD,
            "Slash threshold not met"
        );
        
        emit StakeSlashed(user, protocolId, amount);
    }
    
    /**
     * @notice Get commitment info
     * @param user The user address
     * @param protocolId The protocol identifier
     * @param day The day number
     * @return hasCommitment Whether a commitment exists
     * @return commitment The commitment hash
     * @return isRevealed Whether it has been revealed
     */
    function getCommitmentInfo(
        address user,
        uint256 protocolId,
        uint256 day
    )
        external
        view
        returns (
            bool hasCommitment,
            bytes32 commitment,
            bool isRevealed
        )
    {
        commitment = commitments[user][protocolId][day];
        hasCommitment = commitment != bytes32(0);
        isRevealed = revealed[user][protocolId][day];
    }
}













