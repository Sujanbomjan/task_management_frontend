# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js

``
src/
│
├── App.tsx / App.css         → Main application component and styling
│
├── assets/                   → Static assets like images (e.g., logos)
│
├── components/               → Reusable UI and feature components
│   ├── login-form.tsx        → Login form component
│   ├── signup-form.tsx       → Signup form component
│   ├── Navbar.tsx            → Top navigation bar
│   ├── ProtectedRoutes.ts    → Higher-order component to protect routes
│   ├── TaskList.tsx          → Component to list all tasks
│   └── ui/                   → Reusable UI primitives (buttons, inputs, cards, etc.) using shadcn
│
├── context/
│   └── AuthContext.tsx       → Provides authentication state to the app
│
├── hooks/                    → Custom React hooks for API integration
│   ├── useCreateTasks.ts     → Hook to handle task creation
│   ├── useDeleteTasks.ts     → Hook to handle task deletion
│   ├── useGetAllTasks.ts     → Hook to fetch all tasks
│   ├── useGetTasksById.ts    → Hook to fetch a task by ID //not been used
│   ├── useLogin.ts           → Hook to handle user login
│   ├── useSignup.ts          → Hook to handle user signup
│   └── useUpdateTasks.ts     → Hook to handle task updates
│
├── lib/
│   ├── api.ts                → Axios or fetch setup for making API calls 
│   └── utils.ts              → Utility functions (e.g., formatting, validation)
│
├── pages/                    → Main route-based pages
│   ├── dashboard.tsx         → Dashboard after user login
│   ├── loginPage.tsx         → Login page
│   └── signupPage.tsx        → Signup page
│
├── index.css / main.tsx      → Global styles and app entry point
├── vite-env.d.ts             → Vite environment typing
``
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

## 📁 Project Structure

This project follows a modular and scalable folder structure built with **React**, **TypeScript**, and **Vite**.

### ✨ Highlights
- **Component-based** architecture for reusability and separation of concerns.
- **Context API** for global authentication state for small projects.
- **Custom Hooks** to encapsulate API logic using `axios` or `react-query`.
- **UI Primitives** inside `components/ui` to maintain consistent design across the app using shadcn.
- **Pages** directory for route-level components (`loginPage`, `dashboard`, etc.)
- **ProtectedRoutes** for guarding private routes against unauthorized access.

### 📂 Folder Breakdown

- **components/**: Reusable components like forms, navbar, and UI elements (inputs, buttons, dialogs).
- **context/**: React Context for authentication state management.
- **hooks/**: Custom hooks for handling logic such as API calls (CRUD for tasks, login, signup).
- **lib/**: Helper functions and API configuration (e.g., axios base instance).
- **pages/**: Pages mapped to routes, e.g., `/dashboard`, `/login`, `/signup`.
- **assets/**: Static files like logos or icons.

### 🛠️ Technologies Used

- **React**
- **TypeScript**
- **Vite**
- **Tanstack Query**
- **Shadcn**
- **Context API**
- **Axios** or native Fetch for API calls

This structure is designed for **scalability**, **maintainability**, and easy **team collaboration**.

---

Let me know if you want the full README file with setup instructions, contribution guidelines, etc. I can generate that too!


You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
