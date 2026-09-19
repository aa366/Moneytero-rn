import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/GroupRecords';
import RangeSelect from '@/components/layout/RangeSelect';
import TopBar from '@/components/layout/TopBar';
import { mockRecords } from '@/constants/mock-data';
import { getAllRecords } from '@/database/records-action';
import { RecordType } from '@/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Records() {

    const [data, setData] = useState<RecordType[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const h = (await getAllRecords()) ?? []
            console.log(h);

            setData(h)
        }
        fetchData()
    }, [])

    return (
        <View className='relative h-[96vh] flex flex-col bg-slate-100' >
            <View className=''>

                <TopBar />
                <RangeSelect />
            </View>
            {/* <Record data={mockRecords[0]} /> */}
            <GroupRecords data={mockRecords} className=' relative pb-[70px] ' contentContainerStyle={{ paddingBottom: 50 }} />
            <FloatingButton className=' absolute bottom-10 right-5 size-14' />

        </View>
    );
}