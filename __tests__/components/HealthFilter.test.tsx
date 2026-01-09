import { render, screen, fireEvent } from '@testing-library/react'
import { HealthFilter } from '@/components/recipes/HealthFilter'

describe('HealthFilter', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    mockOnChange.mockClear()
  })

  it('renders health filter component', () => {
    render(<HealthFilter selectedConditions={[]} onConditionsChange={mockOnChange} />)
    expect(screen.getByText(/Metabolic Health/i)).toBeInTheDocument()
  })

  it('allows selecting health conditions', () => {
    render(<HealthFilter selectedConditions={[]} onConditionsChange={mockOnChange} />)
    
    // Find and click on a category to expand
    const categoryButton = screen.getByText(/Metabolic Health/i)
    fireEvent.click(categoryButton)

    // Should be able to select conditions
    expect(screen.getByText(/Type 2 Diabetes/i)).toBeInTheDocument()
  })

  it('shows active filters when conditions are selected', () => {
    render(
      <HealthFilter 
        selectedConditions={['diabetes-type2']} 
        onConditionsChange={mockOnChange} 
      />
    )
    
    expect(screen.getByText(/Type 2 Diabetes/i)).toBeInTheDocument()
  })

  it('allows clearing all filters', () => {
    render(
      <HealthFilter 
        selectedConditions={['diabetes-type2', 'vegan']} 
        onConditionsChange={mockOnChange} 
      />
    )
    
    const clearButton = screen.getByText(/Clear all/i)
    fireEvent.click(clearButton)
    
    expect(mockOnChange).toHaveBeenCalledWith([])
  })
})
