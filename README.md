# threads.qwik

Qwik version of threads

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

- Saved threads
- Search Users
- Liked Threads

- Create Thread

  - Text
  - Thread reply privacy

- Mobile resposive
