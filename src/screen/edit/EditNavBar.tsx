import { Button } from '@/components/ui/button'
import { createRecord, updateRecord } from '@/database/records-action'
import { RecordType } from '@/types'
import { router } from 'expo-router'
import { CornerLeftUpIcon, X } from 'lucide-react-native'
import { Alert, Text, View } from 'react-native'
import { useRefresh } from '../refresh'

interface Props {
    record: RecordType;
    // Dispatch<SetStateAction<RecordType>>
}

export default function EditNavBar({ record }: Props) {
    const refresh = useRefresh(s => s.triggerRefresh)
    async function handleSave() {


        const hasFrom = Boolean(record.fromId)
        const hasTo = Boolean(record.toId)

        if (!hasFrom || !hasTo) {
            Alert.alert("Missing data", "Choose both sides of the transaction before saving.")
            return
        }

        const nextRecord: RecordType = {
            ...record,
            id: record.id || `rec_${Date.now()}`,
        }

        if (record.id) {
            await updateRecord(nextRecord)
        } else {
            await createRecord(nextRecord)
        }
        await refresh()
        console.log(nextRecord);
        router.back()
    }

    function hadnleCancel() {
        router.back()
    }

    return (
        <View className='mx-4 flex flex-row justify-between'>

            <Button variant={"ghost"} onPress={hadnleCancel}>
                <X size={24} className='text-blue-900' />
                <Text className=' text-blue-900 font-bold capitalize text-lg'>Cancel</Text>
            </Button>

            <Button variant={"ghost"} onPress={handleSave}>
                <CornerLeftUpIcon size={24} className='text-blue-900' />
                <Text className=' text-blue-900 font-bold capitalize text-lg'>Save</Text>
            </Button>
        </View>
    )
}