import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/GroupRecords';
import { useRecord } from '@/store/record.store';
import { Text, View } from 'react-native';

export default function Records() {
    const records = useRecord()
    return (
        <View className='relative min-h-full flex flex-col justify-between' >
            <Text className="text-red-500">Edit src/app/index.tsx to edit this screen.</Text>

            <GroupRecords data={records.records} />
            <FloatingButton className=' absolute bottom-5 right-5 size-14' />

        </View>
    );
}