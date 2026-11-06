# CRM Lead Interview Q&A - Event CRM Application

## Architecture & Data Flow

### Q1: How did you architect the data fetching layer in this application?

**Answer:**
I implemented a three-layer architecture for data fetching:

1. **Service Layer** (`src/service/`): Each domain has dedicated service files (e.g., `dashboard-service.ts`, `main-events-service.ts`) that wrap Axios calls. These services:
   - Use a centralized Axios instance configured with base URL and interceptors
   - Return standardized Promise-based responses (`ApiSuccessI | ApiErrorI`)
   - Handle errors consistently using `handleError` utility

2. **Redux Async Thunks** (`src/redux/slices/`): I used Redux Toolkit's `createAsyncThunk` to:
   - Call service methods
   - Transform API responses into application state
   - Handle loading states automatically through pending/fulfilled/rejected cases

3. **Component Layer**: Components dispatch thunks via `useAppDispatch()` and consume state via `useAppSelector()`

**Example Flow:**
```typescript
// Component → Redux Thunk → Service → API
dispatch(getLiveUsers()) 
  → dashboardSlice.getLiveUsers thunk
  → dashboardService.getLiveUsers()
  → GET /dashboard/users-list
```

---

### Q2: How did you implement centralized API configuration and authentication?

**Answer:**
I created a centralized Axios instance (`src/libs/axios/index.ts`) with:

1. **Base Configuration**: Uses `NEXT_PUBLIC_API_URL` from environment variables
2. **Request Interceptor**: Automatically injects authentication tokens:
   - Tries client-side session first (`getSession()`)
   - Falls back to server-side session (`getServerSession()`)
   - Adds token to `Authorization` header
   - Sets `Cache-Control: no-store` for fresh data

3. **Response Interceptor**: Handles global error scenarios:
   - Redirects to `/logout` on 401/403 errors
   - Works for both client and server-side rendering

This ensures all API calls are authenticated without repeating code in each service method.

---

## State Management

### Q3: How did you structure Redux state management for scalability?

**Answer:**
I implemented a modular Redux architecture:

1. **Feature-based Slices**: Each domain has its own slice (e.g., `dashboardSlice`, `mainEventsSlice`, `customerSlice`)

2. **Standardized State Structure**: Each slice follows a consistent pattern:
   ```typescript
   interface StateI {
     loading: boolean
     data: any[]
     rowCount: number
     // domain-specific fields
   }
   ```

3. **Async Thunk Pattern**: All async operations use `createAsyncThunk` with:
   - Standardized error handling via `rejectWithValue`
   - Automatic loading state management
   - Data transformation before storing in state

4. **Extra Reducers**: Handle async thunk lifecycle (pending/fulfilled/rejected) consistently across all slices

5. **Root Reducer Reset**: Implemented logout functionality that resets entire state tree on `USER_LOGOUT` action

**Example from dashboardSlice:**
```typescript
builder.addCase(getLiveUsers.pending, state => {
  state.loading = true
})
builder.addCase(getLiveUsers.fulfilled, (state, { payload: { list, rowCount } }) => {
  state.liveUsers = Array.isArray(list) ? list : []
  state.loading = false
  state.rowCount = rowCount
})
```

---

## Lead & Event Management

### Q4: How did you implement the lead-to-event conversion workflow?

**Answer:**
I implemented a status-based event lifecycle system:

1. **Event Statuses**: Four distinct statuses tracked:
   - `lead` - Initial inquiry
   - `follow up` - Requires follow-up
   - `confirmed` - Event confirmed
   - `lost` - Lead lost

2. **Status Management**: 
   - Status changes via dedicated API endpoint: `PATCH /main-events/{id}/status`
   - Status stored in Redux state and reflected in UI with color-coded labels
   - Dashboard shows upcoming leads/follow-ups separately from confirmed events

