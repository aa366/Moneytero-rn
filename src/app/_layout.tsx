import { Text } from "@/components/ui/text";
import db from "@/database/db";
import { PortalHost } from "@rn-primitives/portal";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import "./global.css";

export default function RootLayout() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const row = await db.getFirstAsync<{ "1": number }>("SELECT 1 as value");
        console.log("DB ready:", row);
        setReady(true);
      } catch (error) {
        console.error("DB connection failed:", error);
      }
    })();
  }, []);

  if (!ready) {
    return (
      <SafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
        <Text className="text-black">Connecting database...</Text>
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="flex-1">
      <Stack screenOptions={{ headerShown: false }} />
      <PortalHost />
    </SafeAreaView>);
}

