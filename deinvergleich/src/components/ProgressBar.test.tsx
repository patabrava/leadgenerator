import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import ProgressBar from './MultiStepForm/ProgressBar';

describe('ProgressBar Component', () => {
  it('should render progress text', () => {
    render(<ProgressBar currentStep={1} totalSteps={4} />);
    
    expect(screen.getByText('Fortschritt')).toBeInTheDocument();
    expect(screen.getByText('2 von 4')).toBeInTheDocument();
  });

  it('should show correct step count for different currentStep values', () => {
    const { rerender } = render(<ProgressBar currentStep={0} totalSteps={4} />);
    expect(screen.getByText('1 von 4')).toBeInTheDocument();

    rerender(<ProgressBar currentStep={2} totalSteps={4} />);
    expect(screen.getByText('3 von 4')).toBeInTheDocument();

    rerender(<ProgressBar currentStep={3} totalSteps={4} />);
    expect(screen.getByText('4 von 4')).toBeInTheDocument();
  });

  it('should render progress bar with correct width', () => {
    const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);
    
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveStyle({ width: '50%' }); // Step 2 of 4 = 50%
  });

  it('should calculate progress percentage correctly', () => {
    const { container, rerender } = render(<ProgressBar currentStep={0} totalSteps={4} />);
    
    let progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '25%' }); // Step 1 of 4 = 25%

    rerender(<ProgressBar currentStep={3} totalSteps={4} />);
    progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '100%' }); // Step 4 of 4 = 100%
  });

  it('should handle different totalSteps values', () => {
    render(<ProgressBar currentStep={2} totalSteps={5} />);
    
    expect(screen.getByText('3 von 5')).toBeInTheDocument();
  });

  it('should apply custom className when provided', () => {
    const { container } = render(
      <ProgressBar currentStep={1} totalSteps={4} className="custom-class" />
    );
    
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass('custom-class');
  });

  it('should have proper responsive design classes', () => {
    const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);
    
    // Check for responsive text sizing
    const progressText = screen.getByText('Fortschritt');
    expect(progressText).toHaveClass('text-xs', 'sm:text-sm');

    // Check for responsive progress bar height
    const progressBarContainer = container.querySelector('.bg-gray-200');
    expect(progressBarContainer).toHaveClass('h-2', 'sm:h-2.5');
  });

  it('should have smooth transitions', () => {
    const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);
    
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveClass('transition-all', 'duration-500', 'ease-out');
  });

  it('should use proper colors and styling', () => {
    const { container } = render(<ProgressBar currentStep={1} totalSteps={4} />);
    
    // Progress bar should have indigo gradient
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveClass('from-indigo-500', 'to-indigo-600');

    // Container should have proper background and styling
    const progressContainer = container.querySelector('.bg-gray-200');
    expect(progressContainer).toHaveClass('rounded-full', 'shadow-inner');
  });

  it('should handle edge cases correctly', () => {
    // Test with currentStep 0 (first step)
    render(<ProgressBar currentStep={0} totalSteps={1} />);
    expect(screen.getByText('1 von 1')).toBeInTheDocument();

    // Test minimum viable props
    const { container } = render(<ProgressBar currentStep={0} totalSteps={1} />);
    const progressBar = container.querySelector('.bg-gradient-to-r');
    expect(progressBar).toHaveStyle({ width: '100%' });
  });
});
