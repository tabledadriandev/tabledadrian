// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MerkleBiomarkerRegistry
 * @notice Stores weekly Merkle roots of biomarker logs for Table d'Adrian users
 * @dev Gas-optimized: stores only 32-byte roots, not individual logs
 */
contract MerkleBiomarkerRegistry {
    // Mapping: user address => week timestamp => merkle root
    mapping(address => mapping(uint256 => bytes32)) public weeklyRoots;
    
    // Mapping: user address => week timestamp => submission timestamp
    mapping(address => mapping(uint256 => uint256)) public submissionTimestamps;
    
    // Events
    event WeeklyRootSubmitted(
        address indexed user,
        uint256 indexed weekTimestamp,
        bytes32 merkleRoot,
        uint256 timestamp
    );
    
    event BiomarkerVerified(
        address indexed user,
        uint256 indexed weekTimestamp,
        bytes32 leafHash,
        bool verified
    );
    
    /**
     * @notice Submit a weekly Merkle root for biomarker logs
     * @param merkleRoot The Merkle root hash of the week's biomarker logs
     * @param weekTimestamp The start timestamp of the week (Monday 00:00:00 UTC)
     */
    function submitWeeklyRoot(bytes32 merkleRoot, uint256 weekTimestamp) external {
        require(merkleRoot != bytes32(0), "Merkle root cannot be zero");
        require(weekTimestamp > 0, "Week timestamp must be valid");
        
        // Prevent overwriting existing roots (data integrity)
        require(
            weeklyRoots[msg.sender][weekTimestamp] == bytes32(0),
            "Root already submitted for this week"
        );
        
        weeklyRoots[msg.sender][weekTimestamp] = merkleRoot;
        submissionTimestamps[msg.sender][weekTimestamp] = block.timestamp;
        
        emit WeeklyRootSubmitted(msg.sender, weekTimestamp, merkleRoot, block.timestamp);
    }
    
    /**
     * @notice Verify a biomarker log entry using Merkle proof
     * @param user The user address who submitted the weekly root
     * @param weekTimestamp The week timestamp for the root
     * @param leafHash The hash of the biomarker log entry to verify
     * @param proof Array of sibling hashes in the Merkle proof path
     * @param proofIndices Array indicating left (0) or right (1) for each proof element
     * @return verified Whether the proof is valid
     */
    function verifyBiomarkerLog(
        address user,
        uint256 weekTimestamp,
        bytes32 leafHash,
        bytes32[] calldata proof,
        uint256[] calldata proofIndices
    ) external view returns (bool verified) {
        bytes32 root = weeklyRoots[user][weekTimestamp];
        require(root != bytes32(0), "No root found for this week");
        require(proof.length == proofIndices.length, "Proof length mismatch");
        
        bytes32 currentHash = leafHash;
        
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 sibling = proof[i];
            bool isRight = proofIndices[i] == 1;
            
            if (isRight) {
                currentHash = keccak256(abi.encodePacked(currentHash, sibling));
            } else {
                currentHash = keccak256(abi.encodePacked(sibling, currentHash));
            }
        }
        
        verified = currentHash == root;
        
        emit BiomarkerVerified(user, weekTimestamp, leafHash, verified);
    }
    
    /**
     * @notice Get the weekly Merkle root for a user
     * @param user The user address
     * @param weekTimestamp The week timestamp
     * @return root The Merkle root, or bytes32(0) if not found
     */
    function getWeeklyRoot(address user, uint256 weekTimestamp) external view returns (bytes32 root) {
        return weeklyRoots[user][weekTimestamp];
    }
    
    /**
     * @notice Check if a user has submitted a root for a specific week
     * @param user The user address
     * @param weekTimestamp The week timestamp
     * @return hasRoot Whether a root exists
     * @return root The Merkle root if it exists
     * @return submissionTime The timestamp when the root was submitted
     */
    function getWeeklyRootInfo(
        address user,
        uint256 weekTimestamp
    ) external view returns (bool hasRoot, bytes32 root, uint256 submissionTime) {
        root = weeklyRoots[user][weekTimestamp];
        hasRoot = root != bytes32(0);
        submissionTime = submissionTimestamps[user][weekTimestamp];
    }
}













