# Instructions for GitHub Copilot: Frontend Redesign Guidelines

This web application is **in production and live**. When making frontend changes, redesigning pages, or updating the design, ensure that **no existing code or functionality is broken**. The following guidelines must be followed to maintain the integrity of the application.

## Frontend Technologies
The frontend is built with the following stack. Use these technologies and their respective documentation to guide your redesign:

### Frontend
- **React Router v7**: Full-stack React framework with server-side rendering (SSR).  
  Reference: [React Router Documentation](https://reactrouter.com/en/main)
- **TailwindCSS v4**: Modern utility-first CSS framework for styling.  
  Reference: [TailwindCSS v4 Documentation](https://tailwindcss.com/blog/tailwindcss-v4)
- **shadcn/ui**: Component library built with Radix UI for accessible, customizable UI components.  
  Reference: [shadcn/ui Documentation](https://ui.shadcn.com)
- **TypeScript**: Ensures complete type safety across the codebase.

## Redesign Guidelines
- Use **shadcn/ui MCP** (Modular Component Package) for the redesign. Ensure all components are sourced from [shadcn/ui](https://ui.shadcn.com) to maintain consistency and accessibility.
- You can also use **Context7 MCP server** for accessing updated additional documentation.
- **Do not break existing functionality**: Test all changes thoroughly to ensure the application remains fully operational.
- Adhere to **TypeScript** for type safety. Ensure all components and changes are type-checked.
- Follow **TailwindCSS v4** best practices for styling to maintain a modern, consistent design.
- Use **React Router v7** for any navigation-related updates, ensuring SSR compatibility.

## Important Notes
- Verify all changes in a development environment before deploying to production.
- Ensure cross-browser compatibility and responsiveness for all redesigned components.
- Maintain accessibility standards as per shadcn/ui and Radix UI guidelines.

## Finally
- Check the **README file** for an overview of the project or website to better understand the context and structure.