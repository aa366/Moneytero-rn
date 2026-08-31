import TopBar from '@/components/layout/TopBar'
import AddCategory from '@/screen/categories/AddCategory'
import CategoryCard from '@/screen/categories/CategoryCard'
import { useCategoryStore } from '@/store/category.store'
import { ScrollView, Text, View } from 'react-native'

export default function Categories() {
    const categoryStore = useCategoryStore()
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
                    {categoryStore.categories.map((category) => (
                        <CategoryCard key={category.id} data={category} />
                    ))}
                </View>
            </ScrollView>
        </>
    )
}