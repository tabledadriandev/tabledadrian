import React from 'react';
import { render, screen } from '@testing-library/react';
import InsightCard from '@/components/biometrics/InsightCard';

describe('InsightCard', () => {
  const defaultProps = {
    headline: 'Sleep Pressure Building',
    explanation: 'You have 4 hours of sleep debt',
    action: 'Prioritize sleep tonight',
  };

  it('renders headline, explanation, and action correctly', () => {
    render(<InsightCard {...defaultProps} />);
    expect(screen.getByText('Sleep Pressure Building')).toBeInTheDocument();
    expect(screen.getByText('You have 4 hours of sleep debt')).toBeInTheDocument();
    expect(screen.getByText(/Prioritize sleep tonight/)).toBeInTheDocument();
  });

  it('displays confidence score correctly', () => {
    render(<InsightCard {...defaultProps} confidence={92} />);
    expect(screen.getByText('Confidence:')).toBeInTheDocument();
    expect(screen.getByText('92%')).toBeInTheDocument();
  });

  it('displays learn more link when provided', () => {
    render(<InsightCard {...defaultProps} learnMoreLink="https://example.com" />);
    const link = screen.getByText('Learn More');
    expect(link).toBeInTheDocument();
    expect(link.closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('renders info type correctly', () => {
    render(<InsightCard {...defaultProps} type="info" />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-primary/30');
  });

  it('renders success type correctly', () => {
    render(<InsightCard {...defaultProps} type="success" />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-success/30');
  });

  it('renders warning type correctly', () => {
    render(<InsightCard {...defaultProps} type="warning" />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-warning/30');
  });

  it('renders alert type correctly', () => {
    render(<InsightCard {...defaultProps} type="alert" />);
    const card = screen.getByRole('article');
    expect(card).toHaveClass('border-error/30');
  });

  it('applies custom className', () => {
    const { container } = render(
      <InsightCard {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('uses default confidence of 85 when not provided', () => {
    render(<InsightCard {...defaultProps} />);
    expect(screen.getByText('85%')).toBeInTheDocument();
  });
});
