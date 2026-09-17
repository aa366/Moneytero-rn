import { Button } from '@/components/ui/button'
import { formatDate, formatTime } from '@/lib'
import { RecordType } from '@/types'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Dispatch, SetStateAction, useState } from 'react'
import { Text, View } from 'react-native'

interface Props {
    record: RecordType;
    setRecord: Dispatch<SetStateAction<RecordType>>;
}

export default function TimeControl({ record, setRecord }: Props) {
    const [date, setDate] = useState(new Date(record.time || Date.now()))
    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)

    function showMode(currentMode: "date" | "time") {
        setMode(currentMode)
        setShow(true)
    }

    function handleChange(_: unknown, newDate?: Date) {
        setShow(false)
        if (!newDate) return

        setDate(newDate)
        setRecord((current) => ({
            ...current,
            time: newDate.getTime(),
        }))
    }

    return (
        <View className='flex flex-row justify-between relative'>
            <Button
                onPress={() => showMode("date")}
                variant={"outline"}>
                <Text>
                    Date: {formatDate(date).toString()}
                </Text>
            </Button>

            <Button
                onPress={() => showMode("time")}
                variant={"outline"}>
                <Text>Time: {formatTime(date)}</Text>
            </Button>

            {show && (
                <DateTimePicker
                    testID='datetimepicker'
                    value={date}
                    mode={mode}
                    onChange={handleChange}
                />
            )}
        </View>
    )
}