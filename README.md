# Data-Viewer-App

## Getting Started

### Installation

Ensure you have **Node.js** installed, then run:

```sh
npm install
```

### Running the Project

To start the development server:

```sh
npm run dev
```

This runs the application using **Vite**, providing fast refresh and optimized development speed.

### Building the Project

To create a production-ready build:

```sh
npm run build
```

This compiles TypeScript (`tsc -b`) and builds the project using Vite.

### Linting the Code

To check for coding style and best practices:

```sh
npm run lint
```

This runs **ESLint**, ensuring code consistency and quality.

### Previewing the Production Build

To preview the build locally before deployment:

```sh
npm run preview
```

This serves the built files with a local server for testing.

---

## Elements Done Well

1. **Component-Based Architecture**

   - The project follows a modular approach with reusable components, improving maintainability.
   - Example: The `Chart` component is separate from its logic, managed in a custom `useChart` hook.

2. **Responsive UI**

   - Implemented responsiveness using **TailwindCSS**, ensuring the application adapts well to different screen sizes.
   - Example: The chart and dropdown menu adjust dynamically for smaller screens.

3. **Loading State with Spinner**

   - Added a **spinner** component that is displayed when loading states occur.
   - This improves the user experience by providing visual feedback while waiting.

---

## Potential Improvements (If Given 4 More Hours)

1. **Enhance UI/UX**

   - Improve animations and transitions for better visual appeal.
   - Ensure consistent styling across all components.


2. **Accessibility Improvements**

   - Ensure buttons and dropdowns have proper **ARIA attributes** for screen readers.
   - This would make the application more accessible to a wider range of users.

     
3. **Increase Test Coverage**

   - Add more unit tests to cover critical functionality.
   - Implement integration tests to ensure seamless interaction between components.
---

## Feedback on the Challenge (Optional)

- The challenge effectively tested **React, state management, and UI handling**.
- Could include more focus on handling different UI states like errors and edge cases.
- A requirement to implement unit tests would be a good addition to assess testing skills.

---

