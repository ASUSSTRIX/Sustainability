import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Goals from './Goals';
import { fetchData } from '../../../services/apiService';
import { notification } from 'antd';

jest.mock('../../../services/apiService');
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');
  return {
    ...antd,
    notification: {
      success: jest.fn(),
    },
  };
});

describe('Goals Component', () => {
  beforeEach(() => {
    fetchData.mockResolvedValue([
      {
        id: 1,
        pillarName: 'Energy',
        questions: [
          {
            text: 'Reduce energy consumption by <percentage>%',
            inputFields: [{ inputId: 'percentage', inputType: 'number' }],
          },
        ],
      },
    ]);
  });

  test('renders the Goals component correctly', async () => {
    render(<Goals />);
    await waitFor(() => {
      expect(screen.getByText('Energy')).toBeInTheDocument();
      expect(screen.getByText('Reduce energy consumption by')).toBeInTheDocument();
    });
  });

  test('Save button triggers save notification', async () => {
    render(<Goals />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Save'));
    });
    expect(notification.success).toHaveBeenCalledWith({
      message: 'Fields Saved',
      description: 'Your changes have been saved successfully.',
    });
  });

  test('Next button requires save before navigating', async () => {
    render(<Goals />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Next'));
    });
    expect(screen.getByText('Save Required')).toBeInTheDocument();
  });

  test('Clicking Next after save shows confirmation modal', async () => {
    render(<Goals />);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Save'));
    });
    fireEvent.click(screen.getByText('Next'));
    await waitFor(() => {
      expect(screen.getByText('Are you sure you want to move to the next page?')).toBeInTheDocument();
    });
  });
});