3. **Dashboard Integration**: 
   - `getUpcomingLeadsFollowup()` fetches events with status 'lead' or 'follow up'
   - `getUpcomingConfirmed()` fetches confirmed events
   - Calendar view highlights dates with different statuses

4. **Event Creation**: When creating an event, it starts as a 'lead' by default, then progresses through the pipeline

**Implementation:**
```typescript
// Status update thunk
export const setMainEventStatus = createAsyncThunk(
  'mainEvents/setMainEventStatus',
  async (payload: setMainEventStatusI, { rejectWithValue }) => {
    const res = await mainEventService.setMainEventStatus(payload)
    return res
  }
)
```

---

### Q5: How did you handle event creation with customer data?

**Answer:**
I implemented a unified form that creates both customer and event in a single transaction:

1. **Form Structure**: Multi-step form with sections:
   - Personal Details (customer info)
   - Event Details (event type, dates, location, budget, guests)
   - Menu Preferences (menu types, cuisine preferences)

2. **Data Transformation**: 
   - Converts dates to Unix timestamps using `dateToUnixString()`
   - Filters out undefined/false values from menu preferences
   - Structures payload with nested customer object

3. **API Payload**: Single POST request to `/main-events` with:
   ```typescript
   {
     customer: { first_name, last_name, email, contact_no },
     event_type: string,
     event_name: string,
     event_start_date: unix_timestamp,
     event_end_date: unix_timestamp,
     location_preference: string,
     budget: number,
     event_guest: number,
     menu_preferences: object
   }
   ```

4. **Post-Creation Flow**: After successful creation, redirects to event detail page for further configuration

---

## Authentication & Authorization

### Q6: How did you implement role-based access control (RBAC)?

**Answer:**
I implemented a multi-layer permission system:

1. **Permission Structure**: 
   - Permissions stored in user session under `session.user.role.permission`
   - Each permission has module (e.g., 'main_event', 'customer') and access type ('can_read', 'can_add', 'can_edit', 'can_delete')

2. **Middleware Protection** (`src/middleware.ts`):
   - Route-level protection using `routePermissions` array
   - Checks permissions before allowing route access
   - Redirects unauthorized users to home page

3. **Component-Level Protection**:
   - `useAccess()` hook for conditional rendering
   - `HasAccess` component wrapper for UI elements
   - Example: `<HasAccess module='main_event' access='can_read'>...</HasAccess>`

4. **Permission Check Logic**:
   ```typescript
   const isAccess = (module: string, access: string, permissions: any[]): boolean => {
     const find = permissions?.find(p => p.module.module === module) ?? {}
     return !!find[access]
   }
   ```

This ensures users only see and access features they're authorized for.

---

## Form Handling & Validation

### Q7: How did you implement form validation and error handling?

**Answer:**
I used React Hook Form with Yup validation:

1. **Validation Schema**: Centralized schemas in `src/utils/validation-schema.ts` using Yup
2. **Form Setup**: 
   - `FormProvider` wraps forms for context
   - `yupResolver` integrates Yup with React Hook Form
   - Default values defined for controlled inputs

3. **Error Handling**:
   - Field-level errors displayed via `setError()` for custom validations
   - API errors caught in `.catch()` blocks and shown via toast notifications
   - Example: Date range validation for sub-events within main event dates

4. **Data Transformation**: 
   - Client-side filtering (removing undefined values)
   - Type conversion (strings to numbers, dates to Unix timestamps)
   - Nested object structuring for API payloads

**Example:**
```typescript
const { handleSubmit, setError } = useForm({
  resolver: yupResolver(eventSchema),
  defaultValues
})

// Custom validation
if (eventDateTime < mainEventStartDate || eventDateTime > mainEventEndDate) {
  setError('event_date_time', {
    type: 'custom',
    message: 'Event start date must be within the main event date range.'
  })
}
```

---

## Data Display & Tables

### Q8: How did you implement paginated, searchable, and sortable tables?

