import type { Config } from "jest";

const esModules = [
  "react-native",
  "@react-native",
  "@react-native-community",
  "@react-navigation",
  "expo(?:-[a-z0-9-]+)?",
  "@expo",
  "expo-router",
  "react-native-reanimated",
  "react-native-gesture-handler",
  "react-native-safe-area-context",
  "react-native-paper",
  "react-native-screens",
  "react-native-url-polyfill",
  "msw",
  "@mswjs",
  "until-async",
].join("|");

const config: Config = {
  verbose: true,
  setupFiles: ["./test-setup/setup.ts"],
  setupFilesAfterEnv: ["./test-setup/setupAfterEnv.ts"],
  preset: "jest-expo",
  transformIgnorePatterns: [
    `/node_modules/(?!(${esModules})/)`,
  ],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
};

export default config;
