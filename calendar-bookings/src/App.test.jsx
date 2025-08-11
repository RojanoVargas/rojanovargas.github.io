import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import App from './App';

// Mock the Calendar and BookingDetail components
vi.mock('./views/Calendar', () => ({
    default: () => <div>Calendar Component</div>
}));

vi.mock('./views/BookingDetail', () => ({
    default: () => <div>BookingDetail Component</div>
}));

// Mock the context
vi.mock('./context/AppContext', () => ({
    AppProvider: ({ children }) => <div>{children}</div>,
    AppContext: {}
}));

// Mock fetch for Header component
globalThis.fetch = vi.fn();

describe('App Component', () => {
    it('renders header and main content', () => {
        render(<App />);
        
        expect(screen.getByRole('banner')).toBeInTheDocument(); // header
        expect(screen.getByRole('main')).toBeInTheDocument();
    });

    it('renders Calendar component on root path', () => {
        render(<App />);
        
        expect(screen.getByText('Calendar Component')).toBeInTheDocument();
    });
});