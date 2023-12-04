## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## implemenations

- Tanstack Query for api calls
- Tailwind & ShadCN UI
- Dark Mode implementation
- Pagination Implemenation
- edit modal implementation on product details page

## Folder and Files structure

- app
  - (root)
    -  page.tsx
    -  [id]
    -  __components (related components of product listing page)
  - layout.tsx
- components
  -  ui
    - button.tsx
    - dialog.tsx
    - dropdown-menu.tsx
    - form.tsx
    - input.tsx
    - lable.tsx
    - skeleton.tsx
  -  theme-provider.tsx
  -  theme-switcher.tsx
- hoc
  -  TanStackProvider.tsx
- lib
    - utils.ts
- public
- services
  -  base-service.ts
  -  product-service.ts

## Other information of implementation

All apis end points handled properly with interfaces and types, created base service and product service to handle api calls, then intergrated tanstack query inside components with product service. also used shadcn ui for forms submission, dialog and theme switcher. I have tested app multiple time. added pagination on product list page and skeleton loading on both products and product detail page.
