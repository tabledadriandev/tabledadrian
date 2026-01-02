/**
 * Unit Tests: Pedersen Commitments
 */

import {
  createCommitment,
  revealCommitment,
  verifyCommitment,
  createDailyCommitment,
  hashProtocolIntent,
} from '@/lib/crypto/commitments';

describe('Pedersen Commitments', () => {
  describe('Commitment Creation', () => {
    it('should create a commitment', () => {
      const protocolHash = 'test_protocol_hash';
      const commitment = createCommitment(protocolHash);

      expect(commitment.commitment).toBeDefined();
      expect(commitment.nonce).toBeDefined();
      expect(commitment.protocolHash).toBeDefined();
    });

    it('should create different commitments for same protocol hash', () => {
      const protocolHash = 'test_protocol_hash';
      const commitment1 = createCommitment(protocolHash);
      const commitment2 = createCommitment(protocolHash);

      // Commitments should be different due to random nonce
      expect(commitment1.commitment).not.toBe(commitment2.commitment);
    });
  });

  describe('Commitment Reveal', () => {
    it('should verify valid reveal', () => {
      const protocolHash = 'test_protocol_hash';
      const commitment = createCommitment(protocolHash);

      const result = revealCommitment(
        commitment.commitment,
        commitment.nonce,
        protocolHash
      );

      expect(result.valid).toBe(true);
    });

    it('should reject invalid reveal', () => {
      const protocolHash = 'test_protocol_hash';
      const commitment = createCommitment(protocolHash);

      const result = revealCommitment(
        commitment.commitment,
        'wrong_nonce',
        protocolHash
      );

      expect(result.valid).toBe(false);
    });
  });

  describe('Daily Commitment', () => {
    it('should create daily commitment for protocol', () => {
      const commitment = createDailyCommitment(
        'user123',
        'protocol456',
        1,
        ['meditation', 'cold_plunge']
      );

      expect(commitment.commitment).toBeDefined();
      expect(commitment.nonce).toBeDefined();
    });
  });

  describe('Protocol Intent Hashing', () => {
    it('should hash protocol intent consistently', () => {
      const hash1 = hashProtocolIntent('user123', 'protocol456', 1, [
        'meditation',
      ]);
      const hash2 = hashProtocolIntent('user123', 'protocol456', 1, [
        'meditation',
      ]);

      expect(hash1).toBe(hash2);
    });
  });
});













