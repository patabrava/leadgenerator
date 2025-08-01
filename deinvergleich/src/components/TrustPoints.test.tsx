import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TrustPoints } from './UI/TrustPoints';

describe('TrustPoints Component', () => {
  it('should render all trust point cards', () => {
    render(<TrustPoints />);
    
    // Should render 6 trust point cards
    const trustCards = screen.getAllByRole('listitem');
    expect(trustCards).toHaveLength(6);
  });

  it('should render trust point headings', () => {
    render(<TrustPoints />);
    
    const expectedHeadings = [
      'DSGVO-Experten',
      'Kostenloser Vergleich',
      'Schnelle Vermittlung',
      'Zertifizierte Partner',
      'Persönliche Beratung',
      'Deutschlandweit'
    ];

    expectedHeadings.forEach(heading => {
      expect(screen.getByText(heading)).toBeInTheDocument();
    });
  });

  it('should render statistics section', () => {
    render(<TrustPoints />);
    
    // Check for statistics
    expect(screen.getByText('2.500+')).toBeInTheDocument();
    expect(screen.getByText('beratene Unternehmen')).toBeInTheDocument();
    expect(screen.getByText('98%')).toBeInTheDocument();
    expect(screen.getByText('Kundenzufriedenheit')).toBeInTheDocument();
    expect(screen.getByText('24h')).toBeInTheDocument();
    expect(screen.getByText('durchschnittliche Antwortzeit')).toBeInTheDocument();
  });

  it('should render testimonial section', () => {
    render(<TrustPoints />);
    
    // Check for testimonial content
    expect(screen.getByText(/Der Vergleich hat uns geholfen/i)).toBeInTheDocument();
    expect(screen.getByText('Maria Schmidt')).toBeInTheDocument();
    expect(screen.getByText('Geschäftsführerin, TechStart GmbH')).toBeInTheDocument();
  });

  it('should have proper semantic structure with sections', () => {
    render(<TrustPoints />);
    
    // Should have multiple sections
    const sections = screen.getAllByRole('region');
    expect(sections.length).toBeGreaterThan(0);
  });

  it('should apply background styling', () => {
    const { container } = render(<TrustPoints />);
    
    const bgElement = container.querySelector('.bg-gray-50');
    expect(bgElement).toBeInTheDocument();
  });

  it('should have responsive grid layout', () => {
    const { container } = render(<TrustPoints />);
    
    // Check for grid classes
    const gridElements = container.querySelectorAll('.grid');
    expect(gridElements.length).toBeGreaterThan(0);
  });

  it('should render icons for each trust point', () => {
    render(<TrustPoints />);
    
    // Check that there are multiple SVG icons (one for each trust point)
    const icons = screen.getAllByRole('img', { hidden: true });
    expect(icons.length).toBeGreaterThan(5);
  });
});
