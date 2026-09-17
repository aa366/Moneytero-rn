import LucideIcon from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { mockAccounts } from '@/constants/mock-data';
import currency from '@/lib/currency';
// import { useAccountStore } from '@/store/account.store';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function ShowAccount() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string | string[] }>();
    const accountId = Array.isArray(id) ? id[0] : id;
    // const accountStore = useAccountStore();
    const account = mockAccounts.find((item) => item.id === accountId) ?? mockAccounts[0];

    return (
        <ScrollView className='flex-1 bg-slate-100 p-2'>
            {/* Nav */}
            <View
                className='mb-4 flex-row items-center justify-between'>
                <Button
                    variant='ghost'
                    onPress={() => router.back()}
                    className='p-0'>
                    <ArrowLeft size={24} color='#0f172a' />
                </Button>
                <Text
                    className='text-xl font-bold text-slate-800'>
                    Account Details
                </Text>
                <View className='w-6' />
            </View>
            {/* Card */}
            <View className='rounded-2xl border border-blue-200 bg-white p-4 shadow-sm'>
                {/* Top Card  */}
                <View className='mb-4 flex-row items-center gap-3'>
                    <View
                        className='h-14 w-14 items-center justify-center rounded-full bg-blue-50'>
                        <LucideIcon name={account.icon} size={28} color='#2563eb' />
                    </View>
                    {/* Name & inital balance */}
                    <View>
                        <Text className='text-2xl font-bold text-slate-800'>{account.name}</Text>
                        {/* Intial value */}
                        <View className='flex flex-row items-center'>
                            <Text
                                className='text-xs capitalize  text-slate-500'>
                                Initial value {" "}
                            </Text>
                            <Text
                                className='text-lg font-semibold text-slate-500'>
                                {currency.symbol}{account.initValue.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>
                {/* balance & transactions number */}
                <View>
                    {/* transactions */}
                    <View
                        className='flex flex-row  items-center'>
                        <Text className='text-xs text-slate-500'>
                            Transactions {" "}
                        </Text>
                        {/* <Text className='text-lg font-semibold text-slate-700'>{account.records.length}</Text> */}
                    </View>
                    {/* balance */}
                    <View className='flex flex-row  items-center' >
                        <Text className='text-xs text-slate-500'>
                            Balance {" "}
                        </Text>
                        <Text
                            className={`text-2xl font-bold ${account.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {currency.symbol} {account.balance.toFixed(2)}
                        </Text>
                    </View>

                </View>
                {/*  */}
            </View>
            {/* Recent Transactions */}
            <View className='mt-6'>
                <Text
                    className='mb-3 text-xl font-bold text-slate-800'>
                    Recent transactions
                </Text>
                {/* <GroupRecords data={account.records} /> */}

            </View>

        </ScrollView>
    );
}