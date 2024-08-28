interface ImportMetaEnv {
    readonly VITE_USER_ID: string;
    readonly VITE_USER_PASSWORD: string;
    DEV: boolean;
    // 다른 환경 변수들에 대한 타입 정의...
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
