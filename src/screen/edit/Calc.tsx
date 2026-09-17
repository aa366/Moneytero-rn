import LucideIcon from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { RecordType } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { Alert, View } from 'react-native';

const calcOBJ = [
    ["+", "7", "8", "9"],
    ["-", "4", "5", "6"],
    ["*", "1", "2", "3"],
    ["/", "0", ".", "="],
]

interface Props {
    record: RecordType;
    setRecord: Dispatch<SetStateAction<RecordType>>;
}

export default function Calc({ record, setRecord }: Props) {
    const [screenValue, setScreenValue] = useState(() =>
        record.amount ? String(record.amount) : "",
    )

    function handleCalcInput(value: string) {
        if (value === "=") {
            const safeAmount = Number(screenValue) || 0
            setRecord((current) => ({ ...current, amount: safeAmount }))
            return
        }

        if (screenValue.length >= 10) {
            Alert.alert("Error", "Be careful you exceeded the highest number allowed (10). Please enter a valid value.")
            return
        }

        const nextValue = screenValue + value
        setScreenValue(nextValue)
        setRecord((current) => ({ ...current, amount: Number(nextValue) || 0 }))
    }

    return (
        <>
            <View>
                <Button
                    variant={"outline"}
                    className='h-[90px] text-right flex flex-row justify-end pr-[60px]'>
                    <Text
                        className='text-right text-5xl'
                        variant={"default"}
                        numberOfLines={1}
                    >
                        {screenValue ? screenValue : "0"}
                    </Text>
                </Button>

                <Button
                    variant={"ghost"}
                    className='absolute -right-3 top-1/2 -translate-y-1/2'
                    onPress={() => {
                        setScreenValue("")
                        setRecord((current) => ({ ...current, amount: 0 }))
                    }}>
                    <LucideIcon name='Delete' size={45} className='' color={"red"} />
                </Button>
            </View>

            <View className='gap-2'>
                {calcOBJ.map((row, rowIndex) => (
                    <View
                        key={`calc-row-${rowIndex}`} className='flex-row gap-2'>
                        {row.map((value) => (
                            <Button
                                key={value}
                                variant={value === "=" ? "default" : "outline"}
                                onPress={() => handleCalcInput(value)}
                                className='w-12 h-[70px] flex-1'
                            >
                                <Text className='text-xl font-bold'>{value}</Text>
                            </Button>
                        ))}
                    </View>
                ))}
            </View>
        </>
    )
}