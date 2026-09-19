import { Button } from '@/components/ui/button'
import { formatDate, formatTime } from '@/lib'
import { RecordType } from '@/types'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Text, View } from 'react-native'

interface Props {
    record: RecordType;
    setRecord: (t: RecordType) => void;
}

export default function TimeControl({ record, setRecord }: Props) {



    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)


    function showMode(currentMode: "date" | "time") {
        setMode(currentMode)
        setShow(true)
    }

    function handleChange(_: unknown, newDate?: Date) {
        setShow(false)
        if (!newDate) return

        setRecord({
            ...record,
            time: newDate.getTime(),
        })
    }

    return (
        <View className='flex flex-row justify-between relative'>
            <Button
                onPress={() => showMode("date")}
                variant={"outline"}>
                <Text>
                    Date: {formatDate(record.time).toString()}
                </Text>
            </Button>

            <Button
                onPress={() => showMode("time")}
                variant={"outline"}>
                <Text>Time: {formatTime(record.time)}</Text>
            </Button>

            {show && (
                <DateTimePicker
                    testID='datetimepicker'
                    value={new Date(record.time)}
                    mode={mode}
                    onChange={handleChange}
                />
            )}
        </View>
    )
}