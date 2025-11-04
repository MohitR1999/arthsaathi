import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
    verbose: true,
    setupFiles: ['./src/test-setup/setup.ts'],
    setupFilesAfterEnv: ['./src/test-setup/setupAfterEnv.ts'],
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg
    },
    testPathIgnorePatterns: ["/node_modules/", "/dist/"]
};

export default config;