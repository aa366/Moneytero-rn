// import TopBar from '@/components/layout/TopBar'
// import { mockAccounts } from '@/constants/mock-data'
// import AddCategory from '@/screen/categories/AddCategory'
// import CategoryCard from '@/screen/categories/CategoryCard'
// import { ScrollView, Text, View } from 'react-native'

// export default function Categories() {

//     return (
//         <>
//             <TopBar />
//             <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>

//                 {/* <Overall /> */}
//                 {/* Add Button */}
//                 <AddCategory />
//                 {/* Title */}
//                 <Text
//                     className='text-2xl font-bold text-slate-800 mb-3 px-2 '>
//                     Categories
//                 </Text>
//                 {/* Categories */}
//                 <View>
//                     {mockAccounts.filter((item) => item.type != "account").map((category) => (
//                         <CategoryCard key={category.id} data={category} />
//                     ))}
//                 </View>
//             </ScrollView>
//         </>
//     )
// }

import { Text, View } from 'react-native'

export default function Categories() {
    return (
        <View>
            <Text>Categories</Text>
        </View>
    )
}