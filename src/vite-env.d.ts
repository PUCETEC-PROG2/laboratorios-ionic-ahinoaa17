/// <reference types="vite/client" />
/// <reference types="vite/react" />

interface ImportMetaEnv {
  readonly VITE_GITHUB_API_URL?: string;
  readonly VITE_GITHUB_API_TOKEN?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

