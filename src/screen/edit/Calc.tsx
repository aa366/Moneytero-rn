import LucideIcon from '@/components/LucideIcon';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { RecordType } from '@/types';
import { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';

const calcOBJ = [
    ["+", "7", "8", "9"],
    ["-", "4", "5", "6"],
    ["*", "1", "2", "3"],
    ["/", "0", ".", "="],
]

interface Props {
    record: RecordType;
    setRecord: (t: RecordType) => void;
}

export default function Calc({ record, setRecord }: Props) {
    const [screenValue, setScreenValue] = useState("")

    function handleCalcInput(value: string) {
        if (screenValue.length >= 10) {
            Alert.alert("Error", "Be careful you exceeded the highest number allowed (10). Please enter a valid value.")
            return
        }

        if (value === "=") {
            try {
                const safeAmount = eval(screenValue) || 0
                setScreenValue(safeAmount.toString())
                setRecord({ ...record, amount: safeAmount })
                return
            } catch (error) {
                Alert.alert("Error", `Please be careful experssion can be not calclauted`)
                return
            }

        }

        const nextValue = screenValue + value
        setScreenValue(nextValue)
        if (["/", "*", "-", "+"].includes(value)) {
            return
        }
        setRecord({ ...record, amount: Number(nextValue) || 0 })
    }

    useEffect(() => {
        setScreenValue(record.amount === 0 ? "" : record.amount.toString())
    }, [record.id])

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
                        setRecord({ ...record, amount: 0 })
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