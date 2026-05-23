// Allow TypeScript to understand CSS modules
declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

// Allow TypeScript to understand image imports
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.svg' {
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

// Add type declarations for the fonts
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.otf';

// Add type declarations for environment variables
declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    VITE_API_URL?: string;
  }
}
