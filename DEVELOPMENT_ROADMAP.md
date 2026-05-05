# GISCON CV Tool - Development Roadmap

## Project Overview

A comprehensive CV generation and staff management tool for GISCON Technical Portal, built with React, TypeScript, and Tailwind CSS v4.

---

## 🎨 Design System

### Theme Colors

- **Text Colors**: `#1a1c1c` (primary), `#666666` (secondary), `#dddddd` (inactive), `#ffffff` (white)
- **Background Colors**: `#f9f9f9` (body), `#525659` (sidebar), `#f4f3f3` (input), `#ffffff` (white), `rgba(255,255,255,0.1)` (sidebar active)
- **Primary Color**: `#1283ae` (buttons, icons, actions)
- **Status Colors**: Success, Warning, Error, Info
- **Border Colors**: `#e5e5e5` (default), `#ffffff` (active)

// updated please check

### Logo

- Icon: `Global` from iconsax-react with `#1283ae` color
- Text: "GISCON" below icon
- Variants: `dark` (white text) and `light` (#dddddd text)

### Component Standards

- Icons: iconsax-react only, no inline SVGs
- All components modular and reusable
- All colors via theme variables (no hardcoded hex)
- Table headers: `bg-bg-input` + `text-text-secondary`
- Skills badges: `bg-primary` + `text-on-primary`
- Action icons: Primary color (`#1283ae`)

---

## 📁 Project Structure

```
src/
├── features/              # Feature modules (main development area)
│   ├── staff/
│   │   ├── StaffListPage.tsx
│   │   ├── index.ts
│   │   ├── staff.constants.ts
│   │   ├── staff.services.ts
│   │   ├── staff.types.ts
│   │   ├── components/
│   │   │   └── StaffRow.tsx
│   │   ├── hooks/
│   │   │   ├── useStaffList.ts
│   │   │   ├── useStaffDetails.ts
│   │   │   ├── useCreateStaff.ts
│   │   │   ├── useUpdateStaff.ts
│   │   │   └── useDeleteStaff.ts
│   │   └── views/
│   │       ├── StaffDetailsPage.tsx
│   │       └── StaffFormPage.tsx
│   ├── projects/
│   │   ├── ProjectListPage.tsx
│   │   ├── index.ts
│   │   ├── projects.constants.ts
│   │   ├── projects.services.ts
│   │   ├── projects.types.ts
│   │   ├── components/
│   │   │   ├── ProjectRow.tsx
│   │   │   ├── AssignedTeam.tsx (will be inserted inside project details page)
│   │   │   ├── ProjectOverView.tsx (will be inserted inside project details page)
│   │   │   ├── TechUsed.tsx (will be inserted inside project details page)
│   │   ├── hooks/
│   │   │   ├── useProjectList.ts
│   │   │   ├── useProjectDetails.ts
│   │   │   ├── useCreateProject.ts
│   │   │   ├── useUpdateProject.ts
│   │   │   └── useDeleteProject.ts
│   │   └── views/
│   │       ├── ProjectDetailsPage.tsx
│   │       └── ProjectFormPage.tsx
│   ├── participation/
│   │   ├── ParticipationPage.tsx
│   │   ├── index.ts
│   │   ├── participation.constants.ts
│   │   ├── participation.services.ts
│   │   ├── participation.types.ts
│   │   ├── components/
│   │   │   └── ParticipationCard.tsx
│   │   ├── hooks/
│   │   │   ├── useParticipationList.ts
│   │   │   ├── useCreateParticipation.ts
│   │   │   ├── useUpdateParticipation.ts
│   │   │   └── useDeleteParticipation.ts
│   │   └── views/
│   │       └── ParticipationFormPage.tsx
│   └── cv-generator/
│       ├── CVGeneratorPage.tsx
│       ├── index.ts
│       ├── cv.constants.ts
│       ├── cv.services.ts
│       ├── cv.types.ts
│       ├── components/
│       │   ├── TemplateSelector.tsx
│       │   ├── ProjectSelector.tsx
│       │   └── CVPreview.tsx
│       ├── hooks/
│       │   └── useGenerateCV.ts
│       ├── templates/
│       │   ├── ClassicTemplate.tsx
│       │   ├── MinimalistTemplate.tsx
│       │   └── ModernTemplate.tsx
│       └── views/
│           └── CVPreviewPage.tsx
│
├── components/            # Shared components
│   ├── layout/
│   │   ├── AppLayout.tsx
│   │   ├── Navbar.tsx
│   │   └── Sidebar.tsx
│   ├── ui/
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── Overlay.tsx
│   │   ├── Pagination.tsx
│   │   └── Table.tsx
│   ├── Logo.tsx
│   ├── LoadingScreen.tsx
│   └── AppInput.tsx
│
├── constants/
│   ├── endpoints.ts       # API endpoints
│   ├── queriesKeys.ts     # React Query keys
│   ├── routes.ts          # Route definitions
│   └── links.tsx          # Navigation links
│
├── routes/
│   ├── index.tsx
│   └── routes.tsx
│
├── styles/
│   ├── global.css
│   └── theme.css          # All theme variables
│
└── utils/
    └── style.ts           # cn() utility
```

---

## � API Interfaces

### Staff API

#### GET /api/staff - Get Staff List

**No Query Params** (API returns all staff, no pagination)

**Response:**

```typescript
// API returns array directly (no wrapper)
type StaffListApiResponse = StaffApiResponse[];

interface StaffApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  skills: string; // comma-separated string
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}

// Frontend transforms to:
interface StaffListItem {
  id: string;
  imageSrc: string;
  name: string;
  jobTitle: string; // derived from first sentence of bio
  email: string;
  skills: string[]; // parsed from comma-separated
}
```

#### GET /api/staff/:id - Get Staff Details

**Response:**

```typescript
interface StaffWithProjectsApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  skills: string; // comma-separated string
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
  projects: ProjectParticipation[];
}

interface ProjectParticipation {
  participation_id: number;
  project_id: number;
  project_name: string;
  client: string;
  role: string;
  responsibilities: string | null; // comma-separated
  created_at: string;
  updated_at: string;
}

// Frontend transforms to:
interface StaffDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  skills: string[];
  imageSrc: string;
  projects: StaffProject[];
  createdAt: string;
  updatedAt: string;
}
```

#### POST /api/staff - Create Staff

**Payload:**

```typescript
interface CreateStaffPayload {
  name: string; // Required
  email: string; // Required
  phone?: string;
  bio?: string;
  skills?: string; // comma-separated string
  profile_picture?: string;
}
```

**Response:**

```typescript
interface StaffApiResponse {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  bio: string | null;
  skills: string;
  profile_picture: string | null;
  created_at: string;
  updated_at: string;
}
```

#### PUT /api/staff/:id - Update Staff

**Payload:**

```typescript
interface UpdateStaffPayload {
  name?: string;
  email?: string;
  phone?: string;
  jobTitle?: string;
  department?: string;
  bio?: string;
  skills?: string[];
  imageSrc?: string;
}
```

**Response:**

```typescript
interface UpdateStaffResponse {
  message: string;
}
```

#### DELETE /api/staff/:id - Delete Staff

**Response:**

```typescript
interface DeleteStaffResponse {
  message: string;
}
```

---

### Projects API

#### GET /api/projects - Get Projects List

**Query Params:**

```typescript
interface ProjectListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  client?: string;
  status?: "planning" | "active" | "completed" | "on-hold";
  startDate?: string;
  endDate?: string;
}
```

**Response:**

```typescript
interface ProjectListResponse {
  data: ProjectListItem[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

interface ProjectListItem {
  id: string;
  name: string;
  client: string;
  status: "planning" | "active" | "completed" | "on-hold";
  startDate: string;
  endDate: string;
  teamSize: number;
  technologies: string[];
}
```

#### GET /api/projects/:id - Get Project Details

**Response:**

```typescript
interface ProjectDetailsResponse {
  id: string;
  name: string;
  client: string;
  description: string;
  status: "planning" | "active" | "completed" | "on-hold";
  startDate: string;
  endDate: string;
  technologies: string[];
  team: TeamMember[];
  createdAt: string;
  updatedAt: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageSrc: string;
}
```

#### POST /api/projects - Create Project

**Payload:**

```typescript
interface CreateProjectPayload {
  name: string;
  client: string;
  description: string;
  status: "planning" | "active" | "completed" | "on-hold";
  startDate: string;
  endDate: string;
  technologies: string[];
}
```

**Response:**

```typescript
interface CreateProjectResponse {
  id: string;
  message: string;
}
```

#### PUT /api/projects/:id - Update Project

**Payload:**

```typescript
interface UpdateProjectPayload {
  name?: string;
  client?: string;
  description?: string;
  status?: "planning" | "active" | "completed" | "on-hold";
  startDate?: string;
  endDate?: string;
  technologies?: string[];
}
```

**Response:**

```typescript
interface UpdateProjectResponse {
  message: string;
}
```

#### DELETE /api/projects/:id - Delete Project

**Response:**

```typescript
interface DeleteProjectResponse {
  message: string;
}
```

---

### Participation API

#### GET /api/participation - Get Participation List

**Query Params:**

```typescript
interface ParticipationListParams {
  staffId?: string; // Filter by staff
  projectId?: string; // Filter by project
  page?: number;
  pageSize?: number;
}
```

**Response:**

```typescript
interface ParticipationListResponse {
  data: ParticipationListItem[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

interface ParticipationListItem {
  id: string;
  staffId: string;
  staffName: string;
  projectId: string;
  projectName: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}
```

#### POST /api/participation - Create Participation

**Payload:**

```typescript
interface CreateParticipationPayload {
  staffId: string;
  projectId: string;
  role: string;
  startDate: string;
  endDate: string;
  responsibilities: string[];
}
```

**Response:**

```typescript
interface CreateParticipationResponse {
  id: string;
  message: string;
}
```

#### PUT /api/participation/:id - Update Participation

**Payload:**

```typescript
interface UpdateParticipationPayload {
  role?: string;
  startDate?: string;
  endDate?: string;
  responsibilities?: string[];
}
```

**Response:**

```typescript
interface UpdateParticipationResponse {
  message: string;
}
```

#### DELETE /api/participation/:id - Delete Participation

**Response:**

```typescript
interface DeleteParticipationResponse {
  message: string;
}
```

---

### CV Generator API

#### POST /api/cv/generate - Generate CV

**Payload:**

```typescript
interface GenerateCVPayload {
  staffId: string;
  templateKey: "classic" | "minimalist" | "modern";
  projectIds: string[];
  personalInfo?: {
    name?: string;
    title?: string;
    bio?: string;
  };
}
```

**Response:**

```typescript
interface GenerateCVResponse {
  cvData: FinalCVData;
  message: string;
}

interface FinalCVData {
  templateKey: "classic" | "minimalist" | "modern";
  personalInfo: {
    name: string;
    title: string;
    bio: string;
    skills: string[];
  };
  selectedProjects: CVProject[];
}

interface CVProject {
  name: string;
  client: string;
  role: string;
  period: string;
  description: string;
  contributions: string[];
  techStack: string[];
}
```

---

## �🚀 Development Phases

## ✅ Phase 1: Foundation Setup (COMPLETED)

### 1.1 Initial Configuration

- [x] React 19 + TypeScript + Vite setup
- [x] Tailwind CSS v4 configuration
- [x] Path aliases (@app/\*)
- [x] ESLint and TypeScript strict mode
- [x] React Router v6
- [x] React Query setup
- [x] Axios HTTP client with interceptors

### 1.2 Design System Implementation

- [x] Create `theme.css` with all design tokens
- [x] Implement color variables (text, background, primary, status, border)
- [x] Typography system (font sizes, weights)
- [x] Spacing and border radius tokens
- [x] Remove all old theme variables

### 1.3 Core Components

- [x] Logo component (Global icon + GISCON text)
- [x] Sidebar with navigation (dark background #525659)
- [x] Navbar with search and user avatar
- [x] AppLayout wrapper
- [x] Overlay component
- [x] LoadingScreen with animated logo
- [x] Avatar component with fallback
- [x] Button component (with variants, sizes, loading, icons)
- [x] Input component (with leftIcon, rightIcon, variants)
- [x] AppInput component (with label and helper text)
- [x] Badge/Tag components (primary, secondary, success, warning, error, info, neutral)
- [x] Table component (reusable with custom renderRow)
- [x] Pagination component (client-side pagination support)
- [x] PageHeader component (with back navigation, title, subtitle, actions)

### 1.4 Navigation System

- [x] Route constants in `routes.ts`
- [x] Navigation links in `links.tsx` with iconsax-react
- [x] Sidebar active/inactive states
- [x] Mobile responsive hamburger menu

---

## ✅ Phase 2: Staff Module (COMPLETED)

### 2.1 Staff List Page

- [x] Create feature structure (`features/staff/`)
- [x] Staff types (`StaffListItem`, `StaffListResponse`, `StaffListParams`)
- [x] Staff service (`staffService.getStaffList()`)
- [x] Staff hook (`useStaffList`)
- [x] Add endpoint to `endpoints.ts` (`/api/staff`)
- [x] Add query key to `queriesKeys.ts` (`STAFF_LIST`)
- [x] StaffRow component with avatar, skills, actions
- [x] StaffListPage with table and pagination
- [x] Pagination with page numbers and arrows
- [x] Loading and empty states
- [x] "Add Staff" button routing to `/staff/new`

### 2.2 Staff List Features

- [x] Table styling (header with bg-input, text-secondary)
- [x] Avatar with automatic fallback (initials)
- [x] Skills badges (first 3 shown + count)
- [x] Action icons (View, Edit, Generate CV) in primary color
- [x] No availability column (removed as per design)
- [x] Hover states on rows
- [x] Reusable Table component for data display
- [x] Client-side pagination with Pagination component
- [x] Export default pattern for all components

### 2.3 Route Organization

- [x] All routes in `ROUTES` constant with name/path
- [x] Update all navigation to use route constants
- [x] Features folder as source of truth

### 2.4 Staff Module Structure

```
staff/
├── StaffListPage.tsx           ✅ Main entry component
├── index.ts                    ✅ Public API exports
├── staff.constants.ts          ✅ Module constants
├── staff.services.ts           ✅ API service layer
├── staff.types.ts              ✅ TypeScript interfaces
├── components/
│   ├── StaffRow.tsx            ✅ Table row component
│   ├── TechnicalSkills.tsx     ✅ Skills display component
│   └── ProjectHistory.tsx      ✅ Project history component
├── hooks/
│   ├── useStaffList.ts         ✅ List query hook
│   ├── useStaffDetails.ts      ✅ Details query hook
│   ├── useCreateStaff.ts       ✅ Create mutation hook
│   ├── useUpdateStaff.ts       ✅ Update mutation hook
│   └── useDeleteStaff.ts       ✅ Delete mutation hook
└── views/
    ├── StaffDetailsPage.tsx    ✅ Details view page (refactored with reusable components)
    ├── StaffFormPage.tsx       ✅ Old form (to be deprecated)
    └── StaffFormNew.tsx        ✅ New form with react-hook-form + zod
```

---

## ✅ Phase 3: Staff Details & Form (COMPLETED)

### 3.1 Staff Details Page

- [x] Create `StaffDetailsPage` component
- [x] Fetch single staff by ID
- [x] Display full staff information
- [x] Show all skills
- [x] Project history section
- [x] Edit and Generate CV actions
- [x] Back navigation

### 3.2 Staff Form Page (Add/Edit)

- [x] Create `StaffFormPage` component
- [x] Form with controlled inputs
- [x] Fields: name, email, phone, bio, avatar, skills tags
- [x] Skills multi-input with add/remove
- [x] Form submission with React Query mutations
- [x] Success handling with navigation
- [x] Cancel navigation
- [x] Handle both create and edit modes

### 3.3 Staff API Integration

- [x] `GET /api/staff/:id` - Get single staff
- [x] `POST /api/staff` - Create new staff
- [x] `PUT /api/staff/:id` - Update staff
- [x] `DELETE /api/staff/:id` - Delete staff (hook created)
- [x] Add mutations with React Query
- [x] Cache invalidation on success
- [x] Data transformation (snake_case to camelCase)

---

## 🔄 Phase 4: Projects Module (NEXT)

### 4.1 Projects Module Structure

```
projects/
├── ProjectListPage.tsx         📝 Main entry component
├── index.ts                    📝 Public API exports
├── projects.constants.ts       📝 Module constants
├── projects.services.ts        📝 API service layer
├── projects.types.ts           📝 TypeScript interfaces
├── components/
│   ├── ProjectRow.tsx          📝 Table row component
│   └── ProjectCard.tsx         📝 Card view component
├── hooks/
│   ├── useProjectList.ts       📝 List query hook
│   ├── useProjectDetails.ts    📝 Details query hook
│   ├── useCreateProject.ts     📝 Create mutation hook
│   ├── useUpdateProject.ts     📝 Update mutation hook
│   └── useDeleteProject.ts     📝 Delete mutation hook
└── views/
    ├── ProjectDetailsPage.tsx  📝 Details view page
    └── ProjectFormPage.tsx     📝 Add/Edit form page
```

### 4.2 Projects List Page

- [x] Create feature structure (`features/projects/`)
- [x] Project types (ProjectListItem, ProjectListResponse, ProjectListParams)
- [x] Project service (projectService.getProjectList())
- [x] Project hook (`useProjectList`)
- [x] ProjectRow component (project name, client, tech stack, actions)
- [x] ProjectListPage with table and pagination
- [x] "Add Project" button

### 4.3 Project Details Page

- [x] Header display project name and at the end display primary button edit project
- [x] Display project overview (label and value without display status) line seperated then full description
- [x] Show assigned staff members (each row display picture, name, Role) don't display button at the end
- [x] Technologies used

### 4.4 Project Form Page

- [x] Project form with validation
- [x] Fields: name, client, description, technologies
- [x] Date range picker (start/end dates)
- [x] Form submission
- [x] Success/error handling

### 4.5 Project API Integration

- [x] `GET /projects` - List projects
- [x] `GET /projects/:id` - Get project
- [x] `POST /projects` - Create project
- [x] `PUT /projects/:id` - Update project
- [x] `DELETE /projects/:id` - Delete project

---

## 🔗 Phase 5: Staff-Project Association (Participation)

### 5.1 Participation Module Structure

// add link to side bar called link staff with icon from icon sax and add route to it

```
participation/
├── ParticipationForm.tsx       📝 Main entry component
├── index.ts                    📝 Public API exports
├── participation.constants.ts  📝 Module constants
├── participation.services.ts   📝 API service layer
├── participation.types.ts      📝 TypeScript interfaces
├── hooks/
│   ├── useCreateParticipation.ts 📝 Create mutation hook
│   ├── useUpdateParticipation.ts 📝 Update mutation hook
│   └── useDeleteParticipation.ts 📝 Delete mutation hook
```

- first create dropdown reusable to used with staff and project
- call api /staff/with-projects to get staff list and their projects (for drop down staff)
- call api /projects to get all projects list
- can't select project without selecting staff
- when choose staff display all projects in dropdown except staff projects
- role is required

### 5.2 Participation Form

use local state for inputs form

- [ ] Create `ParticipationForm` //page
- [ ] Staff selection dropdown (searchable) (show name, value will be id)
- [ ] Project selection dropdown (searchable)
- [ ] Role assignment field
- [ ] Responsibilities textarea (place holder separated by comma)
- [ ] Form validation and submission

### 5.4 API Integration

- [ ] `POST /api/participation` - Create link
- [ ] `PUT /api/participation/:id` - Update participation
- [ ] `DELETE /api/participation/:id` - Remove link
- [] GET /staff/with-projects

---

## 📄 Phase 6: CV Generator

// call endpoint /staff/with-projects
// filter only staff that have projects to fill dropdown staff and its dropdown projects
// project dropdown (multiple select checkbox) will be filled with data when staff be selected

### 6.1 CV Generator Module Structure

```
cv-generator/
├── CVGenerator.tsx         📝 Main entry component
├── index.ts                    📝 Public API exports
├── cv.constants.ts             📝 Module constants
├── cv.services.ts              📝 API service layer
├── cv.types.ts                 📝 TypeScript interfaces
├── components/
│   └── TemplateCard.tsx
│   ├── TemplateSelector.tsx    📝 Template selection component (preview list of template cards)
│   ├── ProjectSelector.tsx     📝 Project selection component (multiple select)
│   └── TemplatePreview.tsx     📝 Preview component
├── templates/
│   ├── ClassicTemplate.tsx     📝 Classic CV template
│   ├── MinimalistTemplate.tsx  📝 Minimalist CV template // not exist yet
│   └── ModernTemplate.tsx      📝 Modern CV template // not exist yet

```

### 6.2 CV Selection Page

- [ ] Create `CVGenerator` //page
- [ ] create steeper
- [ ] Select staff member (dropdown with search) (step 1)
- [ ] Select projects to include (step 2)
- [ ] Select template (template cards) (Classic, Minimalist, Modern) (step 3)
- [ ] Generate button (step 3)
- [ ] preview template (TemplatePreview component) with back button (we will use print:hidden from tailwind) (step 4)

### 6.3 CV Templates

- [ ] Template Registry system (details below) - export interface TemplateConfig { we will need this to define template metadata
      id: string;
      title: string;
      subtitle: string;
      img: string;
      componentKey: 'classic' | 'minimalist' | 'government' | 'executive';
      } - export const CV_TEMPLATES: TemplateConfig[] - // This object maps your string keys to actual React Components
      export const TemplateRegistry: Record<string, React.FC<any>> = {
      classic: ClassicTemplate,
      minimalist: MinimalistTemplate,
      // government: GovernmentTemplate,
      // executive: ExecutiveTemplate,
      }; - const TemplatePreview = ({ selectedId, data }) => {
      // 1. Find the metadata by ID
      const templateInfo = CV_TEMPLATES.find(t => t.id === selectedId);

            if (!templateInfo) return <div>Template not found</div>;

            // 2. Get the actual Component from the Registry
            const SelectedComponent = TemplateRegistry[templateInfo.componentKey];

            // 3. Render it with the staff/project data
            return <SelectedComponent data={data} />;
          };

- [ ] Classic template component
- [ ] Minimalist template component // we don't have its image for styling will be implemented later
- [ ] Modern template component // we don't have its image for styling will be implemented later

// we will do this later

### 6.4 CV Preview & Export

- [x] Create `CVPreviewPage`
- [x] Render selected template with data
- [x] Print styling (A4 page size)
- [x] Export to PDF (jsPDF + html2canvas)
- [x] Download functionality
- [ ] Email CV option (if needed)

---

## 🔧 Phase 7: Advanced Features

### 7.1 Search & Filters

- [ ] Global search in navbar
- [ ] Filter staff by department, role, availability
- [ ] Filter projects by status, client, date
- [ ] Debounced search
- [ ] URL query params for filters

### 7.2 Bulk Operations

- [ ] Multi-select on tables
- [ ] Bulk delete
- [ ] Bulk export
- [ ] Bulk email CVs

### 7.3 Settings & Configuration

- [ ] User profile settings
- [ ] System settings
- [ ] Email templates configuration
- [ ] PDF export settings

### 7.4 Analytics & Reporting

- [ ] Staff utilization dashboard
- [ ] Project statistics
- [ ] CV generation history
- [ ] Export reports

---

## 🎯 Technical Patterns & Best Practices

### Code Organization

1. **Feature-First Structure**: All feature code in `features/[module]/`
2. **File Naming**: Use descriptive names like `staff.types.ts`, `staff.services.ts`
3. **Index Files**: Export public API from `index.ts` in each feature
4. **Views Folder**: Page components in `views/` subfolder
5. **Components Folder**: Feature-specific components (reusable within module)
6. **Hooks Folder**: Custom hooks for data fetching and mutations
7. **Export Pattern**: Always use `export default` for components, never `export const`. This ensures consistent import patterns across the codebase.
8. **Function Declaration**: Always use arrow functions for components and functions. Use `const ComponentName = () => {}` or `function ComponentName() {}` format, never traditional function declarations in the global scope.

### Component Reusability

1. **Always Use Reusable Components**: Before creating a new component, check if a similar one exists in `components/ui/` or `components/`
2. **Convert to Reusable**: If you notice a component pattern used 2+ times, immediately extract it to a reusable component
3. **Shared Components**: Place truly reusable components in `src/components/ui/` (e.g., Button, Input, Badge, Table, Pagination)
4. **Layout Components**: Place layout-specific components in `src/components/layout/` (e.g., Navbar, Sidebar)
5. **Feature Components**: Keep feature-specific components in `features/[module]/components/`
6. **Component Props**: Design components with flexible props (variants, sizes, icons) to maximize reusability
7. **Example**: Instead of creating separate `PrimaryButton` and `SecondaryButton`, create one `Button` component with a `variant` prop
8. **Table Component**: Use the reusable `Table` component for all data tables with custom `renderRow` function
9. **Pagination Component**: Use the reusable `Pagination` component for all paginated lists (supports client-side pagination)
10. **PageHeader Component**: Use the reusable `PageHeader` component for all page headers with back navigation and actions
11. **Always Use Button Component**: Never create custom button elements - always use the reusable `Button` component with appropriate variants

### Form Management & Validation

1. **Big Forms (3+ fields)**: Always use `react-hook-form` + `zod` + `zodResolver`
2. **File Uploads**: Keep file upload state in local `useState` (not in form state)
3. **Form Schema**: Define Zod schema at the top of the component file
4. **Type Safety**: Infer TypeScript types from Zod schema using `z.infer<typeof schema>`
5. **Validation**: Use Zod for all validation rules (required, min/max length, email format, etc.)
6. **Error Display**: Show validation errors inline below each field
7. **Submit Handler**: Use `handleSubmit` from useForm to handle form submission
8. **Example Pattern**:

```typescript
// Define schema
const staffFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  bio: z.string().optional(),
});

// Infer type
type StaffFormData = z.infer<typeof staffFormSchema>;

// Use in component
const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<StaffFormData>({
  resolver: zodResolver(staffFormSchema),
});
```

### State Management

1. **React Query**: All server state (data fetching, caching, mutations)
2. **useState**: Local component state
3. **Zustand**: Modal state and global UI state (if needed)
4. **URL State**: Filters and pagination in query params

### Styling

1. **Theme Variables**: All colors/spacing via `theme.css`
2. **Tailwind Classes**: Use theme token classes (bg-primary, text-text-primary)
3. **No Hardcoded Colors**: Always use variables
4. **Responsive**: Mobile-first approach with lg: breakpoints

### API Integration

1. **Service Layer**: All API calls in `*.services.ts`
2. **Type Safety**: Strong typing for requests/responses
3. **Error Handling**: Consistent error handling patterns
4. **Loading States**: Show loading indicators
5. **Optimistic Updates**: For better UX on mutations
6. **Client-Side Pagination**: When API returns all data without pagination, implement client-side pagination using `useMemo` for performance

### React Hooks Dependencies

- **NEVER** use API response objects directly in dependency arrays
- **ALWAYS** use `dataUpdatedAt` from React Query hooks
- Add `eslint-disable-next-line react-hooks/exhaustive-deps` when needed
- Prevents unnecessary re-renders

---

## 📝 Development Guidelines

### Component Development

1. Create component in appropriate feature folder
2. Define TypeScript interfaces/types
3. Implement with theme variables
4. Add loading/error states
5. Test with different data states
6. Export from feature `index.ts`

### Page Development

1. Create page in `features/[module]/views/`
2. Connect to data hooks
3. Handle loading, error, empty states
4. Implement navigation with route constants
5. Add to routes configuration
6. Export from feature `index.ts`

### API Integration

1. Define types in `*.types.ts`
2. Add endpoint to `endpoints.ts`
3. Add query key to `queriesKeys.ts`
4. Create service function in `*.services.ts`
5. Create React Query hook in `hooks/`
6. Use hook in component

---

## 🚦 Current Status

### ✅ Completed

- Phase 1: Foundation Setup
- Phase 2: Staff Module - List Page
- Phase 3: Staff Details & Form Pages
- Design system implementation
- Core component library (updated Button with new theme)
- Navigation system
- Route organization

### 🔄 In Progress

- Phase 4: Projects Module (Ready to start)

### 📋 Next Steps

1. Start Projects module implementation
2. Build Projects list, details, and form pages
3. Implement Participation module
4. Build CV generator workflow

---

## 📚 Tech Stack

### Core

- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool
- **React Router v6**: Routing

### Styling

- **Tailwind CSS v4**: Utility-first CSS
- **@theme**: Custom design tokens
- **iconsax-react**: Icon library

### State & Data

- **React Query**: Server state management
- **Zustand**: Global UI state
- **React Hook Form**: Form handling
- **Zod**: Schema validation

### Utilities

- **Axios**: HTTP client
- **jsPDF**: PDF generation
- **html2canvas**: HTML to canvas for PDF
- **clsx + tailwind-merge**: ClassName utilities

---

## 📞 Support & Resources

- Design Files: `/design` folder with HTML mockups
- API Documentation: TBD
- Component Storybook: TBD
- Testing Guide: TBD

---

_Last Updated: May 2, 2026_
_Version: 1.0.0_
