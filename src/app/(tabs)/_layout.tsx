import { Tabs } from 'expo-router'
import { Archive, ChartPie, Tag, Wallet } from 'lucide-react-native'

export default function Layout() {
    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                height: 60,
                margin: 0,
                padding: 0,
                display: "flex",
                paddingTop: 10,
                // position: "absolute",

            }
        }} >

            <Tabs.Screen name='Records'
                options={{
                    tabBarIcon: ({ color }) => <Archive size={32} color={color} />
                }} />
            <Tabs.Screen name='Analysis'
                options={{
                    tabBarIcon: ({ color }) => <ChartPie size={32} color={color} />
                }} />
            <Tabs.Screen name='Accounts'
                options={{
                    tabBarIcon: ({ color }) => <Wallet size={32} color={color} />
                }} />
            <Tabs.Screen name='Categories'
                options={{
                    tabBarIcon: ({ color }) => <Tag size={32} color={color} />
                }} />
        </Tabs>
    )
}