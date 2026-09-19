import TopBar from '@/components/layout/TopBar'
import { getAllAccounts } from '@/database/accounts-action'
import AccountCard from '@/screen/accounts/AccountCard'
import AddAccount from '@/screen/accounts/AddAccount'
// import AddAccount from '@/screen/accounts/AddAccount'
import Overall from '@/screen/analysis/Overall'
import { useRefresh } from '@/screen/refresh'
import { AccountType } from '@/types'
import { useEffect, useState } from 'react'

import { ScrollView, Text, View } from 'react-native'

export default function Accounts() {
    const [data, setData] = useState<AccountType[]>([])

    const refreshTick = useRefresh((state) => state.refreshTick)

    useEffect(() => {
        const h = async () => {
            const accs = await getAllAccounts();
            setData(accs);
        };
        h()
    }, [refreshTick]);

    return (
        <>
            <TopBar />
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className='flex-1 bg-slate-100 px-2 py-3'>

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
                    {data.filter((item) => item.type == "account").map((account) => (
                        <AccountCard key={account.id} data={account} />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
