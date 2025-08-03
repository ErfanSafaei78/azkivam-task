
# Nuxt PLP Task

This project contains the implementation of a Product Listing Page (PLP) using **Nuxt 3**, based on the task requirements and provided UI designs.  
It features two different PLP routes:  

- One for listing all products  (`/products`)
- One for listing products within a specific category (`/products/:categoryId/:slug`)

## 🧠 Key Features

- ✅ **Two dynamic PLP pages** implemented based on the given design
- ✅ **Filter state & pagination synced with URL query params** for better UX and shareable URLs
- ✅ **Fully server-side rendered (SSR)** fetching logic on both pages
- ✅ **Composable-based architecture** for better reusability and separation of concerns:
  - `useInfiniteScroll`: Handles intersection observer and triggering fetch on scroll
  - `useSyncQueryState`: Keeps component state and route query parameters in sync
- ✅ **Responsive design** adapted for both mobile and desktop:
  - On mobile, filters are accessible via a button that opens a modal  
  - On desktop, filters appear as a sidebar  
- ✅ **Performance-aware implementation** with touches like skeleton loaders and placeholders to prevent layout shifts, lazy loading of images and sections, adherence to Nuxt's code-splitting strategy, and UI animations synced with requestAnimationFrame
- ✅ **Clean, maintainable, and scalable structure** following Nuxt and Vue best practices

## 🛠️ Tech Stack

- **Nuxt 3**
- **Vue 3 + Composition API**
- **TypeScript**
- **TailwindCSS**

---

## ⚙️ Setup Instructions

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```
