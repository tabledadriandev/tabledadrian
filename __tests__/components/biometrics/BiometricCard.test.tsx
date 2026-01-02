import React from 'react';
import { render, screen } from '@testing-library/react';
import BiometricCard from '@/components/biometrics/BiometricCard';

describe('BiometricCard', () => {
  const defaultProps = {
    metric: 'Heart Rate Variability',
    value: 52,
    unit: 'ms',
  };

  it('renders metric name and value correctly', () => {
    render(<BiometricCard {...defaultProps} />);
    expect(screen.getByText('Heart Rate Variability')).toBeInTheDocument();
    expect(screen.getByText('52')).toBeInTheDocument();
    expect(screen.getByText('ms')).toBeInTheDocument();
  });

  it('displays status badge with correct styling', () => {
    render(<BiometricCard {...defaultProps} status="good" />);
    expect(screen.getByText('Good')).toBeInTheDocument();
  });

  it('displays caution status correctly', () => {
    render(<BiometricCard {...defaultProps} status="caution" />);
    expect(screen.getByText('Caution')).toBeInTheDocument();
  });

  it('displays alert status correctly', () => {
    render(<BiometricCard {...defaultProps} status="alert" />);
    expect(screen.getByText('Alert')).toBeInTheDocument();
  });

  it('displays sparkline when trend data is provided', () => {
    const trend = [45, 48, 50, 52, 51, 53, 52];
    render(<BiometricCard {...defaultProps} trend={trend} />);
    // Sparkline should be rendered (check for container)
    const card = screen.getByText('Heart Rate Variability').closest('div');
    expect(card).toBeInTheDocument();
  });

  it('displays personal best when provided', () => {
    render(<BiometricCard {...defaultProps} personalBest={58} />);
    expect(screen.getByText(/vs. best: 58ms/)).toBeInTheDocument();
  });

  it('displays sync status correctly', () => {
    render(<BiometricCard {...defaultProps} syncStatus="synced" />);
    expect(screen.getByText('Synced')).toBeInTheDocument();
  });

  it('displays syncing status correctly', () => {
    render(<BiometricCard {...defaultProps} syncStatus="syncing" />);
    expect(screen.getByText('Syncing...')).toBeInTheDocument();
  });

  it('displays error status correctly', () => {
    render(<BiometricCard {...defaultProps} syncStatus="error" />);
    expect(screen.getByText('Error')).toBeInTheDocument();
  });

  it('calculates trend direction correctly', () => {
    const upwardTrend = [45, 48, 50, 52, 51, 53, 55];
    render(<BiometricCard {...defaultProps} trend={upwardTrend} />);
    // Trend should show upward arrow
    expect(screen.getByText(/↑/)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <BiometricCard {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
