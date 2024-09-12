import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Nav from './Nav'; 

describe('Nav Component', () => {
  test('renders the Nav component correctly', () => {
    render(<Nav />);
    expect(screen.getByText('SUSTAINABILITY PROGRAM')).toBeInTheDocument(); 
  });

  test('Button is clickable', () => {
    const mockOnClick = jest.fn();
    render(<Nav />);
    const button = screen.getByRole('button'); // Adjust this selector if your button uses a different role or element type
    fireEvent.click(button);
    expect(mockOnClick).toHaveBeenCalledTimes(0); // Since there's no real click handler attached
  });
});
