# GISCON CV Tool

A modern web application for generating and managing professional CVs with multiple template options. Built with React 19, TypeScript, and Vite.

## 🚀 Getting Started

### Prerequisites

Before running the application, ensure you have the following installed:

- **Node.js**: Version 18.0.0 or higher
- **npm** or **yarn**: Package manager (npm comes with Node.js)
- **Git**: For cloning the repository

### Installation & Running the Server

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd giscon-cv-tool
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The application will start on `http://localhost:5173` by default.

4. **Build for production**

   ```bash
   npm run build
   # or
   yarn build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   ```

### Environment Configuration

Create a `.env` file in the root directory if needed:

```env
VITE_API_BASE_URL=your_api_endpoint_here
```

---

## 📁 Project Structure

```
giscon-cv-tool/
├── public/                      # Static assets
│   └── media/
│       └── templates/           # Template preview images
├── src/
│   ├── assets/                  # Application assets
│   ├── components/              # Reusable UI components
│   │   ├── icons/
│   │   │   └── CustomIcon.tsx
│   │   ├── layout/
│   │   │   ├── AppLayout.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navbar/
│   │   │       ├── Navbar.tsx
│   │   │       └── AdminProfile.tsx
│   │   └── ui/                  # Base UI components (Button, Input, etc.)
│   │       ├── Button.tsx
│   │       ├── Input.tsx
│   │       ├── Dropdown.tsx
│   │       ├── Table.tsx
│   │       └── ...
│   ├── constants/               # Application constants
│   │   ├── endpoints.ts         # API endpoint definitions
│   │   ├── routes.ts            # Route paths
│   │   ├── links.tsx            # Navigation links
│   │   └── queriesKeys.ts       # React Query cache keys
│   ├── features/                # Feature-based modules
│   │   ├── cv-generator/        # CV Generator feature
│   │   │   ├── CVGenerator.tsx  # Main CV generator component
│   │   │   ├── cv.types.ts      # Type definitions
│   │   │   ├── cv.services.ts   # API service layer
│   │   │   ├── cv.constants.ts  # Feature constants
│   │   │   ├── components/      # Feature-specific components
│   │   │   │   ├── StaffSelector.tsx
│   │   │   │   ├── ProjectSelector.tsx
│   │   │   │   ├── TemplateSelector.tsx
│   │   │   │   ├── TemplateCard.tsx
│   │   │   │   └── Stepper.tsx
│   │   │   └── hooks/           # Feature-specific hooks
│   │   │       ├── useTemplates.ts
│   │   │       └── useDownloadCV.ts
│   │   ├── staff/               # Staff management feature
│   │   │   ├── StaffList.tsx
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── views/
│   │   │   │   ├── StaffDetails.tsx
│   │   │   │   └── StaffForm.tsx
│   │   │   └── ...
│   │   ├── projects/            # Project management feature
│   │   │   ├── ProjectList.tsx
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── views/
│   │   │   │   ├── ProjectDetails.tsx
│   │   │   │   └── ProjectForm.tsx
│   │   │   └── ...
│   │   └── participation/       # Project-staff participation
│   │       ├── ParticipationForm.tsx
│   │       └── hooks/
│   ├── modals/                  # Modal management
│   │   ├── ModalProvider.tsx
│   │   └── useModal.tsx
│   ├── providers/               # React context providers
│   │   └── ReactQueryProvider.tsx
│   ├── routes/                  # Route configuration
│   │   ├── index.tsx
│   │   └── routes.tsx
│   ├── styles/                  # Global styles
│   │   ├── _config.css          # CSS custom properties
│   │   ├── _reset.css           # CSS reset
│   │   ├── global.css           # Global styles
│   │   └── theme.css            # Theme definitions
│   ├── utils/                   # Utility functions
│   │   ├── errors.ts            # Error handling utilities
│   │   ├── navigation.ts        # Navigation helpers
│   │   ├── shared.ts            # Shared utilities
│   │   ├── style.ts             # Style utilities
│   │   └── toasts.tsx           # Toast notifications
│   ├── App.tsx                  # Root application component
│   ├── main.tsx                 # Application entry point
│   ├── HttpClient.ts            # Axios HTTP client configuration
│   ├── ProvidersWrapper.tsx     # Application providers wrapper
│   └── types.ts                 # Global type definitions
├── design/                      # Design files and mockups
├── .env                         # Environment variables
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Node
├── vite.config.ts               # Vite configuration
├── package.json                 # Project dependencies
└── README.md                    # Project documentation
```

