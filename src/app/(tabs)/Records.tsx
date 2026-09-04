import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/GroupRecords';
import RangeSelect from '@/components/layout/RangeSelect';
import TopBar from '@/components/layout/TopBar';
import { getAllRecords } from '@/database/records-action';
import { useRecord } from '@/store/record.store';
import { RecordType } from '@/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Records() {
    const records = useRecord()
    const [data, setData] = useState<RecordType[]>([])
    useEffect(() => {
        const fetchData = async () => {
            const h = (await getAllRecords()) ?? []
            setData(h)
        }
        fetchData()
    }, [])
    return (
        <View className='relative h-[96vh] flex flex-col bg-slate-100' >
            <View className='h-[25vh]'>

                <TopBar />
                <RangeSelect />
            </View>

            <GroupRecords data={data} className='  ' />
            <FloatingButton className=' absolute bottom-10 right-5 size-14' />

        </View>
    );
}