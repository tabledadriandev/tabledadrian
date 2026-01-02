/**
 * Unit Tests: EIP-712 Signature Utilities
 */

import {
  createDeviceAttestationTypedData,
  hashBiomarkerData,
  getDomain,
} from '@/lib/crypto/eip712';

describe('EIP-712 Signature Utilities', () => {
  describe('Device Attestation Typed Data', () => {
    it('should create typed data for device attestation', () => {
      const data = {
        userId: 'user123',
        deviceId: 'apple_health',
        dataHash: '0xabc123',
        timestamp: 1234567890,
        metric: 'hrv',
        value: 52.5,
      };

      const typedData = createDeviceAttestationTypedData(data, 8453);

      expect(typedData).toBeDefined();
      expect(typedData.domain.chainId).toBe(8453);
      expect(typedData.primaryType).toBe('DeviceAttestation');
      expect(typedData.message.userId).toBe(data.userId);
    });

    it('should hash biomarker data', () => {
      const hash = hashBiomarkerData('user123', 'hrv', 52.5, 1234567890, {
        source: 'oura',
      });

      expect(hash).toBeDefined();
      expect(hash.startsWith('0x')).toBe(true);
    });
  });

  describe('Domain Separator', () => {
    it('should create domain with correct chain ID', () => {
      const domain = getDomain(8453); // Base mainnet

      expect(domain.chainId).toBe(8453);
      expect(domain.name).toBe("Table d'Adrian");
    });
  });
});













