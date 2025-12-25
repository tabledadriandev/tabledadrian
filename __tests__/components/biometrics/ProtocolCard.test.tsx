import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProtocolCard from '@/components/biometrics/ProtocolCard';

describe('ProtocolCard', () => {
  const defaultProps = {
    name: 'Cold Plunge Challenge',
  };

  it('renders protocol name correctly', () => {
    render(<ProtocolCard {...defaultProps} />);
    expect(screen.getByText('Cold Plunge Challenge')).toBeInTheDocument();
  });

  it('displays streak counter when streak > 0', () => {
    render(<ProtocolCard {...defaultProps} streak={12} />);
    expect(screen.getByText('12 days')).toBeInTheDocument();
  });

  it('does not display streak when streak is 0', () => {
    render(<ProtocolCard {...defaultProps} streak={0} />);
    expect(screen.queryByText(/days/)).not.toBeInTheDocument();
  });

  it('displays last completed date', () => {
    const lastCompleted = new Date('2024-12-20');
    render(<ProtocolCard {...defaultProps} lastCompleted={lastCompleted} />);
    expect(screen.getByText(/Last:/)).toBeInTheDocument();
  });

  it('displays correlated metrics', () => {
    const correlatedMetrics = {
      hrv: 12,
      sleep: 8,
    };
    render(<ProtocolCard {...defaultProps} correlatedMetrics={correlatedMetrics} />);
    expect(screen.getByText('hrv: +12%')).toBeInTheDocument();
    expect(screen.getByText('sleep: +8%')).toBeInTheDocument();
  });

  it('displays negative correlated metrics correctly', () => {
    const correlatedMetrics = {
      stress: -15,
    };
    render(<ProtocolCard {...defaultProps} correlatedMetrics={correlatedMetrics} />);
    expect(screen.getByText('stress: -15%')).toBeInTheDocument();
  });

  it('displays adherence bar with correct percentage', () => {
    render(<ProtocolCard {...defaultProps} adherence={80} />);
    expect(screen.getByText('Adherence')).toBeInTheDocument();
    expect(screen.getByText('80%')).toBeInTheDocument();
  });

  it('calls onEdit when edit button is clicked', () => {
    const onEdit = jest.fn();
    render(<ProtocolCard {...defaultProps} onEdit={onEdit} />);
    const editButton = screen.getByText('Edit');
    fireEvent.click(editButton);
    expect(onEdit).toHaveBeenCalledTimes(1);
  });

  it('calls onLog when log button is clicked', () => {
    const onLog = jest.fn();
    render(<ProtocolCard {...defaultProps} onLog={onLog} />);
    const logButton = screen.getByText('Log');
    fireEvent.click(logButton);
    expect(onLog).toHaveBeenCalledTimes(1);
  });

  it('does not render edit button when onEdit is not provided', () => {
    render(<ProtocolCard {...defaultProps} />);
    expect(screen.queryByText('Edit')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProtocolCard {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
