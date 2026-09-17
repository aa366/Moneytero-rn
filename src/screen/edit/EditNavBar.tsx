import { Button } from '@/components/ui/button'
import { RecordType } from '@/types'
import { router } from 'expo-router'
import { CornerLeftUpIcon, X } from 'lucide-react-native'
import { useRef } from 'react'
import { Alert, Text, View } from 'react-native'

interface Props {
    record: RecordType;
    // Dispatch<SetStateAction<RecordType>>
}

export default function EditNavBar({ record }: Props) {


    const originalCopy = useRef(record)

    function handleSave() {
        const hasFrom = Boolean(record.fromId)
        const hasTo = Boolean(record.toId)

        if (!hasFrom || !hasTo) {
            Alert.alert("Missing data", "Choose both sides of the transaction before saving.")
            return
        }

        const nextRecord = {
            ...record,
            id: record.id || `rec_${Date.now()}`,
        }

        if (record.id) {
            // useUpdateRecord(nextRecord)
        } else {
            // useAddRecord(nextRecord)
        }

        router.back()
    }

    function hadnleCancel() {
        // record.updateRecord({
        //     ...originalCopy.record
        // })
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