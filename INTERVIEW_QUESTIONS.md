# Users Dashboard - Interview Questions & Answers

This document contains comprehensive interview questions that interviewers might ask about this project, along with detailed answers.

---

## Table of Contents

1. [Project Overview Questions](#project-overview-questions)
2. [React & TypeScript Questions](#react--typescript-questions)
3. [State Management Questions](#state-management-questions)
4. [Performance & Optimization Questions](#performance--optimization-questions)
5. [Architecture & Design Questions](#architecture--design-questions)
6. [Testing & Quality Questions](#testing--quality-questions)
7. [API & Data Fetching Questions](#api--data-fetching-questions)
8. [UI/UX Questions](#uiux-questions)
9. [Code Quality & Best Practices](#code-quality--best-practices)
10. [Problem-Solving & Debugging](#problem-solving--debugging)

---

## Project Overview Questions

### Q1: Can you give me a high-level overview of this project?

**Answer:**
This is a Users Dashboard application built with React 19 and TypeScript. It's a single-page application that allows users to:
- Authenticate using a fake authentication system
- View a list of users fetched from the JSONPlaceholder API
- Search and filter users by multiple fields (name, email, username, company, city)
- Sort users by various fields in ascending/descending order
- Switch between table and card view modes
- View detailed user information including location on a map
- Handle loading, error, and empty states gracefully

The project uses modern React patterns, TypeScript for type safety, Tailwind CSS for styling, and React Query for server state management.

---

### Q2: Why did you choose this tech stack?

**Answer:**
- **React 19**: Latest version with improved concurrent features and better performance
- **TypeScript**: Type safety catches errors at compile time, improves developer experience, and makes code more maintainable
- **Vite**: Fast build tool with excellent HMR (Hot Module Replacement) and optimized production builds
- **React Query (TanStack Query)**: Handles server state, caching, background updates, and error states automatically - reduces boilerplate significantly
- **Tailwind CSS**: Utility-first approach allows rapid UI development with consistent design
- **Radix UI**: Accessible, unstyled components that provide a solid foundation for custom UI
- **Axios**: More feature-rich than fetch API (interceptors, automatic JSON parsing, request cancellation)

---

### Q3: What are the main features of this application?

**Answer:**
1. **Authentication System**: Fake auth with multiple account roles (Admin, Manager, Viewer)
2. **User Display**: Shows users in both table and card views
3. **Search Functionality**: Real-time search across name, email, username, company, and city
4. **Sorting**: Multi-field sorting with ascending/descending toggle
5. **User Details Modal**: Detailed view with full user information and location map
6. **Map Integration**: OpenStreetMap integration showing user location
7. **State Management**: Loading skeletons, error states, empty states
8. **Responsive Design**: Works on mobile, tablet, and desktop
9. **State Simulator**: Development tool to test different UI states

---

## React & TypeScript Questions

### Q4: Why did you use React.memo in DashboardPage?

**Answer:**
`React.memo` prevents unnecessary re-renders of the `DashboardPage` component. Since this is a top-level component that doesn't receive props, it will only re-render when its parent (`App`) re-renders. However, using `memo` here is a defensive optimization - if `App` re-renders for any reason (like context updates), `DashboardPage` won't re-render unless its props change.

In this case, since `DashboardPage` has no props, it's a minor optimization. More importantly, it demonstrates awareness of React performance optimization techniques.

---

### Q5: Explain the use of useCallback and useMemo in your code.

**Answer:**

**useCallback** (used in `UsersSection.tsx`):
- `filterFn`: Memoized to prevent creating a new function on every render, which would cause `useFilterSort` to re-run unnecessarily
- `handleViewUser`: Prevents child components from re-rendering when the function reference changes
- `handleStateChange`: Same reason - stable function reference

**useMemo** (used in `useFilterSort.ts`):
- `sortConfig`: Memoized object to prevent unnecessary recalculations and ensure referential equality
- `filteredItems`: Expensive filtering operation - only recalculates when `items`, `searchTerm`, or `filterFn` change
- `sortedItems`: Expensive sorting operation - only recalculates when `filteredItems` or `sortConfig` change

These optimizations prevent unnecessary re-renders and expensive recalculations, improving performance especially with large datasets.

---

### Q6: How does TypeScript help in this project?

**Answer:**
TypeScript provides several benefits:

1. **Type Safety**: Catches errors at compile time (e.g., passing wrong props, accessing undefined properties)
2. **IntelliSense**: Better autocomplete and documentation in IDE
3. **Refactoring Confidence**: Safe refactoring with compiler checking
4. **Self-Documenting Code**: Types serve as inline documentation
5. **Generic Types**: Used in `useFilterSort` hook to make it reusable for any data type
6. **Interface Definitions**: Clear contracts for data structures (User, AuthContextType, etc.)

Example: The `User` interface ensures all user objects have the correct structure, preventing runtime errors from missing properties.

---

### Q7: Explain the path alias configuration (`@/*`).

**Answer:**
Path aliases configured in both `tsconfig.json` and `vite.config.ts` allow importing with `@/` instead of relative paths like `../../../`.

**Benefits:**
- Cleaner imports: `@/components/UserCard` vs `../../components/UserCard`
- Easier refactoring: Moving files doesn't break imports
- Better readability: Clear indication of project structure
- Consistency: Standard pattern across the codebase

**Configuration:**
- TypeScript: `"paths": { "@/*": ["./src/*"] }` in `tsconfig.json`
- Vite: `alias: { "@": path.resolve(__dirname, "./src") }` in `vite.config.ts`

---

## State Management Questions

### Q8: Why did you choose React Query over Redux or other state management solutions?

**Answer:**
React Query is specifically designed for **server state** (data from APIs), while Redux is better for **client state** (UI state, application state).

**React Query advantages for this use case:**
- Automatic caching and background refetching
- Built-in loading and error states
- Request deduplication (multiple components requesting same data = one request)
- Automatic garbage collection of unused cache
- Optimistic updates support
- Less boilerplate than Redux

**Why not Redux:**
- Overkill for this project's complexity
- More boilerplate (actions, reducers, store setup)
- React Query handles server state better out of the box

**For client state** (auth, UI state), React Context + useState is sufficient and simpler than Redux for this scale.

---

### Q9: How does the authentication context work?

**Answer:**
The authentication system uses React Context API:

1. **AuthContext** (`auth-context.ts`): Creates the context with `undefined` default
2. **AuthProvider** (`AuthContext.tsx`): 
   - Manages auth state with `useState`
   - Initializes from `localStorage` (persistence)
   - Provides `login`, `logout`, `user`, and `isAuthenticated`
3. **useAuth Hook** (`useAuth.ts`): 
   - Custom hook to access context
   - Throws error if used outside provider (safety check)

**Flow:**
- User selects account → `login()` called → state updated + saved to localStorage
- On app load → state initialized from localStorage
- `isAuthenticated` boolean controls route access in `App.tsx`

**Why Context over Redux?** Simple state, no complex updates, no middleware needed.

---

### Q10: Explain the useFilterSort hook design.

**Answer:**
`useFilterSort` is a **generic, reusable hook** that can work with any data type:

**Design decisions:**
1. **Generics** (`<T, TField>`): Type-safe for any data type
2. **Composition**: Accepts `filterFn` and `sortFn` as parameters (strategy pattern)
3. **Memoization**: Expensive operations (filter, sort) memoized with `useMemo`
4. **Separation of concerns**: Filtering and sorting logic in separate files (`lib/`)

**Benefits:**
- Reusable for users, products, orders, etc.
- Testable in isolation
- Flexible - swap filter/sort implementations easily
- Performance optimized with memoization

**Usage pattern:**
```typescript
const { filteredItems, searchTerm, setSearchTerm, ... } = useFilterSort({
  items: users,
  filterFn: customFilter,
  sortFn: sortUsers,
  initialSortField: "name"
});
```

---

## Performance & Optimization Questions

### Q11: How would you optimize this app for 10,000+ users?

**Answer:**

1. **Virtual Scrolling**:
   - Use `react-window` or `react-virtual` to render only visible items
   - Reduces DOM nodes from 10,000 to ~20-30

2. **Pagination/Infinite Scroll**:
   - Server-side pagination instead of loading all users
   - Load 50-100 users at a time

3. **Debounced Search**:
   - Current: Search on every keystroke
   - Optimized: Debounce search input (300-500ms delay)
   - Reduces filter operations significantly

4. **Web Workers for Filtering/Sorting**:
   - Move expensive operations to background thread
   - Prevents UI blocking

5. **Memoization Improvements**:
   - More granular `React.memo` on list items
   - Memoize expensive computations

6. **Code Splitting**:
   - Lazy load components (UserDetailsModal, UserMap)
   - Route-based code splitting if adding routes

7. **IndexedDB Caching**:
   - Cache user data locally for offline access
   - Faster subsequent loads

---

### Q12: What performance optimizations are already implemented?

**Answer:**

1. **React.memo**: On `DashboardPage` to prevent unnecessary re-renders
2. **useMemo**: For filtered and sorted items (expensive operations)
3. **useCallback**: For event handlers to maintain referential equality
4. **React Query Caching**: 
   - `staleTime: 5 minutes` - data considered fresh
   - Automatic request deduplication
   - Background refetching
5. **Lazy Loading**: Map iframe uses `loading="lazy"`
6. **Skeleton Loading**: Better perceived performance than spinners
7. **Memoized Sort Config**: Prevents unnecessary sort recalculations

---

### Q13: How does React Query improve performance?

**Answer:**

1. **Request Deduplication**: Multiple components requesting same data = one network request
2. **Intelligent Caching**: 
   - Data cached in memory
   - `staleTime` determines when to refetch
   - Unused cache automatically garbage collected
3. **Background Refetching**: Updates data in background without blocking UI
4. **Automatic Retries**: Failed requests retried automatically
5. **Optimistic Updates**: Can update UI before server confirms (if implemented)
6. **Request Cancellation**: Cancels in-flight requests when component unmounts

**Example**: If `UserTable` and `UserCards` both use `useUsers()`, only one API call is made, and both components share the cached data.

---

## Architecture & Design Questions

### Q14: Explain the folder structure and why you organized it this way.

**Answer:**

**Feature-based organization** with clear separation:

```
api/          → Data fetching layer (API calls)
components/   → UI components
  features/   → Feature-specific (UsersSection, UserTable)
  ui/         → Reusable primitives (Button, Card)
contexts/     → Global state providers
hooks/        → Reusable logic
lib/          → Pure utility functions
pages/        → Page-level components
types/        → TypeScript definitions
constants/    → Application constants
```

**Benefits:**
- **Scalability**: Easy to add new features without cluttering
- **Maintainability**: Related code grouped together
- **Reusability**: UI components and hooks can be shared
- **Testability**: Clear boundaries for unit testing
- **Team Collaboration**: Multiple developers can work on different features

**Alternative considered**: Domain-driven design (grouping by feature completely), but current structure balances reusability with organization.

---

### Q15: Why separate filterUsers and sortUsers into lib/ instead of keeping them in the hook?

**Answer:**

**Separation of concerns:**
- **lib/**: Pure functions, no React dependencies, easily testable
- **hooks/**: React-specific logic, state management

**Benefits:**
1. **Testability**: Pure functions are easier to unit test (no React needed)
2. **Reusability**: Can be used outside React (Node.js, other frameworks)
3. **Testability**: Can test business logic independently of React
4. **Clarity**: Clear distinction between pure logic and React hooks
5. **Performance**: Pure functions can be optimized/memoized more easily

**Example**: `filterUsers` can be tested with simple Jest tests, no React Testing Library needed.

---

### Q16: How would you add a new feature (e.g., user favorites)?

**Answer:**

1. **Update Types** (`types/user.ts`):
   ```typescript
   export interface User {
     // ... existing
     isFavorite?: boolean;
   }
   ```

2. **Add API Function** (`api/users.ts`):
   ```typescript
   export const toggleFavorite = async (userId: number) => { ... }
   ```

3. **Create Hook** (`hooks/useFavorites.ts`):
   ```typescript
   export const useFavorites = () => {
     const queryClient = useQueryClient();
     // Mutation logic with React Query
   }
   ```

4. **Update UI** (`components/features/UserCard.tsx`):
   - Add favorite button/icon
   - Use `useFavorites` hook

5. **Update State** (if needed):
   - Add to Context or local state

**Key principles:**
- Follow existing patterns
- Keep concerns separated
- Make it reusable
- Add TypeScript types

---

## Testing & Quality Questions

### Q17: How would you test this application?

**Answer:**

**Unit Tests** (Vitest/Jest):
- Pure functions: `filterUsers`, `sortUsers` - test with various inputs
- Utility functions: `cn` (class name utility)
- Custom hooks: `useFilterSort` with React Testing Library hooks

**Component Tests** (React Testing Library):
- `LoginPage`: Test login flow, form validation
- `UserTable`: Test rendering, sorting, click handlers
- `SearchBar`: Test input changes, debouncing
- `UsersSection`: Test state transitions (loading, error, success)

**Integration Tests**:
- Full user flow: Login → View users → Search → Sort → View details
- API integration: Mock API responses, test error handling

**E2E Tests** (Playwright/Cypress):
- Critical user journeys
- Cross-browser testing
- Accessibility testing

**What to test:**
- User interactions (clicks, inputs)
- State changes
- API calls and responses
- Error scenarios
- Edge cases (empty data, network failures)

---

### Q18: What testing strategy would you use for the useFilterSort hook?

**Answer:**

**Using React Testing Library's `renderHook`:**

```typescript
import { renderHook, act } from '@testing-library/react';
import { useFilterSort } from './useFilterSort';

test('filters items correctly', () => {
  const items = [
    { name: 'John', email: 'john@test.com' },
    { name: 'Jane', email: 'jane@test.com' }
  ];
  
  const { result } = renderHook(() =>
    useFilterSort({
      items,
      filterFn: (item, term) => item.name.includes(term),
    })
  );
  
  act(() => {
    result.current.setSearchTerm('John');
  });
  
  expect(result.current.filteredItems).toHaveLength(1);
  expect(result.current.filteredItems[0].name).toBe('John');
});
```

**Test cases:**
- Initial state
- Filtering with various search terms
- Sorting ascending/descending
- Combined filter + sort
- Empty search term
- No matching results
- Performance with large datasets

---

## API & Data Fetching Questions

### Q19: Why use Axios instead of the native fetch API?

**Answer:**

**Axios advantages:**
1. **Automatic JSON parsing**: No need for `.json()` call
2. **Request/Response interceptors**: Can add auth tokens, handle errors globally
3. **Request cancellation**: Built-in support with AbortController
4. **Better error handling**: HTTP errors automatically rejected (fetch only rejects on network errors)
5. **Timeout support**: Built-in timeout configuration
6. **Request/Response transformation**: Easy data transformation
7. **Wider browser support**: Works in older browsers

**When to use fetch:**
- Smaller bundle size (Axios adds ~13KB)
- Native browser API (no dependency)
- Simple use cases where Axios features aren't needed

**For this project**: Axios provides better developer experience and more features out of the box.

---

### Q20: How does React Query handle errors and retries?

**Answer:**

**Error Handling:**
- React Query catches errors from `queryFn`
- Sets `error` state in query result
- Component can check `error` and display error UI

**Retry Logic** (configured in `main.tsx`):
```typescript
queries: {
  retry: 1,  // Retry failed requests once
}
```

**Retry behavior:**
- Default: 3 retries with exponential backoff
- Custom: Can configure retry count, retry delay, retry condition
- Network errors: Automatically retried
- 4xx errors: Typically not retried (client error)
- 5xx errors: Retried (server error)

**In this project:**
- `retry: 1` means one retry attempt
- `retry: 2` in `useUsers` hook overrides to 2 retries
- Exponential backoff: 1s, 2s, 4s delays between retries

---

### Q21: What is staleTime and why is it set to 5 minutes?

**Answer:**

**staleTime**: Duration data is considered "fresh" (doesn't need refetching)

**Configuration:**
```typescript
staleTime: 5 * 60 * 1000  // 5 minutes
```

**Behavior:**
- Data fetched at 10:00 AM is fresh until 10:05 AM
- During this window: React Query uses cached data, no network request
- After 5 minutes: Data marked "stale" but still used
- On component mount/focus: Stale data shown immediately, then refetched in background

**Why 5 minutes:**
- User data doesn't change frequently
- Balance between freshness and performance
- Reduces unnecessary API calls
- Better user experience (instant data display)

**Alternative values:**
- `0` (default): Data always stale, refetch on mount/focus
- `Infinity`: Data never stale, manual refetch only
- `30 * 1000`: 30 seconds for frequently changing data

---

## UI/UX Questions

### Q22: How did you implement the loading states?

**Answer:**

**Multiple loading states:**

1. **Initial Load** (`useUsers` hook):
   - `isLoading: true` when fetching for first time
   - Shows skeleton loaders (`UserTableSkeleton`, `UserCardsSkeleton`)

2. **Background Refetch**:
   - `isFetching: true` but `isLoading: false`
   - Data still visible, subtle loading indicator (if implemented)

3. **State Simulator**:
   - Development tool to test different states
   - Can force loading/error/empty states

**Skeleton Loaders:**
- Match actual content structure
- Better UX than spinners (shows layout)
- Prevents layout shift when content loads

**Why skeletons over spinners:**
- Better perceived performance
- Users see structure immediately
- Less jarring transition
- Industry best practice (Facebook, LinkedIn, etc.)

---

### Q23: Explain the responsive design approach.

**Answer:**

**Mobile-First Design with Tailwind CSS:**

1. **Breakpoints**:
   - Default: Mobile (< 640px)
   - `sm:`: Small screens (≥ 640px)
   - `md:`: Medium screens (≥ 768px)
   - `lg:`: Large screens (≥ 1024px)

2. **Responsive Patterns**:
   - **Flexbox**: `flex-col sm:flex-row` - Stack on mobile, row on desktop
   - **Grid**: `grid-cols-1 md:grid-cols-2` - 1 column mobile, 2 desktop
   - **Spacing**: `px-4 py-6` - Consistent padding across devices
   - **Text**: Responsive font sizes, truncation for long text

3. **Component Adaptations**:
   - **Table View**: Horizontal scroll on mobile, full table on desktop
   - **Cards**: Single column mobile, grid on desktop
   - **Modal**: Full screen on mobile, centered on desktop
   - **Navbar**: Collapsible menu on mobile (if implemented)

**Testing**: Test on various screen sizes, use browser DevTools responsive mode.

---

### Q24: Why use Radix UI instead of building components from scratch?

**Answer:**

**Radix UI benefits:**

1. **Accessibility**: 
   - ARIA attributes, keyboard navigation, focus management
   - Screen reader support out of the box
   - WCAG compliant

2. **Unstyled**:
   - Full control over styling
   - No CSS conflicts
   - Works with any styling solution

3. **Headless**:
   - Logic separated from presentation
   - Can customize UI completely
   - Composable primitives

4. **Production Ready**:
   - Battle-tested in production
   - Handles edge cases
   - Regular updates and bug fixes

5. **Time Saving**:
   - Don't reinvent accessibility wheel
   - Focus on business logic, not component internals

**Example**: Dialog component handles focus trapping, escape key, outside click, portal rendering - all complex accessibility features.

---

## Code Quality & Best Practices

### Q25: What code quality measures are in place?

**Answer:**

1. **TypeScript**: 
   - Strict mode enabled
   - Catches type errors at compile time
   - Prevents runtime errors

2. **ESLint**:
   - Code linting for consistency
   - React hooks rules
   - TypeScript-aware rules

3. **Code Organization**:
   - Clear folder structure
   - Separation of concerns
   - Reusable components and hooks

4. **Naming Conventions**:
   - PascalCase for components
   - camelCase for functions/variables
   - Descriptive names

5. **Type Safety**:
   - Interfaces for all data structures
   - Generic types for reusability
   - No `any` types

**Missing (could be added):**
- Prettier for code formatting
- Husky for pre-commit hooks
- Prettier + ESLint integration
- Type coverage tools

---

### Q26: How do you handle prop drilling in this project?

**Answer:**

**Current approach:**
- **Context API**: For global state (authentication)
- **Props**: For component-specific data
- **Custom Hooks**: Encapsulate logic, reduce prop passing

**Example**: Instead of passing `user`, `login`, `logout` through every component:
```typescript
// Bad: Prop drilling
<App user={user} login={login}>
  <Dashboard user={user} login={login}>
    <Navbar user={user} logout={logout} />
  </Dashboard>
</App>

// Good: Context + Hook
<AuthProvider>
  <Dashboard>
    <Navbar />  // Uses useAuth() hook
  </Dashboard>
</AuthProvider>
```

**When to use what:**
- **Context**: Global state (auth, theme, user preferences)
- **Props**: Component-specific, parent-child communication
- **State Management Library**: Complex state, time-travel debugging needed

---

### Q27: Explain the error handling strategy.

**Answer:**

**Multi-layer error handling:**

1. **API Layer** (`api/users.ts`):
   - Axios automatically throws on HTTP errors
   - Timeout configured (10 seconds)

2. **React Query** (`useUsers`):
   - Catches errors from `queryFn`
   - Provides `error` state
   - Automatic retry logic

3. **Component Layer** (`UsersSection`):
   - Checks `error` from hook
   - Displays `ErrorState` component
   - Provides retry button

4. **User Experience**:
   - Friendly error messages
   - Retry functionality
   - Fallback UI (error state component)

**Error types handled:**
- Network errors (offline, timeout)
- HTTP errors (404, 500)
- Parsing errors (invalid JSON)

**Could be improved:**
- Error boundaries for React errors
- Error logging (Sentry)
- More specific error messages
- Offline detection

---

## Problem-Solving & Debugging

### Q28: How would you debug a performance issue where the app is slow?

**Answer:**

**Debugging steps:**

1. **Identify the problem**:
   - React DevTools Profiler: Find slow components
   - Chrome DevTools Performance tab: Record and analyze
   - Check network tab: Slow API calls?

2. **Common issues**:
   - **Too many re-renders**: Check React DevTools, look for unnecessary state updates
   - **Expensive computations**: Use `useMemo`/`useCallback`
   - **Large lists**: Implement virtual scrolling
   - **Heavy components**: Code split, lazy load

3. **Tools**:
   - React DevTools Profiler
   - Chrome Performance tab
   - `why-did-you-render` library
   - Console.time() for specific operations

4. **Fix**:
   - Add memoization where needed
   - Optimize expensive operations
   - Reduce unnecessary re-renders
   - Implement virtual scrolling for large lists

**Example**: If `UsersSection` re-renders too often, check if props are changing unnecessarily, add `React.memo`, memoize callbacks.

---

### Q29: How would you handle a scenario where the API is down?

**Answer:**

**Current implementation:**
- React Query catches the error
- Displays `ErrorState` component
- User can click retry button

**Improvements:**

1. **Better error messages**:
   - Distinguish network errors from API errors
   - Show specific messages ("API unavailable", "Network error")

2. **Offline detection**:
   ```typescript
   const isOnline = navigator.onLine;
   // Show offline message if true
   ```

3. **Cached data**:
   - React Query shows stale data if available
   - Display "Last updated: X minutes ago" banner

4. **Exponential backoff**:
   - Increase retry delays
   - Prevent server overload

5. **Service Worker**:
   - Cache API responses
   - Serve cached data when offline

6. **User notification**:
   - Toast notification for errors
   - Persistent error banner

---

### Q30: If you had to add real authentication, how would you implement it?

**Answer:**

**Implementation plan:**

1. **Backend Integration**:
   - JWT token-based authentication
   - Login endpoint: `POST /api/auth/login`
   - Refresh token endpoint: `POST /api/auth/refresh`
   - Logout endpoint: `POST /api/auth/logout`

2. **Frontend Changes**:

   **API Layer** (`api/auth.ts`):
   ```typescript
   export const login = async (email: string, password: string) => {
     const response = await apiClient.post('/auth/login', { email, password });
     return response.data; // { token, refreshToken, user }
   };
   ```

   **Axios Interceptors**:
   ```typescript
   // Request interceptor: Add token to headers
   apiClient.interceptors.request.use((config) => {
     const token = localStorage.getItem('token');
     if (token) {
       config.headers.Authorization = `Bearer ${token}`;
     }
     return config;
   });

   // Response interceptor: Handle 401, refresh token
   apiClient.interceptors.response.use(
     (response) => response,
     async (error) => {
       if (error.response?.status === 401) {
         // Try refresh token, then retry request
       }
       return Promise.reject(error);
     }
   );
   ```

   **Auth Context Updates**:
   - Store JWT token securely
   - Implement token refresh logic
   - Handle token expiration
   - Clear tokens on logout

3. **Security**:
   - Store tokens in httpOnly cookies (more secure) or localStorage
   - Implement CSRF protection
   - Validate tokens on backend
   - Set token expiration times

4. **UX**:
   - Loading states during auth
   - Error messages for failed login
   - Auto-logout on token expiration
   - Remember me functionality

---

### Q31: How would you implement pagination for the users list?

**Answer:**

**Server-side pagination approach:**

1. **API Changes**:
   ```typescript
   export const fetchUsers = async (page: number, limit: number) => {
     const response = await apiClient.get('/users', {
       params: { _page: page, _limit: limit }
     });
     return {
       data: response.data,
       total: parseInt(response.headers['x-total-count'] || '0')
     };
   };
   ```

2. **React Query with Pagination**:
   ```typescript
   const useUsers = (page: number) => {
     return useQuery({
       queryKey: ['users', page],
       queryFn: () => fetchUsers(page, 10),
       keepPreviousData: true, // Show previous data while loading
     });
   };
   ```

3. **UI Components**:
   - Pagination controls (Previous, Next, page numbers)
   - Display "Page X of Y"
   - Loading state for page transitions

4. **Alternative: Infinite Scroll**:
   - Use `useInfiniteQuery` from React Query
   - Load more on scroll
   - Better for mobile UX

**Benefits:**
- Faster initial load
- Reduced memory usage
- Better performance with large datasets

---

### Q32: What would you do differently if building this from scratch?

**Answer:**

**Improvements:**

1. **Testing from the start**:
   - Set up Vitest/Jest
   - Write tests alongside code
   - Higher code coverage

2. **Error Boundaries**:
   - Catch React errors gracefully
   - Prevent full app crashes

3. **Environment Variables**:
   - `.env` files for API URLs
   - Different configs for dev/staging/prod

4. **Form Validation**:
   - Use Zod or Yup for schema validation
   - Better type safety

5. **Accessibility**:
   - More ARIA labels
   - Keyboard navigation
   - Screen reader testing

6. **Performance**:
   - Virtual scrolling from start
   - Code splitting
   - Image optimization

7. **Documentation**:
   - JSDoc comments
   - Storybook for components
   - Architecture decision records

8. **CI/CD**:
   - GitHub Actions for testing
   - Automated deployments

---

## Conclusion

These questions cover the breadth of knowledge needed to discuss this project in an interview setting. The answers demonstrate:

- **Technical depth**: Understanding of React, TypeScript, state management
- **Architecture awareness**: Design decisions and trade-offs
- **Problem-solving**: How to approach improvements and debugging
- **Best practices**: Code quality, testing, performance
- **Real-world application**: Practical considerations for production

Remember to adapt answers based on the specific interviewer's focus and the role requirements.
