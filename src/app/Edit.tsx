import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { getAccount } from '@/lib/utils';
import { useRecord } from '@/store';
import { AccountType } from '@/types';
import { useRouter } from 'expo-router';
import { X } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

type EditType = "income" | "expense" | "transfer"

function checkTransactionType(
    fromAccount: AccountType,
    toAccount: AccountType
): EditType {
    fromAccount.type
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
    const fromAccount = getAccount(record.from.id)
    const toAccount = getAccount(record.to.id)
    const [editType, setEditType] = useState<EditType>
        ("income")


    useEffect(() => {
        if (fromAccount && toAccount) {
            setEditType(checkTransactionType(fromAccount, toAccount))
        }
    }, [])

    console.log(record.to.id);


    function handleSave() {
        console.log("Saved");

        router.back()
    }

    return (
        <View className='bg-gray-200 h-full p-1 gap-2'>
            {/* TOP bar */}
            <View className='mx-4 flex flex-row justify-between'>

                <Button variant={"ghost"} onPress={() => router.back()}>
                    <X size={24} className='text-blue-900' />
                    <Text className=' text-blue-900 font-bold capitalize text-lg'>Cancel</Text>
                </Button>

                <Button variant={"ghost"} onPress={handleSave}>
                    <X size={24} className='text-blue-900' />
                    <Text className=' text-blue-900 font-bold capitalize text-lg'>Save</Text>
                </Button>
            </View>
            {/* NAV bar */}
            <View className='flex flex-row gap-1 items-center justify-center'>
                {/* income button */}
                <Button variant={"ghost"} onPress={() => setEditType("income")}>
                    <Text className={` capitalize  font-bold  text-xl ${!(editType === "income") && "text-gray-600"} `}>
                        Income</Text>
                </Button>
                <Separator orientation='vertical' />
                {/* expense button */}
                <Button variant={"ghost"} onPress={() => setEditType("expense")}>
                    <Text className={` capitalize  font-bold  text-xl ${!(editType === "expense") && "text-gray-600"} `}>
                        expense</Text>
                </Button>
                <Separator orientation='vertical' />
                {/* transfer button */}
                <Button variant={"ghost"} onPress={() => setEditType("transfer")}>
                    <Text className={` capitalize  font-bold  text-xl ${!(editType === "transfer") && "text-gray-600"} `}>
                        transfer</Text>
                </Button>

            </View>
            {/* Select */}
            {/* Notes */}
            {/* Screen */}
            {/* Calc */}
            {/* Time Pick */}
            <Text>{record.id}</Text>
        </View>
    )
}