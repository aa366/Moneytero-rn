import { Button } from '@/components/ui/button'
import { formatDate, formatTime } from '@/lib'

import { useRecord } from '@/store/record.store'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useState } from 'react'
import { Text, View } from 'react-native'

export default function TimeControl() {
    const record = useRecord()
    const [date, setDate] = useState(new Date())
    const [mode, setMode] = useState<'date' | 'time'>('date')
    const [show, setShow] = useState(false)

    function showMode(currentMode: "date" | "time") {
        setMode(currentMode)
        setShow(true)
    }

    function handleChange(_: unknown, newDate: Date) {
        setShow(false)
        if (newDate) {
            setDate(newDate)
            record.updateCurrent({
                ...record.current,
                time: newDate.getTime()
            })
        }
    }


    return (
        <View className='flex flex-row  justify-between relative '>
            <Button
                onPress={() => showMode("date")}
                variant={"outline"}>

                <Text>
                    Date: {`${formatDate(date).toString()}`}
                </Text>
            </Button>

            <Button
                onPress={() => showMode("time")}
                variant={"outline"}>
                <Text> Time: {`${formatTime(date)} `}</Text>
            </Button>

            {show && (
                <DateTimePicker
                    testID='datetimepicker'
                    value={date}
                    mode={mode}
                    onValueChange={handleChange}
                    onDismiss={() => setShow(false)}
                />
            )}
        </View>
    )
}