---

## 📚 Key Libraries & Technologies

### Core Framework

- **React 19.2.5** - Modern UI library with latest features
- **TypeScript 6.0.2** - Type-safe JavaScript
- **Vite 8.0.10** - Fast build tool and dev server

### State Management & Data Fetching

- **@tanstack/react-query 5.100.7** - Server state management, caching, and synchronization
- **@tanstack/react-query-devtools** - DevTools for debugging React Query
- **Zustand 5.0.12** - Lightweight state management
- **Axios 1.15.2** - HTTP client for API requests

### Routing & Navigation

- **React Router Dom 7.14.2** - Client-side routing

### Form Management & Validation

- **React Hook Form 7.75.0** - Performant form handling
- **Zod 4.4.2** - TypeScript-first schema validation
- **@hookform/resolvers 5.2.2** - Form validation resolvers

### Styling & UI

- **Tailwind CSS 4.2.4** - Utility-first CSS framework
- **@tailwindcss/vite 4.2.4** - Vite plugin for Tailwind
- **tailwind-merge 3.5.0** - Merge Tailwind classes intelligently
- **clsx 2.1.1** - Conditional className utility

### UI Components

- **@radix-ui/react-dialog 1.1.15** - Accessible dialog component
- **@radix-ui/themes 3.3.0** - Radix UI design system
- **Sonner 2.0.7** - Toast notifications
- **Iconsax React 0.0.8** - Icon library
- **React Icons 5.6.0** - Popular icon sets

### Utilities

- **dayjs 1.11.20** - Lightweight date manipulation

### Development Tools

- **ESLint 10.2.1** - Code linting
- **TypeScript ESLint 8.58.2** - TypeScript-specific linting rules
- **@vitejs/plugin-react 6.0.1** - React plugin for Vite

---

## 🏗️ Architecture Patterns

### Feature-Based Structure

Each feature module (cv-generator, staff, projects, participation) follows a consistent structure:

- **Components**: Feature-specific UI components
- **Hooks**: Custom React hooks for data fetching and mutations
- **Services**: API communication layer
- **Types**: TypeScript type definitions
- **Constants**: Feature-specific constants
- **Views**: Page-level components

### Component Organization

- **Reusable components** in `/src/components/ui/`
- **Layout components** in `/src/components/layout/`
- **Feature components** within their respective feature folders
- **Self-contained components** with built-in data fetching (e.g., TemplateSelector)

### State Management Strategy

- **Server State**: React Query (TanStack Query)
- **Client State**: React hooks and Zustand
- **Form State**: React Hook Form

---

## 🎨 Key Features

- ✅ **CV Generation**: Multi-step wizard with staff, project, and template selection
- ✅ **Staff Management**: CRUD operations for staff members
- ✅ **Project Management**: CRUD operations for projects
- ✅ **Participation Tracking**: Link staff members to projects
- ✅ **Template System**: Multiple CV templates (Classic Serif, Mercury Flow, Atlantic Blue)
- ✅ **PDF Export**: Backend-powered CV generation and download
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Type Safety**: Full TypeScript coverage
- ✅ **Modern UI**: Tailwind CSS with custom design system

---

## 📝 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

---

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Run `npm run lint` to check for issues
4. Submit a pull request

---

## 📄 License

[Add your license information here]
