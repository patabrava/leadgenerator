# deinvergleich.net MVP - Granular Task Plan

*Generated from architecture.md on August 01, 2025*

---

## Phase 1: Project Foundation & Setup

### Task 1.1: Initialize Next.js Project
**Objective**: Create new Next.js 14 project with TypeScript and App Router
**Start**: Empty workspace
**End**: Working Next.js dev server with TypeScript
**Test**: `npm run dev` starts successfully, shows default Next.js page
```bash
npx create-next-app@latest deinvergleich --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
```

### Task 1.2: Configure Package Dependencies
**Objective**: Install all required dependencies from architecture
**Start**: Fresh Next.js project
**End**: All dependencies in package.json
**Test**: `npm install` completes without errors
**Dependencies needed**:
- zod (validation)
- @headlessui/react (UI components)
- googleapis (Google Sheets API)
- @types/node (TypeScript support)

### Task 1.3: Create Environment Configuration
**Objective**: Set up environment variables structure
**Start**: Project with dependencies
**End**: `.env.example` and `.env.local` files exist
**Test**: Project can reference environment variables
**Files to create**:
- `.env.example` with template variables
- `.env.local` with placeholder values
- Add `.env.local` to `.gitignore`

### Task 1.4: Configure TypeScript and ESLint
**Objective**: Set up strict TypeScript and linting rules
**Start**: Basic Next.js TypeScript setup
**End**: Strict TypeScript config, custom ESLint rules
**Test**: `npm run lint` passes, `npm run type-check` passes
**Files to modify**:
- `tsconfig.json` (strict mode)
- `.eslintrc.json` (custom rules)

---

## Phase 2: Core Schema & Types

### Task 2.1: Create Base Form Schema
**Objective**: Define Zod schema for all form fields
**Start**: Project foundation complete
**End**: Complete form validation schema
**Test**: Schema validates sample data correctly
**File**: `src/schemas/formSchema.ts`
**Fields**: Unternehmen, PLZ, Land, Name, Telefonnummer, Emailadresse, DSB vorhanden, Start, Unternehmensgröße

### Task 2.2: Generate TypeScript Types from Schema
**Objective**: Export TypeScript types from Zod schema
**Start**: Form schema exists
**End**: TypeScript types available for form data
**Test**: Types can be imported and used in components
**Add to**: `src/schemas/formSchema.ts`

### Task 2.3: Create Step-Specific Schemas
**Objective**: Break main schema into step-specific validation
**Start**: Base schema complete
**End**: Individual schemas for each step
**Test**: Each step schema validates its subset of fields
**Schemas needed**:
- `CompanyStepSchema` (Unternehmen, PLZ, Land)
- `ContactStepSchema` (Name, Telefonnummer, Emailadresse)
- `ProjectStepSchema` (DSB vorhanden, Start, Unternehmensgröße)
- `ReviewStepSchema` (all fields)

---

## Phase 3: State Management Foundation

### Task 3.1: Create Form State Interface
**Objective**: Define TypeScript interfaces for form state
**Start**: Schemas and types complete
**End**: Complete state management types
**Test**: Types compile without errors
**File**: `src/hooks/useMultiStepForm.ts`
**Interfaces**: FormState, FormAction, StepIndex

### Task 3.2: Implement useReducer Logic
**Objective**: Create reducer function for form state management
**Start**: State interfaces defined
**End**: Working reducer with all actions
**Test**: Reducer handles all action types correctly
**Actions needed**: SET_FIELD, NEXT_STEP, PREV_STEP, RESET_FORM, SET_SUBMITTING

### Task 3.3: Create Context Provider
**Objective**: Wrap reducer in React Context
**Start**: Reducer function complete
**End**: Context provider with typed access
**Test**: Context can be consumed by child components
**Add to**: `src/hooks/useMultiStepForm.ts`

### Task 3.4: Implement Custom Hook
**Objective**: Create useMultiStepForm hook with helper functions
**Start**: Context provider ready
**End**: Hook with navigation and validation helpers
**Test**: Hook provides all necessary form operations
**Helpers**: next(), prev(), setField(), validate(), canProceed()

---

## Phase 4: Google Sheets Integration

