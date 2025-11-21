import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useTheme } from "react-native-paper";

type SafeLayoutProps = {
  children: ReactNode;
};

const SafeLayout = ({ children }: SafeLayoutProps) => {
  const theme = useTheme()

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: theme.colors.background
      }}
    >
      <StatusBar style={theme.dark ? 'light' : 'dark'} animated/>
      {children}
    </SafeAreaView>
  );
};

export { SafeLayout };
