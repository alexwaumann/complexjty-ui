/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ALCHEMY_KEY: string;
  readonly VITE_ALCHEMY_POLICY_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