### Task 4.1: Create Google Sheets Client
**Objective**: Initialize Google Sheets API client
**Start**: Environment variables configured
**End**: Working Google API client
**Test**: Client can authenticate successfully
**File**: `src/lib/googleSheets.ts`
**Function**: `initClient()`

### Task 4.2: Implement Sheet Append Function
**Objective**: Create function to append row to Google Sheet
**Start**: Google client initialized
**End**: Function that writes form data to sheet
**Test**: Function successfully appends test data
**Function**: `appendLeadRow(data: FormData)`
**Add to**: `src/lib/googleSheets.ts`

### Task 4.3: Add Error Handling for Sheets API
**Objective**: Handle Google API errors gracefully
**Start**: Basic append function works
**End**: Comprehensive error handling and logging
**Test**: Function handles network errors, auth errors, quota limits
**Error types**: Network, Authentication, Quota, Invalid Sheet ID

### Task 4.4: Create Sheet Data Validation
**Objective**: Validate data before writing to sheet
**Start**: Append function with error handling
**End**: Data validation before API calls
**Test**: Invalid data is rejected before API call
**Validation**: Required fields, data types, field lengths

---

## Phase 5: API Route Implementation

### Task 5.1: Create Basic API Route Structure
**Objective**: Set up POST endpoint for form submission
**Start**: Google Sheets integration complete
**End**: Basic API route that accepts POST requests
**Test**: Route returns 200 for valid requests
**File**: `src/app/api/submit/route.ts`
**Methods**: POST handler

### Task 5.2: Add Request Validation
**Objective**: Validate incoming request body against schema
**Start**: Basic API route exists
**End**: Request validation with Zod schema
**Test**: Invalid requests return 400 with error details
**Add**: Schema validation, error response formatting

### Task 5.3: Integrate Sheets API Call
**Objective**: Connect API route to Google Sheets function
**Start**: Request validation working
**End**: API route writes validated data to sheet
**Test**: Valid requests create new sheet rows
**Integration**: Call `appendLeadRow()` with validated data

### Task 5.4: Add API Error Handling
**Objective**: Handle and format API errors properly
**Start**: Basic integration working
**End**: Comprehensive error handling and responses
**Test**: All error types return appropriate HTTP status codes
**Error handling**: Validation errors (400), Server errors (500), Rate limiting

---

## Phase 6: UI Components Foundation

### Task 6.1: Create Base Layout Component
**Objective**: Set up root layout with Tailwind CSS
**Start**: API backend complete
**End**: Root layout with proper styling setup
**Test**: Layout renders with Tailwind styles applied
**File**: `src/app/layout.tsx`
**Includes**: Global CSS, fonts, metadata

### Task 6.2: Create Progress Bar Component
**Objective**: Build progress indicator for multi-step form
**Start**: Layout component ready
**End**: Reusable progress bar component
**Test**: Progress bar shows correct step (1/4, 2/4, etc.)
**File**: `src/components/MultiStepForm/ProgressBar.tsx`
**Props**: currentStep, totalSteps

### Task 6.3: Create Base Form Container
**Objective**: Create wrapper component for form steps
**Start**: Progress bar component ready
**End**: Form container with consistent styling
**Test**: Container renders with proper spacing and layout
**File**: `src/components/MultiStepForm/index.tsx`
**Features**: Step navigation, progress display, responsive design

### Task 6.4: Create Navigation Buttons
**Objective**: Build Previous/Next navigation buttons
**Start**: Form container ready
**End**: Reusable navigation button components
**Test**: Buttons handle click events and show correct states
**Add to**: `src/components/MultiStepForm/index.tsx`
**States**: Disabled, Loading, Active

---

## Phase 7: Form Step Components

### Task 7.1: Create Company Step Component
**Objective**: Build first form step for company information
**Start**: Base components ready
**End**: Working company information form
**Test**: Component validates and updates form state
**File**: `src/components/MultiStepForm/StepCompany.tsx`
**Fields**: Unternehmen (text), PLZ (text), Land (select)

### Task 7.2: Create Contact Step Component
**Objective**: Build second form step for contact information
**Start**: Company step complete
**End**: Working contact information form
**Test**: Component validates email and phone formats
**File**: `src/components/MultiStepForm/StepContact.tsx`
**Fields**: Name (text), Telefonnummer (tel), Emailadresse (email)

