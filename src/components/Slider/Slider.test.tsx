import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Slider from './Slider';


describe('Slider component', () => {
  const props = {
    min: 100,
    max: 1000,
    selectedValue: 800,
    handleFilter: jest.fn()
  }

  it('should render slider', () => {
    const { getByRole } = render(<Slider {...props} />)
    expect(getByRole('slider')).toBeInTheDocument();
  })

  it('should format min price correctly', () => {
    const { getByText } = render(<Slider {...props} />)
    expect(getByText('$100.00')).toBeInTheDocument();
  })

  it('should format selected price correctly', () => {
    const { getByText } = render(<Slider {...props} />)
    expect(getByText('$800.00')).toBeInTheDocument();
  })
})