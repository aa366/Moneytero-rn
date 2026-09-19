import { getAllAccountsUnrestrected } from '@/database/accounts-action';
import { formatDate } from '@/lib';
import { cn } from '@/lib/utils';
import { AccountType, RecordType } from '@/types';
import React, { useEffect, useState } from 'react';
import { ScrollView, ScrollViewProps, Text, View } from 'react-native';
import RecordCard from './RecordCard';
import { Separator } from './ui/separator';

interface Props {
    data: RecordType[];
    children?: React.ReactNode;
    contentContainerStyle?: ScrollViewProps["contentContainerStyle"];
    className?: string;
}

function NoTransaction() {

    return (
        <Text
            className='font-bold text-lg text-black text-center mt-4'>

            No Transaction
        </Text>

    )
}

function Items({ data }: { data: RecordType[][] }) {
    const [accounts, setAccount] = useState<AccountType[]>([])

    useEffect(() => {
        const h = async () => {
            const d = await getAllAccountsUnrestrected()

            setAccount(d)

        }
        h()
    }, [])
    if (accounts.length === 0) {
        return
    }

    return data.map((element, index) => {
        const date = new Date(element[0].time)
        const forrmated = formatDate(date)
        return (

            <View key={index + "element-id"}>
                <View className=' mt-4 mb-4 '>
                    <Text className='ml-[5%] text-lg font-bold capitalize'>{forrmated}</Text>
                    <Separator className='h-1 w-[90%] mx-auto ' />
                </View>
                {element.map((item) => (
                    <View key={item.id + "key-unique-group-by-time"}>
                        <RecordCard data={item} accounts={accounts} />
                        {!(item.id === element.at(-1)?.id) && <Separator className='my-1' />}
                    </View>
                ))}


            </View>


        )
    })
}

export default function GroupRecords({ data, className, children, contentContainerStyle }: Props) {

    const groupedByTime = data.reduce<Record<string, RecordType[]>>((acc, item) => {
        const date = new Date(item.time);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

        if (!acc[key]) acc[key] = [];
        acc[key].push(item);

        return acc;
    }, {});

    const sortedData = Object.values(groupedByTime).sort(
        (a, b) => a[0].time - b[0].time
    );


    return (
        <ScrollView className={cn(`  relative  ${!sortedData.length && "bg-gray-300 rounded-md"}`, className)} contentContainerStyle={contentContainerStyle}>
            {sortedData.length ? (

                <Items data={sortedData} />


            ) : (
                <NoTransaction />
            )
            }

            {children}
        </ScrollView>
    )
}