### Task 7.3: Create Project Step Component
**Objective**: Build third form step for project details
**Start**: Contact step complete
**End**: Working project information form
**Test**: Component handles radio buttons and date selection
**File**: `src/components/MultiStepForm/StepProject.tsx`
**Fields**: DSB vorhanden (radio), Start (date), Unternehmensgröße (select)

### Task 7.4: Create Review Step Component
**Objective**: Build final review step showing all entered data
**Start**: Project step complete
**End**: Read-only review of all form data
**Test**: Review shows all entered information correctly
**File**: `src/components/MultiStepForm/StepReview.tsx`
**Features**: Data display, edit links, GDPR consent checkbox

---

## Phase 8: Form Validation & UX

### Task 8.1: Add Real-time Field Validation
**Objective**: Validate fields as user types
**Start**: All form steps complete
**End**: Immediate validation feedback
**Test**: Invalid fields show errors immediately
**Add to**: All step components
**Validation**: Required fields, formats, length limits

### Task 8.2: Implement Step-by-Step Validation
**Objective**: Prevent progression with invalid data
**Start**: Real-time validation working
**End**: Step validation blocks navigation
**Test**: Next button disabled until step is valid
**Logic**: Validate current step before allowing next()

### Task 8.3: Add Loading States
**Objective**: Show loading indicators for async operations
**Start**: Step validation complete
**End**: Loading states for form submission
**Test**: Loading spinner shows during API calls
**States**: Button loading, form disabled during submission

### Task 8.4: Implement Success/Error Messages
**Objective**: Show user feedback for form actions
**Start**: Loading states implemented
**End**: Success and error message display
**Test**: Appropriate messages show for all outcomes
**Messages**: Validation errors, submission success, API errors

---

## Phase 9: Trust & Conversion Elements

### Task 9.1: Create Trust Points Component
**Objective**: Build trust signals to improve conversion
**Start**: Form UX complete
**End**: Trust points component with six key messages
**Test**: Trust points render with proper styling
**File**: `src/components/UI/TrustPoints.tsx`
**Content**: GDPR compliance, expertise, response time, etc.

### Task 9.2: Add GDPR Consent Integration
**Objective**: Implement required GDPR consent checkbox
**Start**: Trust points complete
**End**: Legal consent requirement in review step
**Test**: Form cannot submit without consent
**Add to**: `StepReview.tsx`
**Requirements**: Checkbox, privacy policy link, legal text

### Task 9.3: Implement Thank You Page
**Objective**: Create post-submission success page
**Start**: GDPR consent working
**End**: Success page with next steps
**Test**: Success page shows after form submission
**Features**: Success message, timeline expectations, contact info

### Task 9.4: Add Form Reset Functionality
**Objective**: Allow users to start over after completion
**Start**: Thank you page ready
**End**: Reset button clears all form data
**Test**: Reset button returns to step 1 with empty form
**Add**: Reset function to form hook, reset button to success page

---

## Phase 10: Main Page Integration

### Task 10.1: Create Main Page Layout
**Objective**: Build the main landing page with form
**Start**: All components ready
**End**: Complete page layout with form and trust points
**Test**: Main page renders form and supporting content
**File**: `src/app/page.tsx`
**Layout**: Form on left/center, trust points on right/bottom

### Task 10.2: Add Responsive Design
**Objective**: Ensure form works on all device sizes
**Start**: Main page layout complete
**End**: Fully responsive design
**Test**: Form works properly on mobile, tablet, desktop
**Breakpoints**: Mobile (320px+), Tablet (768px+), Desktop (1024px+)

### Task 10.3: Implement Context Provider Integration
**Objective**: Wrap main page with form context
**Start**: Responsive design complete
**End**: Form state available throughout component tree
**Test**: All components can access and update form state
**Add to**: `src/app/layout.tsx` or `src/app/page.tsx`

### Task 10.4: Add SEO and Meta Tags
**Objective**: Optimize page for search engines
**Start**: Context integration complete
**End**: Complete SEO setup
**Test**: Page has proper meta tags, Open Graph, etc.
**Add to**: `src/app/layout.tsx`
**Tags**: Title, description, Open Graph, structured data

