declare module '*.svg';

declare module '*.css';

declare module '*.scss';

declare module '*/webpack-assets.json' {
  export const main: {
    js: string;
  };
}
