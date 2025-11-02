import type { Config } from 'jest';
import { createDefaultPreset } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

const config: Config = {
    verbose: true,
    setupFilesAfterEnv: ['./src/test-setup/setupAfterEnv.ts'],
    testEnvironment: "node",
    transform: {
        ...tsJestTransformCfg
    }
};

export default config;