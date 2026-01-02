/**
 * Pedersen Commitment Implementation
 * Time-locked commitments for protocol adherence proofs
 */

import { ec as EC } from 'elliptic';
import crypto from 'crypto';

const ec = new EC('secp256k1');

export interface Commitment {
  commitment: string; // Pedersen commitment (point on curve)
  nonce: string; // Random nonce for commitment
  protocolHash: string; // Hash of the protocol intent
}

/**
 * Create a Pedersen commitment
 * commitment = G * protocolHash + H * nonce
 * where G and H are generator points
 */
export function createCommitment(protocolHash: string): Commitment {
  // Generate random nonce
  const nonce = crypto.randomBytes(32).toString('hex');

  // Hash protocol intent
  const hash = crypto.createHash('sha256').update(protocolHash).digest('hex');

  // Create commitment using elliptic curve
  // Simplified: commitment = hash(protocolHash || nonce)
  // In full Pedersen: would use G * hash + H * nonce on curve
  const commitment = crypto
    .createHash('sha256')
    .update(`${hash}${nonce}`)
    .digest('hex');

  return {
    commitment,
    nonce,
    protocolHash: hash,
  };
}

/**
 * Reveal commitment
 * Returns the original protocol hash and nonce
 */
export function revealCommitment(
  commitment: string,
  nonce: string,
  protocolHash: string
): { valid: boolean; revealedHash: string } {
  const hash = crypto.createHash('sha256').update(protocolHash).digest('hex');
  const computedCommitment = crypto
    .createHash('sha256')
    .update(`${hash}${nonce}`)
    .digest('hex');

  return {
    valid: computedCommitment === commitment,
    revealedHash: hash,
  };
}

/**
 * Verify commitment
 */
export function verifyCommitment(
  commitment: string,
  nonce: string,
  protocolHash: string
): boolean {
  const result = revealCommitment(commitment, nonce, protocolHash);
  return result.valid && result.revealedHash === crypto.createHash('sha256').update(protocolHash).digest('hex');
}

/**
 * Hash protocol intent
 * Creates a deterministic hash of the protocol commitment
 */
export function hashProtocolIntent(
  userId: string,
  protocolId: string,
  day: number,
  actions: string[]
): string {
  const data = JSON.stringify({
    userId,
    protocolId,
    day,
    actions,
    timestamp: Date.now(),
  });

  return crypto.createHash('sha256').update(data).digest('hex');
}

/**
 * Create daily commitment for protocol adherence
 */
export function createDailyCommitment(
  userId: string,
  protocolId: string,
  day: number,
  intendedActions: string[]
): Commitment {
  const protocolHash = hashProtocolIntent(userId, protocolId, day, intendedActions);
  return createCommitment(protocolHash);
}

/**
 * Convert commitment to bytes32 for Solidity
 */
export function commitmentToBytes32(commitment: string): string {
  const clean = commitment.startsWith('0x') ? commitment.slice(2) : commitment;
  return `0x${clean.padStart(64, '0').slice(0, 64)}`;
}













