# Coding Challenge Calendar Bookings

<p>
  <img src="./calendar-bookings/public/roadsurfer-favicon.png" alt="Van Logo" width="32" style="margin-right: 10px;">
  <img src="https://react.dev/favicon-32x32.png" alt="React Logo" width="32" style="margin-right: 10px;">
  <img src="https://vitejs.dev/logo-with-shadow.png" alt="Vite Logo" width="32">
</p>

Documenting the challenge process and deployment

## Resources:

- [React docs](https://react.dev/learn)
- [Temporal API](https://tc39.es/proposal-temporal/docs/)
- [Vitest docs](https://vitest.dev/guide/)
- [React Testing Library docs](https://testing-library.com/docs/react-testing-library/intro/)

## Development tools:

- GitHub Copilot with Claude Sonnet 4 - Used for code suggestions and debugging assistance
- ChatGPT 4/5 - Consulted for architecture decisions and best practices clarification

_AI tools were used as coding assistants to enhance productivity while maintaining full understanding of the implementation and logic decisions. Used to create unit tests with Vitest_

## Main functionalities

- Reusable autocomplete component ✅
- Calendar view component ✅
- Booking detail component ✅

## Optional features

### Unit tests

- **App Component** - Router integration and main layout
- **Calendar Component** - Week navigation, station selection, booking display
- **BookingDetail Component** - URL params, API fetch, data rendering
- **Autocomplete Component** - Search functionality and station selection
- **useCalendar Hook** - Temporal API integration and date calculations

All components tested with user interactions, API mocking, and error handling using Vitest + React Testing Library

### State Management

Since the logic of the application could be managed without state management, the infrastructure has been created with the idea of escalating in the future. Currently it creates a message in AppContext.jsx that is then console logged in BookingDetail. Potential future uses:

- User Management
- Dark mode UI
- Language settings
- Etc.

### Reschedule Booking (theoretical overview)

A potential improvement beyond the current MVP would be to implement drag-and-drop functionality for station employees to reschedule bookings.

**Frontend Implementation:**

1. Drag booking card → capture booking data
2. Drop on target day → validate new date (`.day-group` would become drop zones)
3. Show loading state → disable further interactions
4. API call → PUT /api/bookings/{id}/reschedule
5. Success: Update local state → refresh calendar data
6. Error: Revert UI changes → show error message

*Thank you for taking the time to read until here and review my code.*

**Eloy RV**