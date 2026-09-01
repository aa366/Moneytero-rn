import { Textarea } from '@/components/ui/textarea'
import { useRecord } from '@/store/record.store'
import { View } from 'react-native'

export default function EditNote() {
    const record = useRecord()
    return (
        <View className=' w-full h-[120px] '>
            <Textarea
                placeholder='Add notes'
                value={record.current.note}
                onChangeText={(note) => record.updateCurrent({ ...record.current, note })}
                className=' h-[120px] ' />
        </View>
    )
}