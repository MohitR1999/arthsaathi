export const createTestRouter = (overrides: Record<string, any>) => {
  // Filter out null/undefined values to match expo-router's type requirements
  const filteredOverrides = Object.fromEntries(
    Object.entries(overrides).filter(([_, value]) => value != null)
  );
  
  return filteredOverrides;
};
