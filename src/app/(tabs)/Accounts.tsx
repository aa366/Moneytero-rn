import AccountCard from '@/components/AccountCard'
import AddAccount from '@/screen/accounts/AddAccount'
import Overall from '@/screen/analysis/Overall'
import { useAccountStore } from '@/store/account.store'
import { ScrollView, Text, View } from 'react-native'

export default function Accounts() {
    const accountStore = useAccountStore()
    return (
        <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>

            <Overall />
            {/* Add Button */}
            <AddAccount />
            {/* Title */}
            <Text
                className='text-2xl font-bold text-slate-800 mb-3 px-2 '>
                Accounts
            </Text>
            {/* Accounts */}
            <View>
                {accountStore.accounts.map((account) => (
                    <AccountCard key={account.id} data={account} />
                ))}
            </View>
        </ScrollView>
    )
}