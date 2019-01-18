declare namespace NodeJS {
    interface ProcessEnv {
      SENTRY_DSN_SERVER: string;
      IS_SENTRY_SERVER_ENABLED: string;
      NODE_ENV: string;
      HOST: string;
      PORT: string;
    }
}
