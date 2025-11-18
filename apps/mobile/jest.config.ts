import type { Config } from "jest";

const config: Config = {
  verbose: true,
  setupFiles: ["./test-setup/setup.ts"],
  setupFilesAfterEnv: ["./test-setup/setupAfterEnv.ts"],
  testEnvironment: "node",
  preset: "jest-expo",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
