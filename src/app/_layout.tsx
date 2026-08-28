import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { Suspense } from "react";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  return (

    <SafeAreaView className="flex-1">
      <Suspense fallback={<Text>..Loading</Text>}>
        <SQLiteProvider databaseName="main" useSuspense>

          <Stack screenOptions={{ headerShown: false }} />

          <PortalHost />
        </SQLiteProvider>
      </Suspense>
    </SafeAreaView>);
}

