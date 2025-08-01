import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Header from './UI/Header';

describe('Header Component', () => {
  it('should render the main heading', () => {
    render(<Header />);
    
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent('Datenschutz-Anbieter Vergleich');
  });

  it('should render the subtitle', () => {
    render(<Header />);
    
    const subtitle = screen.getByText(/Finden Sie kostenlos den passenden/i);
    expect(subtitle).toBeInTheDocument();
  });

  it('should have proper semantic structure', () => {
    render(<Header />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('should apply correct styling classes', () => {
    const { container } = render(<Header />);
    
    const headerElement = container.querySelector('header');
    expect(headerElement).toHaveClass('text-center');
  });

  it('should render hero section with background', () => {
    const { container } = render(<Header />);
    
    const heroSection = container.querySelector('.bg-gradient-to-br');
    expect(heroSection).toBeInTheDocument();
  });
});
