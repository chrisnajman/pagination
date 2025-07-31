# Pagination

A fully accessible, modular JavaScript pagination component with screen reader support, dynamic content loading, and URL syncing for seamless navigation.

[View on GitPage](https://chrisnajman.github.io/pagination)

---

## Features

- Fully modular ES6+ JavaScript architecture
- Pagination state synced with URL (`?page=3`)
- Keyboard-navigable buttons and skip link support
- Screen reader announcements using ARIA live regions
- Initial page content loads dynamically from JSON
- Automatic focus and ARIA attributes for active page button
- Responsive layout for mobile and desktop

---

## HTML

The HTML structure includes an `<article>` element containing two empty containers: `#page-title` and `#page-content`. These are dynamically populated by JavaScript—`#page-title` receives the current page’s heading (`<h1>`), and `#page-content` receives the associated content.

Below the article, there is a visually hidden live region (`#live-region`) used for screen reader announcements whenever the content changes, improving accessibility. Finally, the `<nav>` element contains the paginator controls, built dynamically via JavaScript.

```html
<article class="page-content flow">
  <header id="page-title"></header>
  <div
    id="page-content"
    class="flow"
  ></div>
</article>

<div
  id="live-region"
  class="visually-hidden"
  aria-live="polite"
  aria-atomic="true"
></div>

<nav
  aria-label="Pagination"
  class="paginator-container"
>
  <div
    id="paginator"
    class="paginator"
  ></div>
</nav>
```

---

## JavaScript

Built with **vanilla ES6 JavaScript**, focusing on modern syntax and browser APIs, then bundled, transpiled to ES2015, and minified for broad browser compatibility.

The JavaScript has been split into separate modules, improving code modularity:

### Main

- `index.js`: Entry point that initializes the app and imports other scripts like the pagination module, theme toggle, and loader.
- **`js-modules/`**:
  - `globals.js`: Contains shared references like `pageContent` for cross-module access.
  - **`helpers/`**:
    - `set-multiple-attributes.js`: Utility for setting multiple attributes on a DOM element.
  - **`pagination/`**:
    - `pagination.js`: Main initializer for fetching the JSON data and launching pagination and content rendering.
    - **`components/`**:
      - `pages.js`: Loads the initial content for page 1 from the JSON file.
      - **`paginator/`**:
        - `paginator.js`: Creates the paginator UI, sets up event listeners, and handles history state changes.
        - `update-page.js`: Combines logic to load content, render buttons, and update UI state.
        - `render-page-buttons.js`: Builds the pagination buttons and inserts them into the DOM.
        - **`helpers/`**:
          - `load-page-content.js`: Loads the content and title for the selected page, and triggers the live region.
          - `announce-live-region.js`: Announces the page load to screen readers using ARIA live regions.
          - `focus-current-page-button.js`: Moves focus to the current active page button.

### Other

- `loader.js`: Manages the loader animation used for both the **initial page load** and **pagination updates**.
  - On first load, it displays a full-screen loader until the page is rendered, then removes it and announces "Page has loaded" for screen reader users.
  - During pagination, it briefly shows the loader while new content is being injected, providing a smoother visual transition and improved accessibility feedback.
- `theme.js`: Handles theme toggling (light/dark mode) and local storage management.

---

## Accessibility

The site includes the following accessibility enhancements:

- Fully keyboard-navigable using tab keys.
- ARIA roles and attributes are implemented throughout (e.g. for navigation and live announcements).
- A visually hidden skip link is provided for screen reader users.
- An ARIA live region (`<div id="live-region">`) announces new content loaded when navigating between pages.
- Only one `h1` per page, dynamically injected with each page change.

---

## Theme Toggling

The application includes a dark mode and light mode toggle:

- The current theme state is stored in **local storage** and applied automatically on page reload.
- Accessible buttons with appropriate ARIA attributes are used to improve usability.

---

## Testing and Compatibility

The application has been tested on the following platforms and browsers:

- **Operating System**: Windows 10
- **Browsers**:
  - Google Chrome
  - Mozilla Firefox
  - Microsoft Edge

### Device View Testing

The layout and functionality have been verified in both browser and device simulation views to ensure responsiveness and usability.

---

## How to Run

1. Clone or download the repository to your local machine.
2. Open the project folder and start a simple HTTP server (e.g., using `Live Server` in VS Code or Python's `http.server` module).
3. Open the project in a modern browser (e.g., Chrome, Firefox, or Edge).

---

## Build & Deployment Setup for `/docs` Folder

If you want to deploy a minified version of this project to **GitHub Pages**, read on.

### 1. Install Required Packages

Run this once in your project root to install dev dependencies:

```bash
npm install
```

### 2. Run the full build process

In the terminal, run:

```bash
npm run build
```

### 3. Deploy to GitHub Pages

Once you've created a repository and pushed the files,

- go to `https://github.com/[your-name]/[your-project-name]/settings/pages`.
- Under "Build and deployment > Branch" make sure you set the branch to `main` and folder to `/docs`.
- Click "Save".

> [!NOTE]
> For a detailed description of the build process, configuration files and npm packages see my [GitHub Pages Optimised Build](https://github.com/chrisnajman/github-pages-optimised-build).
