## Setup repo

Install dependencies:

```bash
pnpm install
```

## Run in development mode

Run the fullstack application in development mode:

```bash
pnpm start
```

## Build the code

Build all packages:

```bash
pnpm run build
```

Architecture:

-   Node v18 - JS runtime environment
-   PNPM v8.0 - For the blazingly fast package managing experience 🔥
-   Vite - For building the frontend application and firing up an ultra fast development server 🔥
-   React - Frontend framework
-   Redux - To manage application state across all components

Known issues:

-   Deck size toggle - There are some limitations using the CAT api. By default, the API sends back 10 cat images, and you are unable to change this without API keys. Altough the memory game app sends the correct "limit" value to the CAT API, we always get back 10 cats in the response.
-   The app needs optimiztation on mobile / smaller screens

Going to Production:

-   If app gets bigger lazy load components
-   Preload images and display a loading screen while the images are loading
-   Add image proxy to cat api images and cache them by setting http headers
-   Add 404 page, incase of wrong redirects
-   Optimize images by setting srcsets
-   Create a docker image or just simply deploy the repo on Vercel or Heroku
-   Deploy the app to multiple regions to load faster for users in other regions (+ balance the load)
