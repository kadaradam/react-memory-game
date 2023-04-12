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

Known issues:
Deck size toggle - There are some limitations using the CAT api. By default, the API sends back 10 cat images, and you are unable to change this without API keys. Altough the memory game app sends the correct "limit" value to the CAT API, we always get back 10 cats in the response.
