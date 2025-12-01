import RootLayout from "../app/_layout";

const StubScreen = () => null;

export const createTestRouter = (overrides: Record<string, any>) => {
  const base = {
    // non protected routes
    index: StubScreen,
    _layout: RootLayout,
    login: StubScreen,
    register: StubScreen,

    // signed in routes
    "(signed-in)/_layout": StubScreen,
    "(signed-in)/categories": StubScreen,
    "(signed-in)/create-category": StubScreen,

    // tab routes
    "(signed-in)/(tabs)/_layout": StubScreen,
    "(signed-in)/(tabs)/index": StubScreen,
    "(signed-in)/(tabs)/money": StubScreen,
    "(signed-in)/(tabs)/profile": StubScreen,
  };

  return {
    ...base,
    ...overrides,
  };
};
