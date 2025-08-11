import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useCalendar } from './useCalendar';

describe('useCalendar hook', () => {
    it('returns calendar properties', () => {
        const { result } = renderHook(() => useCalendar());
        
        expect(result.current).toHaveProperty('today');
        expect(result.current).toHaveProperty('currentDay');
        expect(result.current).toHaveProperty('currentDayOfTheWeek');
        expect(result.current).toHaveProperty('currentMonth');
        expect(result.current).toHaveProperty('currentYear');
    });

    it('returns valid date values', () => {
        const { result } = renderHook(() => useCalendar());
        
        expect(typeof result.current.currentDay).toBe('number');
        expect(typeof result.current.currentMonth).toBe('number');
        expect(typeof result.current.currentYear).toBe('number');
        expect(result.current.currentDayOfTheWeek).toBeGreaterThanOrEqual(1);
        expect(result.current.currentDayOfTheWeek).toBeLessThanOrEqual(7);
    });

    it('current month is between 1-12', () => {
        const { result } = renderHook(() => useCalendar());
        
        expect(result.current.currentMonth).toBeGreaterThanOrEqual(1);
        expect(result.current.currentMonth).toBeLessThanOrEqual(12);
    });
});