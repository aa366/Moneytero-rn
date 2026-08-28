import currency from '@/lib/currency';
import { getAccount } from '@/lib/utils';
import { useRecord } from '@/store';
import { RecordType } from '@/types';
import { Link } from 'expo-router';
import { MoveRight, Pen, RefreshCw, Trash, X } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import LucideIcon from './LucideIcon';
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTrigger } from './ui/alert-dialog';
import { Button } from './ui/button';

interface Props {
    data: RecordType;

}

export default function Record({
    data
}: Props) {
    const {
        id,
        to,
        from,
        amount,
        time,
        note
    } = data
    const [isDialogOpen, setIsDialogopen] = useState(false)
    const [isDeleteOpen, setIsDeleteopen] = useState(false)
    let uniqueColor = {
        text: "text-blue-500",
        bg: "bg-blue-300"
    }
    let transactionType: "Transfer" | "Category" = "Transfer"
    let isIncome = false
    const fromAccount = getAccount(from.id)
    const toAccount = getAccount(to.id)
    const record = useRecord()


    if (!fromAccount || !toAccount) {
        throw new Error("account does not exist")
    }

    if (fromAccount.type === "category" || toAccount.type === "category") {

        transactionType = "Category"

        if (toAccount.type == "account") {
            uniqueColor = {
                text: "text-green-500",

                bg: "bg-green-300"
            }
            isIncome = true

        } else {
            uniqueColor = {
                text: "text-red-500",
                bg: "bg-red-300"
            }
            isIncome = false
        }
    }


    function handlePen() {


        record.updateRecord({ ...data })
        setIsDialogopen(false)
    }
    function handleDelete() {

        setIsDialogopen(false)
        setIsDeleteopen(false)

    }
    return (

        <AlertDialog open={isDialogOpen} onPointerCancel={() => setIsDialogopen(false)}>
            <AlertDialogTrigger className=' flex flex-row gap-2 items-center justify-between mx-2 p-2 bg-gray-200' onPress={() => setIsDialogopen(true)}>
                {transactionType === "Category" ?
                    (
                        <>
                            <LucideIcon
                                name={isIncome ? fromAccount.icon : toAccount.icon}
                                className=" aspect-square rounded-full "
                                size={50}
                            />

                            <View className='max-w-[50%] overflow-auto'>

                                <Text className={` text-lg `} numberOfLines={1}>{isIncome ?
                                    fromAccount.name :
                                    toAccount.name}
                                </Text>

                                <View className='flex flex-row items-center gap-1' >

                                    <LucideIcon
                                        name={toAccount.icon}
                                        color='gray'
                                    />
                                    <Text className='text-gray-500'>
                                        {to.name.slice(0, 10)}
                                    </Text>


                                </View>

                            </View>
                        </>
                    ) :
                    (
                        <>

                            <RefreshCw
                                className=" aspect-square rounded-full "
                                size={50} />


                            <View className='max-w-[50%] overflow-auto'>

                                <Text className={` text-xl ${uniqueColor.text}`}>{transactionType}</Text>

                                <View className='flex flex-row items-center gap-1' >
                                    <View className='flex flex-row gap-1 '>
                                        <LucideIcon
                                            name={fromAccount.icon}
                                            color='gray'
                                        />
                                        <Text className='text-gray-500'>
                                            {from.name.slice(0, 5)}
                                        </Text>
                                    </View>
                                    <MoveRight strokeWidth={1.75} color='gray' />
                                    <View className='flex flex-row gap-1 '>
                                        <LucideIcon
                                            name={toAccount.icon}
                                            color='gray'
                                        />
                                        <Text className='text-gray-500'>
                                            {to.name.slice(0, 5)}
                                        </Text>

                                    </View>
                                </View>

                            </View>


                        </>
                    )}
                <View>
                    <Text className={`' text-xl ${uniqueColor.text}`}>
                        {currency.symbol + amount}
                    </Text>
                </View>


            </AlertDialogTrigger>
            {/* Content */}

            <AlertDialogContent className='rounded-lg border border-white bg-gray-100 p-3 w-full'  >

                <AlertDialogHeader className={` flex items-center  ${uniqueColor.bg} p-5 rounded-xl`}>
                    {/* head */}
                    <View className='flex flex-row justify-between  w-full'>
                        <View className='flex flex-row gap-5'>
                            <Link
                                href={"/Edit"}
                                className='bg-blue-400 p-1 '
                                onPress={handlePen}
                            >
                                <Pen size={32} />
                            </Link>
                            <AlertDialog open={isDeleteOpen}>
                                <AlertDialogTrigger onPress={() => setIsDeleteopen(true)}>

                                    <Trash size={32} />
                                </AlertDialogTrigger>
                                <AlertDialogContent className='bg-white' >
                                    <Text>are you sure want to delete it ?</Text>
                                    <View className='flex flex-row justify-evenly w-full'>

                                        <Button variant={"outline"} onPress={() => setIsDeleteopen(false)} className='w-1/3'>
                                            <Text>
                                                Cancel
                                            </Text>
                                        </Button>
                                        <Button variant={"destructive"} onPress={handleDelete} className=' w-1/3'>
                                            <Text>
                                                Sure
                                            </Text>
                                        </Button>
                                    </View>
                                </AlertDialogContent>
                            </AlertDialog>
                        </View>

                        <X size={32} onPress={() => setIsDialogopen(false)} />
                    </View>
                    {/* texts */}
                    <Text className='text-2xl capitalize font-extrabold text-black'>
                        {transactionType === "Category" ? (
                            isIncome ? "Income" : "Expense"
                        ) : transactionType}
                    </Text>
                    <Text className='text-4xl font-bold '>{currency.symbol + amount}
                    </Text>
                    <Text className=' mr-auto '>
                        {time}
                    </Text>


                </AlertDialogHeader>

                {/* transaction sides */}
                <View>
                    {transactionType === "Category" ? (
                        <View className='gap-3'>
                            <View className='flex flex-row items-center justify-between'>

                                <Text className='text-lg'>Account

                                </Text>
                                <View className='flex flex-row gap-2 items-center border rounded-lg p-2 '>
                                    {isIncome ? (
                                        <>
                                            <LucideIcon name={toAccount.icon} size={24} />
                                            <Text className='text-lg'>{toAccount.name}</Text>
                                        </>

                                    ) : (
                                        <>
                                            <LucideIcon name={fromAccount.icon} size={24} />
                                            <Text className='text-lg'>{fromAccount.name}</Text>
                                        </>
                                    )}
                                </View>
                            </View>

                            <View className='flex flex-row items-center justify-between'>

                                <Text className='text-lg'>Category

                                </Text>
                                <View className='flex flex-row gap-2 items-center border rounded-lg p-2 '>
                                    {isIncome ? (
                                        <>
                                            <LucideIcon name={fromAccount.icon} size={24} />
                                            <Text className='text-lg'>{fromAccount.name}</Text>
                                        </>

                                    ) : (
                                        <>
                                            <LucideIcon name={toAccount.icon} size={24} />
                                            <Text className='text-lg'>{toAccount.name}</Text>
                                        </>
                                    )}
                                </View>
                            </View>
                        </View>
                    ) : (

                        <View className='gap-3'>
                            <View className='flex flex-row items-center justify-between'>

                                <Text className='text-lg'>From

                                </Text>
                                <View className='flex flex-row gap-2 items-center border rounded-lg p-2 '>
                                    <LucideIcon name={fromAccount.icon} size={24} />
                                    <Text className='text-lg'>{fromAccount.name}</Text>
                                </View>
                            </View>

                            <View className='flex flex-row items-center justify-between'>

                                <Text className='text-lg'> TO

                                </Text>
                                <View className='flex flex-row gap-2 items-center border rounded-lg p-2 '>
                                    <LucideIcon name={toAccount.icon} size={24} />
                                    <Text className='text-lg'>{toAccount.name}</Text>
                                </View>
                            </View>
                        </View>
                    )}


                </View>

                <ScrollView className='text-center text-gray-600 '>
                    <Text className='max-h-[200px]'>
                        {note ?? "No notes"}

                    </Text>
                </ScrollView>

            </AlertDialogContent>



        </AlertDialog>
    )
}