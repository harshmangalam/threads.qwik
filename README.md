# threads.qwik

Qwik version of threads

## Demo

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
