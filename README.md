# Netflix Clone

A modern web application that replicates core Netflix features, allowing users to browse, watch movies, and manage their favorite selections.

Deployemnt link: [https://nextjs-netflix-clone-psi.vercel.app](https://nextjs-netflix-clone-psi.vercel.app).

## Feature

- Authentication
- Watch Movie
- Add / Remove Favourites

## Technology Used

- [Next.js](https://nextjs.org)
- [Tailwind CSS](https://tailwindcss.com)
- [Auth.js](https://authjs.dev)
- [Prisma](https://prisma.io)
- [MongoDB](https://www.mongodb.com/)

## Prerequisites

Before setting up this project, make sure you have the following installed:

- Node.js (v18 or newer)
- npm or bun package manager
- PostgresSQL database

## Getting Started

1.  Clone this repository to your local machine.
2.  In the project folder, rename **.env.example** to **.env** (no period after).
3.  Set **all** the environment variables according to the instructions I've included in the file. If you don't set them properly, the application is not going to work.
4.  Run `bun install` to install the dependencies.
5.  Run `bunx prisma db push && bunx prisma generate` to setup database and prisma.
6.  Run `bun run dev` to start the web server.
