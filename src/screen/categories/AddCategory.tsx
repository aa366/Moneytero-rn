import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Text } from '@/components/ui/text';
import { ToggleGroup, ToggleGroupIcon, ToggleGroupItem } from '@/components/ui/toggle-group';
import { ACCOUNT_ICONS } from '@/constants/icons';
import { createAccount } from '@/database/accounts-action';
import { AccountType } from '@/types';
import { Plus } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';

export default function AddCategory() {

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState('');
    const [balance, setBalance] = useState('');
    const [selectedIcon, setSelectedIcon] = useState('Wallet');
    const [ctype, setCType] = useState<string>("income")

    async function handleSubmit() {
        if (!name || !balance || !selectedIcon) {
            Alert.alert('Error', 'Please fill the category information before submit');
            return;
        }

        const newCategory: AccountType = {
            name,
            balance: Number(balance),
            icon: selectedIcon as any,
            id: Date.now().toString(),
            initValue: Number(balance),
            type: ctype,

        };

        // categoryStore.addCategory(newCategory);

        await createAccount(newCategory)

        setName('');
        setBalance('');
        setSelectedIcon('Wallet');
        setIsOpen(false);
    }

    function handlecType(val: string) {
        console.log(val);
        setCType(val)

    }
    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger asChild>
                <Button onPress={() => setIsOpen(true)} className='mx-auto my-3 w-[80%]' variant={'outline'}>
                    <Text>Add New Category</Text>
                    <Plus size={24} color={'white'} />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className='bg-slate-500'>
                {/* Name */}
                <View>
                    <Text>Name</Text>
                    <Input value={name} onChangeText={setName} />
                </View>
                {/* balance */}
                <View>
                    <Text>Initial balance</Text>
                    <Input value={balance} onChangeText={setBalance} keyboardType='numeric' />
                </View>
                <ToggleGroup

                    type='single'
                    value={ctype}
                    onValueChange={handlecType}
                >
                    <ToggleGroupItem
                        isFirst
                        value='income'
                        aria-label='toggle account type' >
                        <ToggleGroupIcon as={Plus} />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='expense'
                        aria-label='toggle account type' >
                        <ToggleGroupIcon as={Plus} />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value='joint'
                        aria-label='toggle account type' >
                        <ToggleGroupIcon as={Plus} />
                    </ToggleGroupItem>



                </ToggleGroup>
                {/* icon */}
                <View>
                    <Text>Icon</Text>
                    <ScrollView className='h-[120px]'>
                        <View className='flex flex-wrap flex-row gap-2'>
                            {ACCOUNT_ICONS.map(({ name, Icon }) => {
                                const isSelected = selectedIcon === name;

                                return (
                                    <Button
                                        key={name + '-icon'}
                                        variant={isSelected ? 'default' : 'outline'}
                                        size='sm'
                                        className='h-14 w-14 rounded-full p-0'
                                        onPress={() => setSelectedIcon(name)}
                                    >
                                        <Icon size={18} color={isSelected ? 'black' : 'white'} />
                                    </Button>
                                );
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
    );
}