**Answer:**
I created a reusable table system:

1. **Custom Hook** (`useTableData`): Manages table state:
   - Pagination (page, pageSize)
   - Search text
   - Sort field and order
   - Calculates offset for API calls

2. **ReactTableUI Component**: Wrapper around TanStack React Table with:
   - Built-in pagination controls
   - Search input
   - Sort dropdown
   - Loading states
   - Empty state messages

3. **API Integration**: Table params passed to Redux thunks:
   ```typescript
   dispatch(getAllAlerts({
     search: params.searchText,
     sort_column: params.field,
     sort_order: params.sort,
     limit: params.pageSize,
     offset: params.page
   }))
   ```

4. **Common Params Helper**: `getCommonParams()` standardizes query parameters:
   - Handles pagination (limit/offset)
   - Search text
   - Sort column and order
   - Optional pagination toggle

5. **Column Definition**: Uses TanStack Table's column helper with:
   - Custom cell renderers
   - Accessor keys for data mapping
   - Meta properties for styling

---

## Real-time Features

### Q9: How did you implement the alert/notification system?

**Answer:**
I built a scheduled alert system:

1. **Alert Model**: 
   - Linked to main events
   - Has scheduled date/time (Unix timestamp)
   - WhatsApp number for notifications
   - Note/description field

2. **CRUD Operations**: Full create, read, update, delete via `eventAlertSlice`
3. **Validation**: 
   - Prevents scheduling alerts in the past
   - Validates date/time format
4. **Dashboard Integration**: 
   - Alert count displayed on dashboard
   - Alert list view with filtering
   - Links to associated events

5. **Data Flow**:
   ```typescript
   // Create alert
   dispatch(addEventAlert({
     main_event_id: string,
     note: string,
     schedule_date_time: unix_timestamp,
     whatsapp_no: string
   }))
   ```

---

## Performance Optimizations

### Q10: What performance optimizations did you implement?

**Answer:**
Several optimizations:

1. **Conditional Data Fetching**: 
   - Only fetch data if user has access: `isAccessToMainEvents && dispatch(getAllMainEvents({}))`
   - Prevents unnecessary API calls

2. **Memoization**: 
   - `useMemo` for expensive calculations (table columns)
   - Prevents unnecessary re-renders

3. **Lazy Loading**: 
   - Infinite scroll for recipe lists
   - Pagination for large datasets
   - Only loads visible data

4. **Image Optimization**: 
   - Pre-signed URLs from S3 for images
   - Fetched on-demand, not preloaded
   - Placeholder handling

5. **State Management**: 
   - Selective state updates (only update what changed)
   - Array checks before setting state: `Array.isArray(list) ? list : []`

6. **Cache Control**: 
   - `Cache-Control: no-store` header for fresh data
   - No client-side caching of API responses

---

## Error Handling

### Q11: How did you handle errors across the application?

**Answer:**
Multi-level error handling:

1. **Service Layer**: `handleError()` utility standardizes error format:
   ```typescript
   {
     status: number | null,
     data: any | null,
     message: string
   }
   ```

2. **Redux Thunks**: Errors caught and passed via `rejectWithValue()`

3. **Component Level**: 
   - `.catch()` blocks on thunk dispatches
   - Toast notifications for user feedback
   - Error messages from API response: `err.data.message`

4. **Global Interceptor**: Axios response interceptor handles:
   - 401/403 → Auto logout and redirect
   - Network errors → Service unavailable message
   - Request setup errors → Error message display

5. **Form Validation**: 
   - Client-side validation prevents invalid submissions
   - Server-side errors displayed on form fields

---

## Type Safety

### Q12: How did you ensure type safety throughout the application?

**Answer:**
Comprehensive TypeScript implementation:

