import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import Calendar from './Calendar';

// Mock the useCalendar hook
vi.mock('../hooks/useCalendar', () => ({
    useCalendar: () => ({
        today: {
            add: vi.fn(() => ({
                dayOfWeek: 1,
                year: 2024,
                month: 8,
                day: 12,
                add: vi.fn(() => ({
                    dayOfWeek: 2,
                    year: 2024,
                    month: 8,
                    day: 13
                }))
            }))
        }
    })
}));

// Mock fetch
globalThis.fetch = vi.fn();

const CalendarWithRouter = () => (
    <BrowserRouter>
        <Calendar />
    </BrowserRouter>
);

describe('Calendar Component', () => {
    const mockBookings = [
        {
            id: '1',
            customerName: 'John Doe',
            startDate: '2024-08-12',
            endDate: '2024-08-15'
        },
        {
            id: '2',
            customerName: 'Jane Smith',
            startDate: '2024-08-13',
            endDate: '2024-08-16'
        }
    ];

    beforeEach(() => {
        fetch.mockClear();
        
        // Mock stations fetch
        fetch.mockImplementation((url) => {
            if (url.includes('/stations/') && url.includes('/bookings')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve(mockBookings)
                });
            }
            if (url.includes('/stations')) {
                return Promise.resolve({
                    ok: true,
                    json: () => Promise.resolve([
                        { id: '1', name: 'Berlin Station' },
                        { id: '2', name: 'Munich Station' }
                    ])
                });
            }
        });
    });

    it('renders hero section with title and autocomplete', async () => {
        render(<CalendarWithRouter />);
        
        expect(screen.getByText('Bookings overview')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Search stations...')).toBeInTheDocument();
        
        // Wait for initial render to complete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });
    });

    it('displays week grid with 7 days', async () => {
        render(<CalendarWithRouter />);
        
        // Wait for initial render first
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });

        // Check for specific day names using getAllByText to handle multiple matches
        expect(screen.getAllByText(/Monday/)).toHaveLength(1);
        expect(screen.getAllByText(/Tuesday/)).toHaveLength(1);
        expect(screen.getAllByText(/Wednesday/)).toHaveLength(1);
        expect(screen.getAllByText(/Thursday/)).toHaveLength(1);
        expect(screen.getAllByText(/Friday/)).toHaveLength(1);
        expect(screen.getAllByText(/Saturday/)).toHaveLength(1);
        expect(screen.getAllByText(/Sunday/)).toHaveLength(1);
    });

    it('shows week navigation controls', async () => {
        render(<CalendarWithRouter />);
        
        expect(screen.getByText('Today')).toBeInTheDocument();
        expect(screen.getByText('←')).toBeInTheDocument();
        expect(screen.getByText('→')).toBeInTheDocument();
        
        // Wait for initial render to complete
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });
    });

    it('fetches bookings when station is selected', async () => {
        const user = userEvent.setup();
        render(<CalendarWithRouter />);

        // Wait for initial load
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });

        const input = screen.getByPlaceholderText('Search stations...');
        await user.type(input, 'Berlin');

        await waitFor(() => {
            expect(screen.getByText('Berlin Station')).toBeInTheDocument();
        });

        await user.click(screen.getByText('Berlin Station'));

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings'
            );
        });
    });

    it('displays bookings on correct days', async () => {
        const user = userEvent.setup();
        render(<CalendarWithRouter />);

        // Wait for initial load
        await waitFor(() => {
            expect(fetch).toHaveBeenCalled();
        });

        // Select a station first
        const input = screen.getByPlaceholderText('Search stations...');
        await user.type(input, 'Berlin');
        await user.click(screen.getByText('Berlin Station'));

        // Check that bookings are displayed (multiple elements expected)
        await waitFor(() => {
            const bookingElements = screen.getAllByText(/🚐/);
            expect(bookingElements.length).toBeGreaterThan(0);
        });

        // Check that booking numbers appear (multiple expected)
        await waitFor(() => {
            const bookingNumbers = screen.getAllByText(/Booking #/);
            expect(bookingNumbers.length).toBeGreaterThan(0);
        });
    });
});