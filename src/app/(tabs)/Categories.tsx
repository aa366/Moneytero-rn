import TopBar from '@/components/layout/TopBar'
import { getAllAccounts } from '@/database/accounts-action'
import AddCategory from '@/screen/categories/AddCategory'
import CategoryCard from '@/screen/categories/CategoryCard'
import { AccountType } from '@/types'
import { useCallback, useEffect, useState } from 'react'
import { ScrollView, Text, View } from 'react-native'

export default function Categories() {
    const [data, setData] = useState<AccountType[]>([])

    const refreshCatagories = useCallback(async () => setData((await getAllAccounts())), [])

    useEffect(() => {
        refreshCatagories()
    }, [refreshCatagories])

    return (
        <>
            <TopBar />
            <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>

                {/* <Overall /> */}
                {/* Add Button */}
                <AddCategory />
                {/* Title */}
                <Text
                    className='text-2xl font-bold text-slate-800 mb-3 px-2 '>
                    Categories
                </Text>
                {/* Categories */}
                <View>
                    {data.filter((item) => item.type != "account").map((category) => (
                        <CategoryCard key={category.id} data={category} />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}
