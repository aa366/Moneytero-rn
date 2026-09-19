import { formatDate } from '@/lib';
import { cn } from '@/lib/utils';
import { RecordType } from '@/types';
import React from 'react';
import { ScrollView, ScrollViewProps, Text, View } from 'react-native';
import Record from './RecordCard';
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

    return data.map((element, index) => {
        const date = new Date(element[0].time)
        const forrmated = formatDate(date)
        return (

            <View key={index + "element-id"}>
                <View className=' mt-4 mb-4 '>
                    <Text className='ml-[5%] text-lg font-bold capitalize'>{forrmated ? forrmated : "Header"}</Text>
                    <Separator className='h-1 w-[90%] mx-auto ' />
                </View>
                {element.map((item) => (
                    <View key={item.id + "key-unique-group-by-time"}>
                        <Record data={item} />
                        {!(item.id === element.at(-1)?.id) && <Separator className='my-1' />}
                    </View>
                ))}


            </View>


        )
    })
}

export default function GroupRecords({ data, className, children, contentContainerStyle }: Props) {


    const groupedByTime = data.reduce((acc, item) => {
        const key = item.time;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<string, RecordType[]>);

    const sortedData = Object.values(groupedByTime)


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