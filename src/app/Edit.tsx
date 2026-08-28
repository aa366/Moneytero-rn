import { useRecord } from '@/store';
import { Text, View } from 'react-native';

export default function Edit() {
    const record = useRecord()
    console.log(record.to.id);

    return (
        <View>
            <Text>{record.id}</Text>
        </View>
    )
}