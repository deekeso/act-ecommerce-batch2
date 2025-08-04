# Digidelights

## About

A mini eCommerce web application built with Vue 3 and TypeScript. This project allows users to browse products, add them to a shopping cart, and simulate a checkout process. It serves as a practical example of using the Vue 3 Composition API, Pinia for state management, and Vue Router for navigation.

## Features

- **Product Listing**: View a list of available products.
- **Shopping Cart**: Add, update, and remove items from the cart.
- **Checkout Process**: Simulate a checkout with a cart summary and confirmation.
- **State Management**: Centralized state management with Pinia.

## Technical Implementation

This project demonstrates the following concepts:

- **Vue 3 Composition API**: Utilizes `setup()` script for better code organization and reusability.
- **TypeScript**: Ensures type safety throughout the application.
- **State Management**: Centralized cart and user state managed with Pinia.
- **Routing**: Client-side routing handled by `vue-router`.
- **Components**: Modular and reusable UI components (e.g., `ProductCard`, `CartItem`).
- **Props & Emits**: For parent-child component communication.
- **Data Binding**: Two-way data binding with `v-model` in forms.
- **Conditionals & Iterations**: `v-if`/`v-else` and `v-for` for dynamic rendering.

## Project Structure

```
digidelights/
├── public/              # Static assets
├── src/
│   ├── assets/          # Stylesheets
│   ├── components/      # Reusable Vue components
│   ├── composables/     # Reusable composition functions
│   ├── data/            # Mock data (addresses)
│   ├── images/          # Image assets
│   ├── router/          # Vue Router configuration
│   ├── stores/          # Pinia stores
│   ├── utils/           # Utility functions
│   ├── views/           # Page components
│   ├── App.vue          # Root component
│   └── main.ts          # Application entry point
├── index.html           # HTML entry point
├── package.json         # Project dependencies
├── vite.config.ts       # Vite configuration
└── README.modal         # Project documentation
```

## Components

- **AppHeader.vue**: Main navigation header for the application.
- **AppFooter.vue**: Footer component.
- **ProductCard.vue**: Displays a single product with an "Add to Cart" button.
- **CartItem.vue**: Represents an item within the shopping cart view.
- **ConfirmationModal.vue**: A reusable modal for confirming actions.
- **LoginModal.vue**: Modal for user login.
- **RegisterModal.vue**: Modal for user registration.
- **ForgotPasswordModal.vue**: Modal for password recovery.

## Product Data Structure

```javascript
{
  id: Number,
  name: String,
  price: Number,
  image: String,
  description: String
}
```

## Setup and Installation

1. Clone the repository or download a copy of the project.
2. Install dependencies:

   ```sh
   npm install
   ```

3. Run the development server:

   ```sh
   npm run dev
   ```

4. Build for production:
   ```sh
   npm run build
   ```
5. Termination can be done in the terminal through CTRL + C.
