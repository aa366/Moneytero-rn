import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { getAccount } from '@/lib/utils';
import Calc from '@/screen/edit/Calc';
import { default as EditSelect } from '@/screen/edit/EditSelect';
import TimeControl from '@/screen/edit/TimeControl';
import { useRecord } from '@/store/record.store';
import { AccountType } from '@/types';
import { useRouter } from 'expo-router';
import { CornerLeftUpIcon, X } from 'lucide-react-native';
import { useEffect, useRef, useState } from 'react';
import { Alert, Text, View } from 'react-native';
export type EditType = "income" | "expense" | "transfer"


function checkTransactionType(
    fromAccount: AccountType,
    toAccount: AccountType
): EditType {
    if (fromAccount.type === "category") {
        return "income"
    } else if (toAccount.type === "category") {
        return "expense"
    }
    return "transfer"
}

export default function Edit() {

    const router = useRouter()
    const record = useRecord()
    const originalCopy = useRef(record.current)
    const current = record.current ?? {
        id: "",
        amount: 0,
        from: { name: "", id: "" },
        to: { name: "", id: "" },
        time: "",
        note: "",
    }
    // accounts that will work with
    const fromAccount = current.from?.id ? getAccount(current.from.id) : null
    const toAccount = current.to?.id ? getAccount(current.to.id) : null
    // tabs
    const [editType, setEditType] =
        useState<EditType>("income");

    useEffect(() => {
        if (fromAccount && toAccount) {
            setEditType(checkTransactionType(fromAccount, toAccount))
        }
    }, [fromAccount, toAccount])

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
            record.updateRecord(nextRecord)
        } else {
            record.addRecord(nextRecord)
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
        <View className='bg-gray-200 min-h-full p-1 gap-2'>
            {/* TOP bar */}
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
            {/* NAV/Tabs bar */}
            <View className='flex flex-row  items-center justify-center'>
                {/* income button */}
                <Button variant={"ghost"} onPress={() => setEditType("income")}>
                    <Text className={` uppercase  font-bold  text-lg ${!(editType === "income") && "text-gray-600"} `}>
                        Income</Text>
                </Button>
                <Separator orientation='vertical' />
                {/* expense button */}
                <Button variant={"ghost"} onPress={() => setEditType("expense")}>
                    <Text className={` uppercase  font-bold  text-lg ${!(editType === "expense") && "text-gray-600"} `}>
                        expense</Text>
                </Button>
                <Separator orientation='vertical' />
                {/* transfer button */}
                <Button variant={"ghost"} onPress={() => setEditType("transfer")}>
                    <Text className={` uppercase font-bold   text-lg ${!(editType === "transfer") && "text-gray-600"} `}>
                        transfer</Text>
                </Button>

            </View>
            {/* Select */}
            <EditSelect
                editType={editType}
                fromAccount={fromAccount}
                toAccount={toAccount} />
            {/* Notes */}
            <View className=' w-full h-[120px] '>
                <Textarea
                    placeholder='Add notes'
                    value={record.current.note}
                    onChangeText={(note) => record.updateCurrent({ ...record.current, note })}
                    className=' h-[120px] ' />
            </View>

            <Calc />
            {/* Time Pick */}
            <TimeControl />
        </View>
    )
}