# NexusPad

NexusPad is a collaborative document editor built with Next.js. Create documents, edit them in real time with other users, and share view-only links. It uses Tiptap and Liveblocks for rich-text editing and real-time collaboration.

## Features

- **Authentication** — Email and password authentication, along with Google OAuth. Sessions persist across page refreshes.
- **Dashboard** — Search documents, create new documents, view recent documents, rename and delete existing documents.
- **Rich Text Editor** — A document editor with a title bar, File / Edit / Insert / Format menus, formatting toolbar, and a US Letter-sized page.
- **Real-time Collaboration** — Multiple users can edit the same document simultaneously using Liveblocks and Tiptap.
- **Presence** — Live cursors with user name labels and participant avatars.
- **Document Sharing** — Generate public view-only links. Anyone with the link can read the shared document without signing in.

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| App | Next.js 16 (App Router) | UI, server actions, and API routes |
| Editor | Tiptap 3 | Rich-text editing |
| Realtime | Liveblocks | Yjs synchronization, presence, and live cursors |
| Authentication | Auth.js v5 | Credentials and Google OAuth |
| Database | Supabase PostgreSQL + Prisma | User and document metadata |
| Client Cache | TanStack Query | Dashboard data management |
| Styling | Tailwind CSS v4 | UI styling |
| Deployment | Vercel | Application hosting |

**Architecture note:** TanStack Query manages document metadata stored in PostgreSQL. Liveblocks handles real-time document collaboration and synchronization. These responsibilities are kept separate.

## How It Works

1. Auth.js authenticates users and manages their sessions.
2. The dashboard retrieves document metadata from PostgreSQL through Prisma.
3. Opening a document connects Tiptap to a Liveblocks room using the document ID.
4. The `/api/liveblocks-auth` endpoint verifies the user's session and document ownership before generating a room access token.
5. Document changes are synchronized between collaborators using Yjs updates through Liveblocks.
6. Live cursors and participant avatars display the presence of other users.
7. When a document is shared, its current HTML content is saved as a snapshot in PostgreSQL and a unique public sharing URL is generated.
8. Shared documents are accessible through a view-only page without requiring authentication.

## Run Locally

### Requirements

- Node.js 20+
- A [Supabase](https://supabase.com) project (PostgreSQL)
- A [Liveblocks](https://liveblocks.io) secret key
- Google OAuth credentials (optional)

### Installation

Clone the repository:

```bash
git clone https://github.com/mdSohail07/NexusPad.git
cd NexusPad
```

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Configure the environment variables in `.env`.

Run database migrations:

```bash
npx prisma migrate deploy
```

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Copy the variables from `.env.example` into `.env`.

| Variable | Description |
|---|---|
| `DATABASE_URL` | Supabase transaction pooler connection URL |
| `DIRECT_URL` | Supabase session pooler connection URL |
| `AUTH_SECRET` | Secret used by Auth.js |
| `AUTH_URL` | Application URL, such as `http://localhost:3000` |
| `AUTH_GOOGLE_ID` | Google OAuth client ID |
| `AUTH_GOOGLE_SECRET` | Google OAuth client secret |
| `LIVEBLOCKS_SECRET_KEY` | Liveblocks server-side secret key |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Supabase publishable key |

For Google OAuth, configure the following redirect URI in Google Cloud Console:

```text
http://localhost:3000/api/auth/callback/google
```

**Important:**
- Never commit your `.env` file.
- Keep secret keys on the server side.
- Google authentication is handled by Auth.js, not Supabase Auth.

## Available Scripts

```bash
npm run dev          # Start the development server
npm run build        # Generate Prisma client and build Next.js
npm start            # Start the production server
npx prisma migrate deploy  # Apply database migrations
```

## Current Limitations

- Public document sharing currently supports view-only access.
- Shared document pages display an HTML snapshot captured when the owner clicks Share.
- Comments, notifications, document version history, and role-based invitations are not currently included.