---

## Phase 11: Testing & Quality Assurance

### Task 11.1: Add Unit Tests for Schemas
**Objective**: Test all Zod validation schemas
**Start**: SEO implementation complete
**End**: Comprehensive schema tests
**Test**: All validation rules work correctly
**Framework**: Vitest
**Coverage**: Valid/invalid inputs for all fields

### Task 11.2: Add Component Tests
**Objective**: Test React components in isolation
**Start**: Schema tests complete
**End**: Unit tests for all components
**Test**: Components render and behave correctly
**Framework**: Vitest + React Testing Library
**Coverage**: Props, events, state changes

### Task 11.3: Add Integration Tests
**Objective**: Test API route end-to-end
**Start**: Component tests complete
**End**: API route tests with mocked Google Sheets
**Test**: API handles all request types correctly
**Framework**: Vitest + Mock Service Worker
**Coverage**: Valid requests, validation errors, server errors

### Task 11.4: Add E2E Form Flow Test
**Objective**: Test complete user journey
**Start**: All unit/integration tests complete
**End**: End-to-end test of form submission
**Test**: User can complete entire form successfully
**Framework**: Playwright or Cypress
**Flow**: Fill form → Submit → Success page

---

## Phase 12: Production Preparation

### Task 12.1: Configure Environment Variables
**Objective**: Set up production environment configuration
**Start**: Testing complete
**End**: Production-ready environment setup
**Test**: Application works with production environment variables
**Variables**: Google Sheets ID, Service Account credentials

### Task 12.2: Add Error Monitoring
**Objective**: Implement error tracking and logging
**Start**: Environment configured
**End**: Error monitoring active
**Test**: Errors are captured and reported
**Solution**: Console logging for API routes, client-side error boundaries

### Task 12.3: Optimize Bundle Size
**Objective**: Minimize JavaScript bundle size
**Start**: Error monitoring active
**End**: Optimized build output
**Test**: Bundle analyzer shows reasonable bundle sizes
**Optimizations**: Tree shaking, code splitting, image optimization

### Task 12.4: Configure CI/CD Pipeline
**Objective**: Set up automated deployment
**Start**: Bundle optimization complete
**End**: Working CI/CD pipeline
**Test**: Code changes trigger automatic deployment
**File**: `.github/workflows/ci.yml`
**Steps**: Lint, test, build, deploy to Vercel

---

## Phase 13: Final Integration & Launch

### Task 13.1: Create Production Google Sheet
**Objective**: Set up actual Google Sheet for production data
**Start**: CI/CD pipeline ready
**End**: Production sheet with correct permissions
**Test**: API can write to production sheet
**Setup**: Create sheet, configure service account access, test permissions

### Task 13.2: Configure Domain and SSL
**Objective**: Set up custom domain with SSL
**Start**: Production sheet ready
**End**: Site accessible via deinvergleich.net
**Test**: Site loads over HTTPS with custom domain
**Setup**: DNS configuration, Vercel domain setup, SSL certificate

### Task 13.3: Load Testing
**Objective**: Verify application handles expected traffic
**Start**: Domain configured
**End**: Performance benchmarks established
**Test**: Site performs well under load
**Tools**: Lighthouse, WebPageTest, load testing tools

### Task 13.4: Final Security Review
**Objective**: Verify all security measures are in place
**Start**: Load testing complete
**End**: Security checklist completed
**Test**: No security vulnerabilities detected
**Checklist**: HTTPS everywhere, environment variables secured, input validation, GDPR compliance

---

## Success Criteria

Each task is complete when:
1. ✅ **Functionality works** as described
2. ✅ **Tests pass** (unit, integration, or manual)
3. ✅ **Code is clean** and follows project standards
4. ✅ **Documentation updated** if needed
5. ✅ **No breaking changes** to existing functionality

## Task Dependencies

- Tasks within each phase can generally be done sequentially
- Some tasks in later phases may depend on earlier phases being complete
- Testing tasks (Phase 11) can be done in parallel with development
- Production tasks (Phase 12-13) require all development to be complete

---

> **Total Estimated Tasks: 52**  
> **Estimated Development Time: 2-3 weeks** (for experienced developer)  
> **MVP Launch Target: End of August 2025**
