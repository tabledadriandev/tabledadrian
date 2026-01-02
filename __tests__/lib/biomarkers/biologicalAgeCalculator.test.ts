import {
  calculateCardiacAge,
  calculateSleepAge,
  calculateActivityAge,
  calculateRecoveryAge,
  calculateCombinedBiologicalAge,
  calculateWearableBiologicalAge,
} from '@/lib/biomarkers/wearableBiologicalAge';
import type { HRVData, SleepData, ActivityData, RecoveryData } from '@/lib/biomarkers/wearableBiologicalAge';

describe('Biological Age Calculator', () => {
  const chronologicalAge = 45;

  describe('calculateCardiacAge', () => {
    it('calculates cardiac age from HRV data', () => {
      const hrvData: HRVData[] = [
        { value: 55, date: new Date('2024-12-01') },
        { value: 56, date: new Date('2024-12-02') },
        { value: 57, date: new Date('2024-12-03') },
      ];
      const cardiacAge = calculateCardiacAge(hrvData, chronologicalAge);
      expect(cardiacAge).toBeGreaterThan(0);
      expect(cardiacAge).toBeLessThanOrEqual(100);
    });

    it('returns chronological age when no HRV data', () => {
      const cardiacAge = calculateCardiacAge([], chronologicalAge);
      expect(cardiacAge).toBe(chronologicalAge);
    });

    it('handles high HRV (younger age)', () => {
      const hrvData: HRVData[] = [
        { value: 70, date: new Date() }, // High HRV
      ];
      const cardiacAge = calculateCardiacAge(hrvData, chronologicalAge);
      expect(cardiacAge).toBeLessThan(chronologicalAge);
    });

    it('handles low HRV (older age)', () => {
      const hrvData: HRVData[] = [
        { value: 30, date: new Date() }, // Low HRV
      ];
      const cardiacAge = calculateCardiacAge(hrvData, chronologicalAge);
      expect(cardiacAge).toBeGreaterThan(chronologicalAge);
    });
  });

  describe('calculateSleepAge', () => {
    it('calculates sleep age from sleep data', () => {
      const sleepData: SleepData[] = [
        {
          duration: 8,
          efficiency: 90,
          deepSleep: 2.5,
          remSleep: 1.5,
          date: new Date('2024-12-01'),
        },
      ];
      const sleepAge = calculateSleepAge(sleepData, chronologicalAge);
      expect(sleepAge).toBeGreaterThan(0);
      expect(sleepAge).toBeLessThanOrEqual(100);
    });

    it('returns chronological age when no sleep data', () => {
      const sleepAge = calculateSleepAge([], chronologicalAge);
      expect(sleepAge).toBe(chronologicalAge);
    });

    it('handles optimal sleep (younger age)', () => {
      const sleepData: SleepData[] = [
        {
          duration: 8.5,
          efficiency: 95,
          deepSleep: 3,
          remSleep: 2,
          date: new Date(),
        },
      ];
      const sleepAge = calculateSleepAge(sleepData, chronologicalAge);
      expect(sleepAge).toBeLessThan(chronologicalAge);
    });
  });

  describe('calculateActivityAge', () => {
    it('calculates activity age from activity data', () => {
      const activityData: ActivityData[] = [
        {
          steps: 10000,
          activeMinutes: 30,
          date: new Date('2024-12-01'),
        },
      ];
      const activityAge = calculateActivityAge(activityData, chronologicalAge);
      expect(activityAge).toBeGreaterThan(0);
      expect(activityAge).toBeLessThanOrEqual(100);
    });

    it('returns chronological age when no activity data', () => {
      const activityAge = calculateActivityAge([], chronologicalAge);
      expect(activityAge).toBe(chronologicalAge);
    });

    it('handles high activity (younger age)', () => {
      const activityData: ActivityData[] = [
        {
          steps: 15000,
          activeMinutes: 60,
          date: new Date(),
        },
      ];
      const activityAge = calculateActivityAge(activityData, chronologicalAge);
      expect(activityAge).toBeLessThan(chronologicalAge);
    });
  });

  describe('calculateRecoveryAge', () => {
    it('calculates recovery age from recovery data', () => {
      const recoveryData: RecoveryData[] = [
        {
          score: 80,
          hrvRecovery: 5,
          date: new Date('2024-12-01'),
        },
      ];
      const recoveryAge = calculateRecoveryAge(recoveryData, chronologicalAge);
      expect(recoveryAge).toBeGreaterThan(0);
      expect(recoveryAge).toBeLessThanOrEqual(100);
    });

    it('returns chronological age when no recovery data', () => {
      const recoveryAge = calculateRecoveryAge([], chronologicalAge);
      expect(recoveryAge).toBe(chronologicalAge);
    });
  });

  describe('calculateCombinedBiologicalAge', () => {
    it('calculates combined biological age', () => {
      const result = calculateCombinedBiologicalAge(
        42, // cardiacAge
        43, // sleepAge
        44, // activityAge
        45, // recoveryAge
        chronologicalAge
      );
      expect(result.biologicalAge).toBeGreaterThan(0);
      expect(result.biologicalAge).toBeLessThanOrEqual(100);
      expect(result.factors.cardiacAge).toBe(42);
      expect(result.factors.sleepAge).toBe(43);
      expect(result.factors.activityAge).toBe(44);
      expect(result.factors.recoveryAge).toBe(45);
    });

    it('identifies primary drivers', () => {
      const result = calculateCombinedBiologicalAge(
        40, // Best (youngest)
        45,
        46,
        47,
        chronologicalAge
      );
      expect(result.factors.drivers.primary).toBe('cardiac');
    });
  });

  describe('calculateWearableBiologicalAge', () => {
    it('calculates complete biological age from all wearable data', async () => {
      const hrvData: HRVData[] = [{ value: 55, date: new Date() }];
      const sleepData: SleepData[] = [
        { duration: 8, efficiency: 90, deepSleep: 2.5, remSleep: 1.5, date: new Date() },
      ];
      const activityData: ActivityData[] = [
        { steps: 10000, activeMinutes: 30, date: new Date() },
      ];
      const recoveryData: RecoveryData[] = [
        { score: 80, hrvRecovery: 5, date: new Date() },
      ];

      const result = await calculateWearableBiologicalAge(
        hrvData,
        sleepData,
        activityData,
        recoveryData,
        chronologicalAge
      );

      expect(result.biologicalAge).toBeGreaterThan(0);
      expect(result.biologicalAge).toBeLessThanOrEqual(100);
      expect(result.factors.cardiacAge).toBeDefined();
      expect(result.factors.sleepAge).toBeDefined();
      expect(result.factors.activityAge).toBeDefined();
      expect(result.factors.recoveryAge).toBeDefined();
    });
  });
});
