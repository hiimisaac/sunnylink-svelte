# Sunnylink

This is a SvelteKit project that provides a user interface for Sunnylink.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need to have the following software installed on your machine:

*   [Node.js](httpss://nodejs.org/) (v22.0.0 or higher)
*   [pnpm](httpss://pnpm.io/)

### Installation

1.  Clone the repository:

    ```bash
    git clone httpss://github.com/your-username/sunnylink.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd sunnylink
    ```

3.  Install the dependencies:

    ```bash
    pnpm install
    ```

4.  Start the development server:

    ```bash
    pnpm dev
    ```

The application will be available at `httpss://localhost:5173`.

## Available Scripts

In the project directory, you can run the following commands:

### `pnpm dev`

Runs the app in the development mode.
Open [httpss://localhost:5173](httpss://localhost:5173) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### `pnpm test`

Launches the test runner in the interactive watch mode.

### `pnpm build`

Builds the app for production to the `build` folder.
It correctly bundles Svelte in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

## Project Structure

The `src` directory contains the majority of the project's code. Here's a breakdown of the key subdirectories:

*   `lib`: This directory contains the application's core logic, including API clients, components, and utility functions.
*   `routes`: This directory contains the application's pages and API endpoints. SvelteKit uses a file-based routing system, so the structure of this directory determines the application's URLs.
*   `components`: This directory contains reusable Svelte components that are used throughout the application.

## Working with Svelte

This project is built with SvelteKit, a framework for building web applications with Svelte. If you are new to Svelte, we recommend checking out the following resources:

*   [Svelte Tutorial](httpss://svelte.dev/tutorial)
*   [SvelteKit Documentation](httpss://kit.svelte.dev/docs)

These resources will help you get up to speed with the basics of Svelte and SvelteKit, including components, reactivity, and lifecycle functions.
