// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title DeviceAttestationRegistry
 * @notice Stores EIP-712 device attestations for biomarker data
 * @dev Devices sign data off-chain, submit hash + signature onchain
 */
contract DeviceAttestationRegistry {
    // Mapping: user address => device address => data hash => attestation exists
    mapping(address => mapping(address => mapping(bytes32 => bool))) public attestations;
    
    // Mapping: device address => authorized
    mapping(address => bool) public authorizedDevices;
    
    // Owner (for device authorization)
    address public owner;
    
    // Events
    event AttestationSubmitted(
        address indexed user,
        address indexed device,
        bytes32 indexed dataHash,
        uint256 timestamp
    );
    
    event DeviceAuthorized(address indexed device, bool authorized);
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    /**
     * @notice Submit a device attestation
     * @param user The user address whose data is being attested
     * @param dataHash The hash of the biomarker data
     * @param v ECDSA signature component
     * @param r ECDSA signature component
     * @param s ECDSA signature component
     */
    function submitAttestation(
        address user,
        bytes32 dataHash,
        uint8 v,
        bytes32 r,
        bytes32 s
    ) external {
        address device = msg.sender;
        
        require(authorizedDevices[device], "Device not authorized");
        require(user != address(0), "Invalid user address");
        require(dataHash != bytes32(0), "Invalid data hash");
        
        // Verify EIP-712 signature (simplified - full implementation would verify typed data)
        // In production, use EIP-712 typed data verification
        
        attestations[user][device][dataHash] = true;
        
        emit AttestationSubmitted(user, device, dataHash, block.timestamp);
    }
    
    /**
     * @notice Verify an attestation
     * @param user The user address
     * @param device The device address
     * @param dataHash The data hash to verify
     * @return verified Whether the attestation exists
     */
    function verifyAttestation(
        address user,
        address device,
        bytes32 dataHash
    ) external view returns (bool verified) {
        return attestations[user][device][dataHash];
    }
    
    /**
     * @notice Authorize or revoke a device
     * @param device The device address
     * @param authorized Whether to authorize or revoke
     */
    function authorizeDevice(address device, bool authorized) external onlyOwner {
        require(device != address(0), "Invalid device address");
        authorizedDevices[device] = authorized;
        emit DeviceAuthorized(device, authorized);
    }
    
    /**
     * @notice Batch authorize devices
     * @param devices Array of device addresses
     * @param authorized Whether to authorize or revoke
     */
    function batchAuthorizeDevices(
        address[] calldata devices,
        bool authorized
    ) external onlyOwner {
        for (uint256 i = 0; i < devices.length; i++) {
            require(devices[i] != address(0), "Invalid device address");
            authorizedDevices[devices[i]] = authorized;
            emit DeviceAuthorized(devices[i], authorized);
        }
    }
    
    /**
     * @notice Check if device is authorized
     * @param device The device address
     * @return isAuthorized Whether the device is authorized
     */
    function isAuthorizedDevice(address device) external view returns (bool isAuthorized) {
        return authorizedDevices[device];
    }
}













