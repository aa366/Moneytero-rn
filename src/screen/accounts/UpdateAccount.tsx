import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { ACCOUNT_ICONS } from '@/constants/icons'
import { recalculateAccountBalances, updateAccount } from '@/database/accounts-action'

import { AccountType } from '@/types'
import { Pencil } from 'lucide-react-native'
import { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'


interface Props {
    onAccountChanged: () => void;
    data: AccountType;
}
export default function UpdateAccount({
    onAccountChanged,
    data
}: Props) {
    // const accountStore = useAccountStore()
    const [isOpen, setIsOpen] = useState(false)

    const [name, setName] = useState(data.name)
    const [balance, setBalance] = useState(data.initValue)
    const [selectedIcon, setSelectedIcon] = useState(data.icon)

    async function handleSubmit() {
        if (!name || !selectedIcon) {
            Alert.alert("Error", "Please Fill the account information before submit it ")
            return
        }

        const newAccount: AccountType = {
            ...data,
            name: name,
            icon: selectedIcon,
            initValue: Number(balance),
        }
        await updateAccount(newAccount)
        await recalculateAccountBalances()
        await onAccountChanged()
        // accountStore.addAccount(newAccount)

        setIsOpen(false)
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>

            <AlertDialogTrigger asChild>
                <Button
                    onPress={() => setIsOpen(true)}
                    className='flex-row items-center gap-2'>
                    <Pencil size={14} color='#0f172a' />
                    <Text>Edit</Text>
                </Button>
            </AlertDialogTrigger>

            {/* Content */}

            <AlertDialogContent className='bg-slate-500'>
                {/* Name */}
                <View>
                    <Text>Name</Text>
                    <Input value={name} onChangeText={setName} />
                </View>
                {/* Intial */}
                <View>
                    <Text>Initial balance</Text>
                    <Input value={balance.toString()} onChangeText={(e: string) => setBalance(Number(e))} keyboardType='numeric' />
                </View>
                {/* Icon */}
                <View>
                    <Text>Icon</Text>
                    <ScrollView className='h-[120px]'>
                        <View className='flex flex-wrap flex-row  gap-2'>
                            {ACCOUNT_ICONS.map(({ name, Icon }) => {
                                const isSelected = selectedIcon === name

                                return (
                                    <Button
                                        key={name + "-icon"}
                                        variant={isSelected ? 'default' : 'outline'}
                                        size='sm'
                                        className='h-14 w-14 rounded-full p-0 '
                                        onPress={() => setSelectedIcon(name)}
                                    >
                                        <Icon size={18} color={isSelected ? "black" : "white"} />
                                    </Button>
                                )
                            })}
                        </View>
                    </ScrollView>

                </View>

                <View className='flex w-full flex-row justify-around'>
                    <AlertDialogCancel asChild>
                        <Button onPress={() => setIsOpen(false)} variant={'outline'}>
                            <Text>Cancel</Text>
                        </Button>
                    </AlertDialogCancel>
                    <Button onPress={handleSubmit}>
                        <Text>Submit</Text>
                    </Button>
                </View>
            </AlertDialogContent>
        </AlertDialog>
    )
}