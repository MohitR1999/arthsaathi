import RootLayout from "../app/_layout";

export const createTestRouter = (overrides: Record<string, any>) => {
  const base = {
    // non protected routes
    index: null,
    _layout: RootLayout,
    login: null,
    register: null,

    // signed in routes
    "(signed-in)/_layout": null,
    "(signed-in)/categories": null,
    "(signed-in)/create-category": null,
    
    // tab routes
    "(signed-in)/(tabs)/_layout": null,
    "(signed-in)/(tabs)/index": null,
    "(signed-in)/(tabs)/money": null,
    "(signed-in)/(tabs)/profile": null,
  }
  
  return {
    ...base,
    ...overrides,
  }
};
