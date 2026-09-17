// import TopBar from '@/components/layout/TopBar'
// import { mockAccounts } from '@/constants/mock-data'
// import AccountCard from '@/screen/accounts/AccountCard'
// // import AddAccount from '@/screen/accounts/AddAccount'
// import Overall from '@/screen/analysis/Overall'

// import { ScrollView, Text, View } from 'react-native'

// export default function Accounts() {

//     return (
//         <>
//             <TopBar />
//             <ScrollView className='flex-1 bg-slate-100 px-2 py-3'>

//                 <Overall />
//                 {/* Add Button */}
//                 {/* <AddAccount /> */}
//                 {/* Title */}
//                 <Text
//                     className='text-2xl font-bold text-slate-800 mb-3 px-2 '>
//                     Accounts
//                 </Text>
//                 {/* Accounts */}
//                 <View>
//                     {mockAccounts.filter((item) => item.type == "account").map((account) => (
//                         <AccountCard key={account.id} data={account} />
//                     ))}
//                 </View>
//             </ScrollView>
//         </>
//     )
// }
import { Text, View } from 'react-native'

export default function Accounts() {
    return (
        <View>
            <Text>Accounts</Text>
        </View>
    )
}