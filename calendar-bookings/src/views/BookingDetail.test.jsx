import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { vi, describe, beforeEach, it, expect } from 'vitest';
import BookingDetail from './BookingDetail';
import { AppProvider } from '../context/AppContext';

// Mock useParams
vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useParams: () => ({
            stationId: '1',
            bookingId: '123'
        })
    };
});

// Mock fetch
globalThis.fetch = vi.fn();

const BookingDetailWithRouter = () => (
    <AppProvider>
        <BrowserRouter>
            <BookingDetail />
        </BrowserRouter>
    </AppProvider>
);

describe('BookingDetail Component', () => {
    const mockBooking = {
        id: '123',
        customerName: 'John Doe',
        startDate: '2024-08-12',
        endDate: '2024-08-15',
        pickupStation: 'Berlin Station',
        returnStation: 'Berlin Station'
    };

    beforeEach(() => {
        fetch.mockClear();
        fetch.mockResolvedValue({
            ok: true,
            json: () => Promise.resolve(mockBooking)
        });
    });

    it('shows loading state initially', () => {
        render(<BookingDetailWithRouter />);
        
        expect(screen.getByText('Loading booking...')).toBeInTheDocument();
        expect(screen.getByAltText('Loading...')).toBeInTheDocument();
    });

    it('fetches booking details on mount', async () => {
        render(<BookingDetailWithRouter />);

        await waitFor(() => {
            expect(fetch).toHaveBeenCalledWith(
                'https://605c94c36d85de00170da8b4.mockapi.io/stations/1/bookings/123'
            );
        });
    });

    it('displays booking information after loading', async () => {
        render(<BookingDetailWithRouter />);

        await waitFor(() => {
            expect(screen.getByText('Booking for John Doe')).toBeInTheDocument();
            expect(screen.getByText(/Duration: 3 days/)).toBeInTheDocument();
            expect(screen.getByText(/Pickup in Berlin Station/)).toBeInTheDocument();
        });
    });

    it('shows return to calendar button', async () => {
        render(<BookingDetailWithRouter />);

        await waitFor(() => {
            const returnButton = screen.getByText('Return to the calendar');
            expect(returnButton).toBeInTheDocument();
            expect(returnButton.closest('a')).toHaveAttribute('href', '/');
        });
    });

    it('handles fetch errors', async () => {
        fetch.mockRejectedValueOnce(new Error('API Error'));
        
        render(<BookingDetailWithRouter />);

        await waitFor(() => {
            expect(screen.getByText(/Failed to fetch booking:/)).toBeInTheDocument();
        });
    });
});