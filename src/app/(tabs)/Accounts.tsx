import AccountCard from '@/components/AccountCard'
import { mockAccounts } from '@/constants/mock-data'
import { ScrollView, Text, View } from 'react-native'

export default function Accounts() {
    return (
        <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>
            <View className='mb-3 px-2'>
                <Text className='text-2xl font-bold text-slate-800'>Accounts</Text>
            </View>

            {mockAccounts.map((account) => (
                <AccountCard key={account.id} data={account} />
            ))}
        </ScrollView>
    )
}