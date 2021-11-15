import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import Navigation from './Navigation';

describe('Navigation component', () => {
  const props = {
    data: [
      {
        BCAP1: "Foo Bar 1",
        BCAP2: "Foo Bar 1.2",
        BCAP3: "Foo Bar 1.2.2",
        id: "123",
        name: "test 62",
        spend: 100,
      },
      {
        BCAP1: "Foo Bar 1",
        BCAP2: "Foo Bar 1.3",
        BCAP3: "Foo Bar 1.3.2",
        id: "456",
        name: "test 45",
        spend: 200,
      },
      {
        BCAP1: "Foo Bar 2",
        BCAP2: "Foo Bar 2.3",
        BCAP3: "Foo Bar 2.3.2",
        id: "789",
        name: "test 50",
        spend: 300,
      },
    ],
    getCategory: jest.fn()
  }

  it('should render navigation', () => {
    const { getAllByRole, debug } = render(<Navigation {...props} />)
    expect(getAllByRole('listitem')).toHaveLength(8);
  })

  it('should call get category function when click', () => {
    const { getByText, debug } = render(<Navigation {...props} />)
    const link = getByText('Foo Bar 2')
    fireEvent.click(link);

    expect(props.getCategory).toBeCalled()
    expect(props.getCategory).toHaveBeenCalledWith([
      {
        BCAP1: "Foo Bar 2",
        BCAP2: "Foo Bar 2.3",
        BCAP3: "Foo Bar 2.3.2",
        id: "789",
        name: "test 50",
        spend: 300,
      },
    ])
  })
})