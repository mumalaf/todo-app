# Todo App

Modern and elegant Todo application built with Next.js, TypeScript, and Tailwind CSS.

## Features

- ✅ Create, read, update, and delete todos
- 📱 Responsive design for all devices
- 🖼️ Image upload support for todos
- 📝 Rich memo functionality
- 🎨 Beautiful UI with custom images
- 🔄 Real-time data synchronization with API
- ⚡ Optimized performance with React.memo and useCallback
- 🛡️ Type-safe with TypeScript
- 🏗️ Clean architecture with separation of concerns

## Tech Stack

- **Framework**: Next.js 13+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **API Integration**: RESTful API with fetch
- **Image Handling**: FileReader API for local preview

## Project Structure

```
src/
├── app/                    # Next.js app router pages
│   ├── page.tsx           # Main todo list page
│   └── todo/[id]/         # Todo detail page
├── components/            # Reusable components
│   ├── header/           # Header components
│   ├── ui/               # UI components (LoadingSpinner, ErrorMessage, etc.)
│   └── TodoItem.tsx      # Individual todo item component
├── hooks/                # Custom React hooks
│   ├── useApiTodos.ts    # Main todo list management
│   └── useApiTodoDetail.ts # Todo detail management
├── services/             # API service layer
│   └── todoApi.ts        # API client for todo operations
├── types/                # TypeScript type definitions
│   ├── todo.ts           # Todo-related types
│   ├── api.ts            # API request/response types
│   └── common.ts         # Common utility types
├── lib/                  # Utility functions
│   ├── utils.ts          # General utilities
│   └── tenantConfig.ts   # Tenant management
└── constants/            # App constants and configuration
    └── index.ts          # Global constants
```

## API Integration

The app integrates with a RESTful API using the following endpoints:

- `GET /api/{tenantId}/items` - Fetch all todos
- `POST /api/{tenantId}/items` - Create a new todo
- `GET /api/{tenantId}/items/{id}` - Fetch a specific todo
- `PATCH /api/{tenantId}/items/{id}` - Update a todo
- `DELETE /api/{tenantId}/items/{id}` - Delete a todo
- `POST /api/images` - Upload images

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build for Production
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

## Key Features Implementation

### Responsive Design
- Mobile-first approach with Tailwind CSS
- Different header layouts for mobile, tablet, and desktop
- Adaptive button sizes and layouts

### Performance Optimizations
- React.memo for component memoization
- useCallback for function memoization
- Optimized re-renders with proper dependency arrays
- Lazy loading and code splitting ready

### Error Handling
- Comprehensive error boundaries
- User-friendly error messages
- Retry mechanisms for failed API calls
- Loading states for better UX

### Type Safety
- Strict TypeScript configuration
- Comprehensive type definitions
- Type-safe API client
- Props validation with interfaces

## Environment Variables

```env
NEXT_PUBLIC_TENANT_ID=your-tenant-id
```

## Code Quality

The project follows modern React and TypeScript best practices:

- **Clean Architecture**: Separation of concerns with services, hooks, and components
- **Type Safety**: Comprehensive TypeScript types for all data structures
- **Performance**: Optimized with memoization and proper dependency management
- **Maintainability**: Modular code structure with reusable components
- **Error Handling**: Robust error boundaries and user feedback
- **Accessibility**: Semantic HTML and proper ARIA attributes

## Future Enhancements

- [ ] Offline support with service workers
- [ ] Advanced filtering and sorting
- [ ] Drag and drop reordering
- [ ] Dark mode support
- [ ] Internationalization (i18n)
- [ ] Real-time collaboration
- [ ] Advanced search functionality
- [ ] Todo categories and tags

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
