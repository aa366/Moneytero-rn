import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/GroupRecords';
import RangeSelect from '@/components/layout/RangeSelect';
import TopBar from '@/components/layout/TopBar';
import { useRecord } from '@/store/record.store';
import { View } from 'react-native';

export default function Records() {
    const records = useRecord()
    return (
        <View className='relative h-[96vh] flex flex-col bg-slate-100' >
            <View className='h-[25vh]'>

                <TopBar />
                <RangeSelect />
            </View>

            <GroupRecords data={records.records} className='  ' />
            <FloatingButton className=' absolute bottom-10 right-5 size-14' />

        </View>
    );
}