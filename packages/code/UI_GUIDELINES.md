# UI Component Guidelines

This document outlines the guidelines for creating and using UI components in this project.

## General Principles

- **Consistency:** Components should have a consistent look and feel across the application.
- **Reusability:** Components should be designed to be reusable in different parts of the application.
- **Accessibility:** Components should be accessible to all users, following WCAG guidelines.
- **Performance:** Components should be optimized for performance to ensure a smooth user experience.

## Component Structure

- Components should be located in `packages/code/src/@/components/ui`.
- Each component should have its own directory (e.g., `packages/code/src/@/components/ui/button`).
- Component files should be named using PascalCase (e.g., `Button.tsx`).
- Related files (e.g., stories, tests) should be co-located in the component's directory.

## Styling

- Components should be styled using Tailwind CSS utility classes.
- Avoid custom CSS or inline styles whenever possible.
- Use `class-variance-authority` (CVA) for managing component variants (e.g., different sizes, colors).
- Use `tailwind-merge` (via the `cn` utility) for conditional class names.

## Creating New Components

- Before creating a new component, check if a similar component already exists in `packages/code/src/@/components/ui`.
- If a similar component exists, consider extending it or refactoring it to meet the new requirements.
- If a new component is necessary, follow the guidelines in this document.

## Using Components

- Import components using the `@` alias, which maps to `src/@/`. For example: `import { Button } from '@/components/ui/button';`.
- Use the component's props to customize its appearance and behavior.
- Refer to the component's documentation or stories for examples of how to use it.

## Iconography

- Use icons from a consistent icon library (e.g., Lucide, Heroicons).
- Wrap icons in a dedicated `Icon` component if necessary to ensure consistent sizing and styling.

## State Management

- Components should manage their own state whenever possible.
- For complex state management, consider using a dedicated state management library (e.g., Zustand, Jotai).

## Testing

- Components should have unit tests to verify their functionality.
- Use a testing library like React Testing Library for writing tests.
- Include tests for different component variants and states.

## Documentation

- Components should be documented using Storybook or a similar tool.
- Documentation should include examples of how to use the component and its available props.
