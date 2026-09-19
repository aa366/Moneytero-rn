import { Textarea } from '@/components/ui/textarea';
import { RecordType } from '@/types';
import { View } from 'react-native';

interface Props {
    record: RecordType;
    setRecord: (t: RecordType) => void;
}

export default function EditNote({ record, setRecord }: Props) {
    return (
        <View className='w-full h-[120px]'>
            <Textarea
                placeholder='Add notes'
                value={record.note ?? ''}
                onChangeText={(note) => setRecord({ ...record, note })}
                className='h-[120px]'
            />
        </View>
    )
}