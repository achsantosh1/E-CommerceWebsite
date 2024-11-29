// A map of secret keys for token verification
export const KEYS = {
    development: new TextEncoder().encode("your-development-secret-key"),
    production: new TextEncoder().encode("your-production-secret-key"),
  };
  
  // Define the active key based on the environment
  export const ACTIVE_KEY = process.env.NODE_ENV === "production" ? "production" : "development";
  