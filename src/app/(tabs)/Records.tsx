import Record from '@/components/Record';
import { mockRecords } from '@/constants/mock-data';
import { Text, View } from 'react-native';

export default function Records() {
    return (
        <View >
            <Text className="text-red-500">Edit src/app/index.tsx to edit this screen.</Text>
            <Record data={mockRecords[0]} />
        </View>
    );
}