1. **Type Definitions**: 
   - Domain types in `src/types/apps/` (e.g., `ICustomer`, `IMainEvent`)
   - API payload types in `src/types/api-payload-types.ts`
   - Response types (`ApiSuccessI`, `ApiErrorI`)

2. **Service Layer**: All service methods typed with input/output types
3. **Redux**: Typed state interfaces and action payloads
4. **Components**: Props and form values typed
5. **NextAuth**: Extended types for session and JWT with custom user properties

**Example:**
```typescript
interface AddMainEventI {
  customer: {
    first_name: string
    last_name: string
    email: string
    contact_no: string
  }
  event_type: string
  event_name: string
  // ... more fields
}
```

---

## Testing & Quality

### Q13: What code quality measures did you implement?

**Answer:**
Multiple quality measures:

1. **Linting**: ESLint with Next.js and TypeScript configs
2. **Formatting**: Prettier with pre-commit hooks (Husky + lint-staged)
3. **Type Checking**: Full TypeScript coverage
4. **Code Organization**: 
   - Feature-based folder structure
   - Separation of concerns (services, slices, components)
   - Reusable utilities

5. **Error Boundaries**: Try-catch blocks in async operations
6. **Input Validation**: Both client and server-side validation
7. **Consistent Patterns**: Same patterns used across features for maintainability

---

## Scalability Considerations

### Q14: How did you design the application for scalability?

**Answer:**
Scalability-focused architecture:

1. **Modular Structure**: 
   - Each feature is self-contained (service + slice + components)
   - Easy to add new features without affecting existing ones

2. **Reusable Components**: 
   - Generic table component
   - Reusable form components
   - Shared utilities

3. **Service Layer Abstraction**: 
   - Easy to swap API implementations
   - Centralized error handling
   - Consistent API interface

4. **State Management**: 
   - Feature-based slices prevent state bloat
   - Selective state updates
   - Root reducer reset capability

5. **Environment Configuration**: 
   - Environment variables for API URLs
   - Configurable base URLs
   - Easy deployment across environments

---

## Key Technical Decisions

### Q15: Why did you choose Redux Toolkit over Context API or other state management?

**Answer:**
Redux Toolkit was chosen for:

1. **Complex State**: Application has 20+ feature slices requiring centralized state
2. **Async Operations**: Built-in `createAsyncThunk` simplifies async state management
3. **DevTools**: Excellent debugging with Redux DevTools
4. **Predictable Updates**: Immutable updates prevent bugs
5. **Middleware Support**: Easy to add logging, persistence, etc.
6. **Team Familiarity**: Standard pattern most developers know

The application's complexity (events, customers, vendors, menus, alerts, etc.) required a robust state management solution that Context API couldn't efficiently handle.

---

## Future Enhancements

### Q16: What improvements would you make if you had more time?

**Answer:**
Potential enhancements:

1. **Caching Strategy**: Implement React Query or SWR for better caching
2. **Optimistic Updates**: Update UI before API confirmation
3. **WebSocket Integration**: Real-time updates for alerts and notifications
4. **Offline Support**: Service workers for offline functionality
5. **Performance Monitoring**: Add analytics and performance tracking
6. **Unit Tests**: Comprehensive test coverage
7. **Accessibility**: Enhanced ARIA labels and keyboard navigation
8. **Internationalization**: Multi-language support
9. **Advanced Filtering**: More complex filter combinations
10. **Export Functionality**: CSV/PDF exports for reports

---

## Summary

This Event CRM application demonstrates:
- **Clean Architecture**: Separation of concerns with service/state/UI layers
- **Type Safety**: Comprehensive TypeScript implementation
- **Scalability**: Modular, feature-based structure
- **User Experience**: Role-based access, real-time updates, intuitive UI
- **Maintainability**: Consistent patterns, reusable components, proper error handling
- **Performance**: Optimized data fetching, memoization, conditional rendering

The codebase follows industry best practices and is production-ready for a complex CRM system managing events, customers, vendors, and menus.


