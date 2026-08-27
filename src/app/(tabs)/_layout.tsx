import { Tabs } from 'expo-router'

export default function Layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='Records' />
            <Tabs.Screen name='Analysis' />
            <Tabs.Screen name='Accounts' />
            <Tabs.Screen name='Categories' />
        </Tabs>
    )
}