import { ProtocolBuilder, createProtocolBuilder } from '@/lib/protocols/protocolBuilder';
import type { ProtocolInput } from '@/lib/protocols/protocolBuilder';

// Mock Prisma
jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    protocolExperiment: {
      findMany: jest.fn().mockResolvedValue([]),
      findUnique: jest.fn(),
      create: jest.fn().mockResolvedValue({ id: 'protocol123' }),
      update: jest.fn(),
    },
    biomarkerReading: {
      findMany: jest.fn().mockResolvedValue([]),
    },
  })),
}));

describe('ProtocolBuilder', () => {
  let builder: ProtocolBuilder;

  beforeEach(() => {
    builder = createProtocolBuilder();
  });

  describe('generateProtocol', () => {
    const mockInput: ProtocolInput = {
      userId: 'user123',
      name: 'Cold Plunge Challenge',
      goal: 'boost_hrv',
      currentState: {
        hrv: 50,
        sleepScore: 80,
      },
      availableTime: 60,
      preferences: {
        exercises: ['cold_plunge', 'meditation'],
      },
      commitmentLevel: 'high',
    };

    it('generates a 30-day protocol', async () => {
      const protocol = await builder.generateProtocol(mockInput);
      expect(protocol.days).toHaveLength(30);
      expect(protocol.startDate).toBeInstanceOf(Date);
      expect(protocol.endDate).toBeInstanceOf(Date);
    });

    it('includes protocol name and goal', async () => {
      const protocol = await builder.generateProtocol(mockInput);
      expect(protocol.name).toBe('Cold Plunge Challenge');
      expect(protocol.goal).toBe('boost_hrv');
    });

    it('generates day-by-day instructions', async () => {
      const protocol = await builder.generateProtocol(mockInput);
      expect(protocol.days[0].instructions.length).toBeGreaterThan(0);
      expect(protocol.days[0].interventions.length).toBeGreaterThan(0);
    });

    it('calculates success probability', async () => {
      const protocol = await builder.generateProtocol(mockInput);
      expect(protocol.successProbability).toBeGreaterThanOrEqual(0);
      expect(protocol.successProbability).toBeLessThanOrEqual(100);
    });

    it('determines tracking metrics based on goal', async () => {
      const protocol = await builder.generateProtocol(mockInput);
      expect(protocol.trackingMetrics.length).toBeGreaterThan(0);
      expect(protocol.trackingMetrics).toContain('hrv');
    });

    it('generates different protocols for different goals', async () => {
      const sleepInput = { ...mockInput, goal: 'improve_sleep' };
      const sleepProtocol = await builder.generateProtocol(sleepInput);
      expect(sleepProtocol.trackingMetrics).toContain('sleep_score');
    });
  });

  describe('calculateCorrelations', () => {
    it('calculates correlations between protocol and biomarkers', async () => {
      const { PrismaClient } = require('@prisma/client');
      const prismaInstance = (PrismaClient as jest.Mock).mock.results[0]?.value;

      prismaInstance.biomarkerReading.findMany = jest.fn().mockResolvedValue([
        { metric: 'hrv', value: 50, date: new Date() },
        { metric: 'hrv', value: 52, date: new Date() },
        { metric: 'hrv', value: 55, date: new Date() },
      ]);
      prismaInstance.protocolExperiment.findUnique = jest.fn().mockResolvedValue({
        id: 'protocol123',
        startDate: new Date(),
        endDate: new Date(),
        adherence: 80,
      });

      const correlations = await builder.calculateCorrelations('protocol123', 'user123');
      expect(Array.isArray(correlations)).toBe(true);
    });

    it('handles missing protocol gracefully', async () => {
      const { PrismaClient } = require('@prisma/client');
      const prismaInstance = (PrismaClient as jest.Mock).mock.results[0]?.value;
      prismaInstance.protocolExperiment.findUnique = jest.fn().mockResolvedValue(null);

      await expect(
        builder.calculateCorrelations('nonexistent', 'user123')
      ).rejects.toThrow();
    });
  });

  describe('saveProtocol', () => {
    it('saves protocol to database', async () => {
      const protocol = await builder.generateProtocol({
        userId: 'user123',
        name: 'Test Protocol',
        goal: 'boost_hrv',
        currentState: {},
        availableTime: 60,
        preferences: {},
        commitmentLevel: 'medium',
      });

      const protocolId = await builder.saveProtocol('user123', protocol);
      expect(protocolId).toBe('protocol123');
    });
  });
});
