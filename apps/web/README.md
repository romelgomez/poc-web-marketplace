## MercadoChevere.com

```bash
yarn dev
```

Organizing your React application's structure is crucial for maintainability, readability, and scalability. When you're working on larger projects, a consistent and well-thought-out structure can save you a lot of time and headaches.

Given the folders you've listed (`media`, `publications`, `users`), I'm assuming these are major modules or sections of your app. Let's structure these folders while keeping some best practices in mind:

1. **Keep a clear distinction between "global" and "module-specific" assets, components, utilities, etc.**

2. **Use a consistent naming convention and folder structure.**

Based on the above principles, here's a possible structure:

```
src/
|-- assets/
|   |-- images/
|   |-- styles/
|
|-- components/
|   |-- shared/  (Common components used across multiple modules)
|
|-- hooks/
|   |-- shared/  (Common hooks used across multiple modules)
|
|-- modules/
|   |-- media/
|   |   |-- components/ (Specific components only used within the media module)
|   |   |-- hooks/ (Specific hooks for the media module)
|   |   |-- mediaServices.js (or a sub-folder for services/API calls)
|   |   |-- mediaReducer.js (or a sub-folder for state management)
|   |
|   |-- publications/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- publicationServices.js
|   |   |-- publicationReducer.js
|   |
|   |-- users/
|   |   |-- components/
|   |   |-- hooks/
|   |   |-- userService.js
|   |   |-- userReducer.js
|
|-- utils/ (General utilities used across the entire app)
|
|-- App.js
|-- index.js
```

**Explanation**:

- **assets**: This is where global assets like images or global stylesheets would reside.
- **components/shared**: Components that are used across different modules or routes. For instance, a `Navbar` component that appears on every page.

- **hooks/shared**: Hooks that are shared and utilized across various modules or components.

- **modules**: Treat major sections of your app as modules. Each module can have its own components, services, hooks, and state management, effectively grouping related functionalities.

- **utils**: Any utility functions or constants that are used across the entire application.

Adjust this structure based on the requirements and complexity of your application. The key is to find a balance between granularity and simplicity. Too many nested folders can become hard to navigate, while too few can become cluttered.

Lastly, always be open to refactoring as your application grows. Your initial structure may not hold up as new requirements come in, so be willing to adjust as needed.

## Component Examples

- tree selector https://stackblitz.com/edit/stackblitz-starters-8czifb?file=src%2FApp.tsx

## Todo

resolve the filter for the search api

- https://chat.openai.com/share/cba992d6-5fd1-4bb3-87fb-d4b9a1379e21


## Docker

https://www.temiz.dev/articles/how-to-reduce-nextjs-docker-image-size