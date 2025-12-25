import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TokenWallet from '@/components/premium/TokenWallet';

describe('TokenWallet', () => {
  const defaultProps = {
    balance: 247.5,
  };

  it('renders token balance correctly', () => {
    render(<TokenWallet {...defaultProps} />);
    expect(screen.getByText('247.5 $TA')).toBeInTheDocument();
  });

  it('displays USD value when provided', () => {
    render(<TokenWallet {...defaultProps} usdValue={24.75} />);
    expect(screen.getByText('≈ $24.75 USD')).toBeInTheDocument();
  });

  it('displays earnings breakdown', () => {
    const earnings = [
      { source: 'Food logging', amount: 45 },
      { source: 'Workouts', amount: 32 },
    ];
    render(<TokenWallet {...defaultProps} earnings={earnings} />);
    expect(screen.getByText('Food logging:')).toBeInTheDocument();
    expect(screen.getByText('+45 $TA')).toBeInTheDocument();
    expect(screen.getByText('Workouts:')).toBeInTheDocument();
    expect(screen.getByText('+32 $TA')).toBeInTheDocument();
  });

  it('displays staking information when staked > 0', () => {
    render(<TokenWallet {...defaultProps} staked={100} apy={10} rewardsEarned={8.32} />);
    expect(screen.getByText('Staking')).toBeInTheDocument();
    expect(screen.getByText('100 $TA')).toBeInTheDocument();
    expect(screen.getByText('10%')).toBeInTheDocument();
    expect(screen.getByText('8.32 $TA')).toBeInTheDocument();
  });

  it('calls onStake when stake button is clicked', () => {
    const onStake = jest.fn();
    render(<TokenWallet {...defaultProps} onStake={onStake} />);
    const stakeButton = screen.getByText('Stake More');
    fireEvent.click(stakeButton);
    expect(onStake).toHaveBeenCalledTimes(1);
  });

  it('calls onWithdraw when withdraw button is clicked', () => {
    const onWithdraw = jest.fn();
    render(<TokenWallet {...defaultProps} staked={100} onWithdraw={onWithdraw} />);
    const withdrawButton = screen.getByText('Withdraw');
    fireEvent.click(withdrawButton);
    expect(onWithdraw).toHaveBeenCalledTimes(1);
  });

  it('does not display withdraw button when staked is 0', () => {
    render(<TokenWallet {...defaultProps} staked={0} onWithdraw={jest.fn()} />);
    expect(screen.queryByText('Withdraw')).not.toBeInTheDocument();
  });

  it('applies premium glass card styling', () => {
    const { container } = render(<TokenWallet {...defaultProps} />);
    const card = container.firstChild;
    expect(card).toHaveClass('glass-card', 'premium');
  });

  it('applies custom className', () => {
    const { container } = render(
      <TokenWallet {...defaultProps} className="custom-class" />
    );
    expect(container.firstChild).toHaveClass('custom-class');
  });
});
