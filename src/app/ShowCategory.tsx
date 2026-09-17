import LucideIcon from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { mockAccounts } from '@/constants/mock-data';
import currency from '@/lib/currency';

import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function ShowCategory() {
    const router = useRouter();
    const { id } = useLocalSearchParams<{ id?: string | string[] }>();
    const categoryId = Array.isArray(id) ? id[0] : id;

    const category =
        mockAccounts.find((item) => item.id === categoryId) ?? mockAccounts[0];

    return (
        <ScrollView className='flex-1 bg-slate-100 p-2'>
            <View className='mb-4 flex-row items-center justify-between'>
                <Button variant='ghost' onPress={() => router.back()} className='p-0'>
                    <ArrowLeft size={24} color='#0f172a' />
                </Button>
                <Text className='text-xl font-bold text-slate-800'>Category Details</Text>
                <View className='w-6' />
            </View>

            <View className='rounded-2xl border border-emerald-200 bg-white p-4 shadow-sm'>
                <View className='mb-4 flex-row items-center gap-3'>
                    <View className='h-14 w-14 items-center justify-center rounded-full bg-emerald-50'>
                        <LucideIcon name={category.icon} size={28} color='#059669' />
                    </View>

                    <View>
                        <Text className='text-2xl font-bold text-slate-800'>{category.name}</Text>
                        <View className='flex flex-row items-center'>
                            <Text className='text-xs capitalize text-slate-500'>Initial value </Text>
                            <Text className='text-lg font-semibold text-slate-500'>
                                {currency.symbol}{category.initValue.toFixed(2)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View>
                    <View className='flex flex-row items-center'>
                        <Text className='text-xs text-slate-500'>Transactions </Text>
                        {/* <Text className='text-lg font-semibold text-slate-700'>{category.records.length}</Text> */}
                    </View>

                    <View className='flex flex-row items-center'>
                        <Text className='text-xs text-slate-500'>Balance </Text>
                        <Text
                            className={`text-2xl font-bold ${category.balance >= 0 ? 'text-green-600' : 'text-red-600'}`}
                        >
                            {currency.symbol} {category.balance.toFixed(2)}
                        </Text>
                    </View>
                </View>
            </View>

            <View className='mt-6'>
                <Text className='mb-3 text-xl font-bold text-slate-800'>Recent transactions</Text>
                {/* <GroupRecords data={category.records} /> */}
            </View>
        </ScrollView>
    );
}
