import React from 'react';
import { render, screen } from '@testing-library/react';
import AchievementBadge from '@/components/premium/AchievementBadge';

describe('AchievementBadge', () => {
  const defaultProps = {
    name: 'Sleep Optimizer',
  };

  it('renders achievement name correctly', () => {
    render(<AchievementBadge {...defaultProps} />);
    expect(screen.getByText('Sleep Optimizer')).toBeInTheDocument();
  });

  it('displays default trophy icon', () => {
    render(<AchievementBadge {...defaultProps} />);
    expect(screen.getByText('🏆')).toBeInTheDocument();
  });

  it('displays custom icon when provided', () => {
    render(<AchievementBadge {...defaultProps} icon="😴" />);
    expect(screen.getByText('😴')).toBeInTheDocument();
  });

  it('displays token reward when provided', () => {
    render(<AchievementBadge {...defaultProps} tokenReward={15} />);
    expect(screen.getByText('+15 $TA')).toBeInTheDocument();
  });

  it('does not display token reward when 0', () => {
    render(<AchievementBadge {...defaultProps} tokenReward={0} />);
    expect(screen.queryByText(/TA/)).not.toBeInTheDocument();
  });

  it('displays unlocked date when provided', () => {
    const unlockedAt = new Date('2024-12-20');
    render(<AchievementBadge {...defaultProps} unlockedAt={unlockedAt} />);
    expect(screen.getByText(unlockedAt.toLocaleDateString())).toBeInTheDocument();
  });

  it('applies metallic gold styling', () => {
    const { container } = render(<AchievementBadge {...defaultProps} />);
    const badge = container.firstChild;
    expect(badge).toHaveClass('achievement-badge', 'gold');
  });

  it('applies custom className', () => {
    const { container } = render(
      <AchievementBadge {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
