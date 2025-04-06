import "next-auth";

declare module "next-auth" {
  // Extend user session to hold the access_token
  interface User {
    emailVerified?: Date | null;
    favoriteMovieIds?: string[];
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
  }
}
