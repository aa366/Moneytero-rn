import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Text } from '@/components/ui/text'
import { ACCOUNT_ICONS } from '@/constants/icons'
import { useAccountStore } from '@/store/account.store'
import { AccountType } from '@/types'
import { Plus } from 'lucide-react-native'
import { useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'



export default function AddAccount() {
    const accountStore = useAccountStore()
    const [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState('')
    const [balance, setBalance] = useState('')
    const [selectedIcon, setSelectedIcon] = useState('Wallet')

    function handleSubmit() {
        if (!name || !balance || !selectedIcon) {
            Alert.alert("Error", "Please Fill the account information before submit it ")
            return
        }

        const newAccount: AccountType = {
            name: name,
            balance: Number(balance),
            icon: selectedIcon,
            id: Date.now().toString(),
            initValue: Number(balance),
            type: "account",
            records: []
        }

        accountStore.addAccount(newAccount)
        setName("")
        setBalance("")
        setSelectedIcon("Wallet")
        setIsOpen(false)
    }

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button
                    onPress={() => setIsOpen(true)}
                    className='mx-auto my-3 w-[80%]'
                    variant={'outline'}
                >
                    <Text>Add New Account</Text>
                    <Plus size={24} color={'white'} />
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
                    <Input value={balance} onChangeText={setBalance} keyboardType='numeric' />
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