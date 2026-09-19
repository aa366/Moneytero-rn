import TopBar from '@/components/layout/TopBar'
import { getAllAccounts } from '@/database/accounts-action'
import AccountCard from '@/screen/accounts/AccountCard'
import AddAccount from '@/screen/accounts/AddAccount'
// import AddAccount from '@/screen/accounts/AddAccount'
import Overall from '@/screen/analysis/Overall'
import { AccountType } from '@/types'
import { useCallback, useEffect, useState } from 'react'

import { ScrollView, Text, View } from 'react-native'

export default function Accounts() {
    const [data, setData] = useState<AccountType[]>([])

    const refreshAccounts = useCallback(async () => {
        const accs = await getAllAccounts();
        setData(accs);
    }, []);

    useEffect(() => {
        refreshAccounts();
    }, [refreshAccounts]);

    return (
        <>
            <TopBar />
            <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>

                <Overall />
                {/* Add Button */}
                <AddAccount onAccountChanged={refreshAccounts} />
                {/* Title */}
                <Text
                    className='text-2xl font-bold text-slate-800 mb-3 px-2 '>
                    Accounts
                </Text>
                {/* Accounts */}
                <View>
                    {data.filter((item) => item.type == "account").map((account) => (
                        <AccountCard key={account.id} data={account} onAccountChanged={refreshAccounts} />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
