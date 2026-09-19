import TopBar from '@/components/layout/TopBar'
import { getAllAccounts } from '@/database/accounts-action'
import AddCategory from '@/screen/categories/AddCategory'
import GroupCatagories from '@/screen/categories/GroupCatagories'
import { useAccountRefreshStore } from '@/screen/categories/catagiroiesStoe'
import { AccountType } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'

export default function Categories() {
    const [data, setData] = useState<AccountType[]>([])
    const refreshTick = useAccountRefreshStore((state) => state.refreshTick)
    const refreshCatagories = useCallback(async () => setData(await getAllAccounts()), [])

    useEffect(() => {
        refreshCatagories()
    }, [refreshTick])

    return (
        <>
            <TopBar />
            <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>
                {/* Add Button */}
                <AddCategory />
                {/* Title */}
                {/* Categories */}
                <GroupCatagories data={data} />
            </ScrollView>
        </>
    )
}
