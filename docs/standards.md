## 🗂️ Project Structure & Naming Conventions

### Folder Structure

- **`src/pages/`**: Route-level page components. Each page has its own folder (e.g., `src/pages/home/index.tsx`).
- **`src/components/`**: Shared and page-specific components. Components unique to a page go in `src/components/[page]/`.
- **`src/styles/`**: Global styles.
- **`src/resources/mock-data/`**: Mock/sample data for development.
- **`src/resources/config/`**: Static configuration and constants.
- **`src/hooks/`**: Custom React hooks.
- **`src/utils/`**: General utility functions.

#### Example Structure

```plaintext
src/
  components/
    home/
      HomePageCarousel.tsx
      ScheduleAppointment.tsx
      LocationSchedule.tsx
      HomePageCarousel.module.css
  pages/
    home/
      index.tsx
      home.module.css
  resources/
    mock-data/
      services.ts
    config/
      clinic-information.ts
  styles/
    global.css
  hooks/
    use-fetch.ts
  utils/
    format-date.ts
```

---

### File Naming Conventions

| File Type   | Recommended Case      | Example                         |
| ----------- | --------------------- | ------------------------------- |
| Components  | PascalCase            | `HomePageCarousel.tsx`          |
| Utilities   | kebab-case            | `format-date.ts`                |
| Config/data | kebab-case            | `clinic-information.ts`         |
| Mock data   | kebab-case            | `all-clinic-services.ts`        |
| Stylesheets | kebab-case            | `home-page-carousel.module.css` |
| Pages       | `index.tsx` in folder | `pages/home/index.tsx`          |

- **Components:** Use PascalCase for both file and component names.
- **Pages:** Use `index.tsx` as the entry point for each page folder (e.g., `pages/home/index.tsx`).
- **All other files (utils, config, data, styles):** Use kebab-case for cross-platform compatibility.
- **Styles:** Use kebab-case for CSS files. Prefer CSS Modules or CSS-in-JS for component-specific styles.

---

### General Best Practices

- **Colocate** files (components, styles, hooks) with their relevant page/component if they are not shared.
- Use **index.tsx** in page folders for clean imports.
- **Export** components via an `index.ts` barrel file when folders contain multiple related components.
- **Keep mock data and config out of components** to keep them pure and easy to test.
- **Be consistent** with naming and structure across the codebase.

---

> **Tip:** Consistent structure and naming make your project more maintainable, scalable, and easy for everyone to understand!
