# threads.qwik

Qwik version of threads

## Video Demo

[![qwik.threads](https://img.youtube.com/vi/LsDpXoozGI0/0.jpg)](https://www.youtube.com/watch?v=LsDpXoozGI0)

## Tech stack

- Qwikcity
- Prisma
- Postgresql
- Tailwind
- Daisyui
- Auth.js

## Setup

Install dependencies

```
pnpm i
```

Copy `.env.example` to `.env`

```
cp .env.example .env
```

Sync with prisma schema and postgresql db

```
pnpx prisma db push
```

Generate schema for prisma client

```
pnpx prisma generate
```

Run dev server

```
pnpm dev
```

## Features

- Authentication

  - Github

- Thread

  - Create
  - Like/Unlike
  - Delete
  - Save/Unsave
  - Repost
  - Replies

- Home

  - Threads feed
  - User suggestions

- Profile

  - Follow/Unfollow
  - Edit profile
  - Threads feed
  - Thread Replies
  - Thread Reposts
  - Followers
  - Followings

- Saved threads
- Search Users
- Liked Threads

- Create Thread

  - Text
  - Thread reply privacy

- Mobile resposive

## Vercel Edge

This starter site is configured to deploy to [Vercel Edge Functions](https://vercel.com/docs/concepts/functions/edge-functions), which means it will be rendered at an edge location near to your users.

## Installation

The adaptor will add a new `vite.config.ts` within the `adapters/` directory, and a new entry file will be created, such as:

```
└── adapters/
    └── vercel-edge/
        └── vite.config.ts
└── src/
    └── entry.vercel-edge.tsx
```

Additionally, within the `package.json`, the `build.server` script will be updated with the Vercel Edge build.

## Production build

To build the application for production, use the `build` command, this command will automatically run `bun build.server` and `bun build.client`:

```shell
bun build
```

[Read the full guide here](https://github.com/QwikDev/qwik/blob/main/starters/adapters/vercel-edge/README.md)

## Dev deploy

To deploy the application for development:

```shell
bun deploy
```

Notice that you might need a [Vercel account](https://docs.Vercel.com/get-started/) in order to complete this step!

## Production deploy

The project is ready to be deployed to Vercel. However, you will need to create a git repository and push the code to it.

You can [deploy your site to Vercel](https://vercel.com/docs/concepts/deployments/overview) either via a Git provider integration or through the Vercel CLI.

## Bun Server

This app has a minimal [Bun server](https://bun.sh/docs/api/http) implementation. After running a full build, you can preview the build using the command:

```
bun run serve
```

Then visit [http://localhost:3000/](http://localhost:3000/)
