import currency from '@/lib/currency';

import { deleteAccount } from '@/database/accounts-action';
import { AccountType } from '@/types';
import { useRouter } from 'expo-router';
import { MoreHorizontal, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import LucideIcon from '../../components/LucideIcon';
import { Card } from '../../components/ui/card';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '../../components/ui/menubar';
import { useRefresh } from '../refresh';
import UpdateAccount from './UpdateAccount';

export default function AccountCard({ data }: {
    data: AccountType;
}) {

    const router = useRouter()
    const triggerRefresh = useRefresh((state) => state.triggerRefresh)
    const [menuValue, setMenuValue] = useState<string | undefined>(undefined)
    const isPositive = data.balance >= 0


    function handleOpen() {


        router.push({
            pathname: '/ShowAccount',
            params: { id: data.id },
        })
    }

    async function handleDelete() {
        await deleteAccount(data.id)
        await triggerRefresh()
    }

    return (
        <Card className='my-2 w-[95%] self-center rounded-xl border border-blue-200 bg-blue-50 p-3 flex-row items-center justify-between gap-3'>

            {/* left side */}
            <Pressable onPress={handleOpen} className='flex-1 flex-row items-center gap-3'>
                {/* Icon */}
                <View className='h-12 w-12 items-center justify-center rounded-full bg-white'>
                    <LucideIcon name={data.icon} size={28} color='#1d4ed8' />
                </View>
                {/* Name  & balance*/}
                <View className='flex-1'>
                    <Text
                        className='text-lg font-semibold text-slate-800'>
                        {data.name}
                    </Text>
                    {/* balance */}

                    <Text
                        className={`text-lg font-bold 
                                ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {currency.symbol}{data.balance.toFixed(2)}
                    </Text>
                </View>
            </Pressable>
            {/* Menu Bar */}
            <Menubar
                value={menuValue}
                onValueChange={setMenuValue}
                className='bg-inherit border-0 '>
                <MenubarMenu value='account-menu'>
                    {/* Trigger */}
                    <MenubarTrigger
                        className='rounded-full p-2 bg-blue-200 '>
                        <MoreHorizontal
                            size={22}
                            color='black' />
                    </MenubarTrigger>
                    {/* Content */}
                    <MenubarContent
                        className='bg-white -translate-x-14 flex justify-center items-center min-w-fit '>
                        {/* Edit */}
                        <MenubarItem className='active:bg-inherit'>
                            {/* update wedget */}
                            <UpdateAccount
                                onAccountChanged={triggerRefresh}
                                data={data}
                            />


                        </MenubarItem>
                        {/* Delete */}
                        <MenubarSeparator
                            className='w-[90%] mx-auto' />
                        <MenubarItem variant='destructive' onPress={handleDelete}>
                            <View className='flex-row items-center gap-2'>
                                <Trash2 size={14} color='#dc2626' />
                                <Text className='text-red-600'>Delete</Text>
                            </View>
                        </MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>


        </Card>
    )
}