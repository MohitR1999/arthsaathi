const store: Record<string, any> = {
  "auth-store": '{"state":{"email":"test@x.com","jwt":"test-jwt"},"version":0}',
};

jest.mock("expo-secure-store", () => ({
  getItemAsync: async (key: string) => {
    console.log(`Using mock store to fetch item: [ ${key} ]`);
    return store[key];
  },

  setItemAsync: async (key: string, value: string) => {
    console.log(`Using mock store to set item ${key} to ${value}`);
    store[key] = value;
  },

  removeItemAsync: async (key: string) => {
    console.log(`Using mock store to delete ${key}`);
    delete store[key];
  },
}));
