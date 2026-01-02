// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title HealthBadgeSBT
 * @notice Soulbound Token (SBT) for health badges - non-transferable ERC-721
 * @dev Badges represent verified health achievements and cannot be transferred
 */
contract HealthBadgeSBT is ERC721, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIdCounter;
    
    // Badge types enum
    enum BadgeType {
        THIRTY_DAY_ADHERENCE,
        CLINICIAN_ATTESTED,
        SLEEP_IMPROVEMENT,
        METABOLIC_SIGNATURE,
        PROTOCOL_WARRIOR
    }
    
    // Mapping: tokenId => badge type
    mapping(uint256 => BadgeType) public badgeTypes;
    
    // Mapping: user => badge type => tokenId (for quick lookup)
    mapping(address => mapping(BadgeType => uint256)) public userBadges;
    
    // Mapping: tokenId => data hash (points to encrypted IPFS CID)
    mapping(uint256 => bytes32) public badgeDataHashes;
    
    // Mapping: tokenId => metadata URI
    mapping(uint256 => string) private _tokenURIs;
    
    // EIP-1271 signature verifier for contract wallets
    bytes4 private constant EIP1271_MAGIC_VALUE = 0x1626ba7e;
    
    // Events
    event BadgeMinted(
        address indexed to,
        uint256 indexed tokenId,
        BadgeType badgeType,
        bytes32 dataHash
    );
    
    event BadgeBurned(uint256 indexed tokenId);
    
    constructor() ERC721("Table d'Adrian Health Badge", "TAHB") Ownable(msg.sender) {}
    
    /**
     * @notice Mint a health badge (SBT)
     * @param to The recipient address
     * @param badgeType The type of badge
     * @param dataHash Hash of the badge data (points to encrypted IPFS CID)
     * @param tokenURI Metadata URI for the badge
     * @return tokenId The minted token ID
     */
    function mintBadge(
        address to,
        BadgeType badgeType,
        bytes32 dataHash,
        string memory tokenURI
    ) external onlyOwner returns (uint256) {
        require(to != address(0), "Cannot mint to zero address");
        require(dataHash != bytes32(0), "Invalid data hash");
        
        // Check if user already has this badge type
        require(
            userBadges[to][badgeType] == 0,
            "User already has this badge type"
        );
        
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        
        _safeMint(to, tokenId);
        badgeTypes[tokenId] = badgeType;
        userBadges[to][badgeType] = tokenId;
        badgeDataHashes[tokenId] = dataHash;
        _tokenURIs[tokenId] = tokenURI;
        
        emit BadgeMinted(to, tokenId, badgeType, dataHash);
        
        return tokenId;
    }
    
    /**
     * @notice Mint badge with EIP-1271 clinician signature
     * @param to The recipient address
     * @param badgeType The type of badge
     * @param dataHash Hash of the badge data
     * @param tokenURI Metadata URI
     * @param clinicianContract Address of clinician's contract wallet
     * @param signature EIP-1271 signature from clinician
     * @return tokenId The minted token ID
     */
    function mintBadgeWithClinicianAttestation(
        address to,
        BadgeType badgeType,
        bytes32 dataHash,
        string memory tokenURI,
        address clinicianContract,
        bytes memory signature
    ) external onlyOwner returns (uint256) {
        require(badgeType == BadgeType.CLINICIAN_ATTESTED, "Invalid badge type");
        
        // Verify EIP-1271 signature
        bytes32 messageHash = keccak256(abi.encodePacked(to, badgeType, dataHash));
        bytes32 ethSignedMessageHash = keccak256(
            abi.encodePacked("\x19Ethereum Signed Message:\n32", messageHash)
        );
        
        (bool success, bytes memory result) = clinicianContract.call(
            abi.encodeWithSignature(
                "isValidSignature(bytes32,bytes)",
                ethSignedMessageHash,
                signature
            )
        );
        
        require(success, "EIP-1271 verification failed");
        require(
            abi.decode(result, (bytes4)) == EIP1271_MAGIC_VALUE,
            "Invalid clinician signature"
        );
        
        return mintBadge(to, badgeType, dataHash, tokenURI);
    }
    
    /**
     * @notice Burn a badge (revoke)
     * @param tokenId The token ID to burn
     */
    function burnBadge(uint256 tokenId) external onlyOwner {
        address owner = ownerOf(tokenId);
        BadgeType badgeType = badgeTypes[tokenId];
        
        delete userBadges[owner][badgeType];
        delete badgeTypes[tokenId];
        delete badgeDataHashes[tokenId];
        delete _tokenURIs[tokenId];
        
        _burn(tokenId);
        
        emit BadgeBurned(tokenId);
    }
    
    /**
     * @notice Check if user has a specific badge type
     * @param user The user address
     * @param badgeType The badge type to check
     * @return hasBadge Whether the user has the badge
     * @return tokenId The token ID if they have it, 0 otherwise
     */
    function hasBadge(address user, BadgeType badgeType)
        external
        view
        returns (bool hasBadge, uint256 tokenId)
    {
        tokenId = userBadges[user][badgeType];
        hasBadge = tokenId != 0 && _ownerOf(tokenId) == user;
    }
    
    /**
     * @notice Override transfer functions to make tokens non-transferable (SBT)
     */
    function _update(address to, uint256 tokenId, address auth)
        internal
        override
        returns (address)
    {
        address from = _ownerOf(tokenId);
        
        // Only allow minting (from zero address) and burning (to zero address)
        require(
            to == address(0) || from == address(0),
            "Health badges are non-transferable (SBT)"
        );
        
        return super._update(to, tokenId, auth);
    }
    
    /**
     * @notice Get token URI
     * @param tokenId The token ID
     * @return URI The token metadata URI
     */
    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return _tokenURIs[tokenId];
    }
    
    /**
     * @notice Get badge data hash
     * @param tokenId The token ID
     * @return dataHash The hash pointing to encrypted IPFS CID
     */
    function getBadgeDataHash(uint256 tokenId)
        external
        view
        returns (bytes32 dataHash)
    {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return badgeDataHashes[tokenId];
    }
}



