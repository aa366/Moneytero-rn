import FloatingButton from '@/components/FloatingButton';
import GroupRecords from '@/components/Group';
import { mockRecords } from '@/constants/mock-data';
import { Text, View } from 'react-native';

export default function Records() {

    return (
        <View className='relative min-h-full' >
            <Text className="text-red-500">Edit src/app/index.tsx to edit this screen.</Text>

            <GroupRecords data={mockRecords} />
            <FloatingButton className=' absolute bottom-5 right-5 size-14' />

        </View>
    );
}