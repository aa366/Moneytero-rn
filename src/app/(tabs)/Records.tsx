import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/GroupRecords';
import RangeSelect from '@/components/layout/RangeSelect';
import TopBar from '@/components/layout/TopBar';
import { getAllRecords } from '@/database/records-action';
import { useRefresh } from '@/screen/refresh';
import { RecordType } from '@/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Records() {
    const refreshTick = useRefresh(s => s.refreshTick)
    const [data, setData] = useState<RecordType[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const h = (await getAllRecords()) ?? []
            setData(h)
        }
        fetchData()
    }, [refreshTick])
    console.log(data.length);

    return (
        <View className='relative h-[96vh] flex flex-col bg-slate-100' >
            <View className=''>

                <TopBar />
                <RangeSelect />
            </View>
            {/* <Record data={mockRecords[0]} /> */}
            <GroupRecords data={data} className=' relative pb-[70px] ' contentContainerStyle={{ paddingBottom: 50 }} />
            <FloatingButton className=' absolute bottom-10 right-5 size-14' />

        </View>
    );
}