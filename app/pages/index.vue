<template>
  <section
    dir="ltr"
    class="w-full absolute left-0 top-0 p-10 prose max-w-none font-sans bg-white"
  >
    <div class="max-w-screen-lg mx-auto">
      <h1>Nuxt PLP Task</h1>
      <p>
        This project contains the implementation of a Product Listing Page (PLP)
        using <strong>Nuxt 3</strong>, based on the task requirements and
        provided UI designs. It features two different PLP routes:
      </p>
      <ul>
        <li>
          One for listing all products (<NuxtLink
            to="/products"
            class="text-blue-900 hover:text-blue-700"
          >
            <code>/products</code>
          </NuxtLink>
          )
        </li>
        <li>
          One for listing products within a specific category
          (<code>/products/:categoryId/:slug</code>)
        </li>
      </ul>

      <h2>🧠 Key Features</h2>
      <ul>
        <li>
          ✅ <strong>Two dynamic PLP pages</strong> implemented based on the
          given design
        </li>
        <li>
          ✅
          <strong
            >Filter state & pagination synced with URL query params</strong
          >
          for better UX and shareable URLs
        </li>
        <li>
          ✅ <strong>Fully server-side rendered (SSR)</strong> fetching logic on
          both pages
        </li>
        <li>
          ✅ <strong>Composable-based architecture</strong> for better
          reusability and separation of concerns:
          <ul>
            <li>
              <code>useInfiniteScroll</code>: Handles intersection observer and
              triggering fetch on scroll
            </li>
            <li>
              <code>useSyncQueryState</code>: Keeps component state and route
              query parameters in sync
            </li>
          </ul>
        </li>
        <li>
          ✅ <strong>Responsive design</strong> adapted for both mobile and
          desktop:
          <ul>
            <li>
              On mobile, filters are accessible via a button that opens a modal
            </li>
            <li>On desktop, filters appear as a sidebar</li>
          </ul>
        </li>
        <li>
          ✅ <strong>Performance-aware implementation</strong> with touches like
          skeleton loaders and placeholders to prevent layout shifts, lazy
          loading of images and sections, adherence to Nuxt's code-splitting
          strategy, and UI animations synced with
          <code>requestAnimationFrame</code>
        </li>
        <li>
          ✅
          <strong>Clean, maintainable, and scalable structure</strong> following
          Nuxt and Vue best practices
        </li>
      </ul>

      <h2>🛠️ Tech Stack</h2>
      <ul>
        <li><strong>Nuxt 3</strong></li>
        <li><strong>Vue 3 + Composition API</strong></li>
        <li><strong>TypeScript</strong></li>
        <li><strong>TailwindCSS</strong></li>
      </ul>

      <div class="mt-8">
        <NuxtLink
          to="/products"
          class="inline-block px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Go to Product Listing Page
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
