import { Button } from '@/components/ui/button'
import { useAddRecord, useUpdateRecord } from '@/store/action'
import { useRecord } from '@/store/record.store'
import { router } from 'expo-router'
import { CornerLeftUpIcon, X } from 'lucide-react-native'
import { useRef } from 'react'
import { Alert, Text, View } from 'react-native'

export default function EditNavBar() {
    const record = useRecord()
    const current = record.current
    const originalCopy = useRef(record.current)

    function handleSave() {
        const hasFrom = Boolean(current.from?.id)
        const hasTo = Boolean(current.to?.id)

        if (!hasFrom || !hasTo) {
            Alert.alert("Missing data", "Choose both sides of the transaction before saving.")
            return
        }

        const nextRecord = {
            ...current,
            id: current.id || `rec_${Date.now()}`,
        }

        if (current.id) {
            useUpdateRecord(nextRecord)
        } else {
            useAddRecord(nextRecord)
        }

        router.back()
    }

    function hadnleCancel() {
        record.updateRecord({
            ...originalCopy.current
        })
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