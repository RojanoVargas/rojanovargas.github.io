import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import Autocomplete from './Autocomplete';

// Mock fetch globally
globalThis.fetch = vi.fn();

describe('Autocomplete Component', () => {
    const mockOnSelect = vi.fn();
    const mockStations = [
        { id: '1', name: 'Berlin Station' },
        { id: '2', name: 'Munich Station' }
    ];

    beforeEach(() => {
        fetch.mockClear();
        mockOnSelect.mockClear();
        
        // Default mock response for all tests
        fetch.mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(mockStations),
        });
    });

    it('renders search input with correct placeholder', () => {
        render(<Autocomplete onSelectStation={mockOnSelect} />);
        
        const input = screen.getByPlaceholderText('Search stations...');
        expect(input).toBeInTheDocument();
    });

    it('fetches stations on component mount', async () => {
        render(<Autocomplete onSelectStation={mockOnSelect} />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'https://605c94c36d85de00170da8b4.mockapi.io/stations'
            );
        });
    });

    it('shows dropdown when typing', async () => {
        const user = userEvent.setup();
        render(<Autocomplete onSelectStation={mockOnSelect} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'Berlin');

        await waitFor(() => {
            expect(screen.getByText('Berlin Station')).toBeInTheDocument();
        });
    });

    it('calls onSelectStation when option is clicked', async () => {
        const user = userEvent.setup();
        render(<Autocomplete onSelectStation={mockOnSelect} />);

        const input = screen.getByRole('textbox');
        await user.type(input, 'Berlin');

        await waitFor(() => {
            expect(screen.getByText('Berlin Station')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Berlin Station'));

        expect(mockOnSelect).toHaveBeenCalledWith({
            id: '1',
            name: 'Berlin Station'
        });
    });
});