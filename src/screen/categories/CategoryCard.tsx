import currency from '@/lib/currency';
import { useCategoryStore } from '@/store/category.store';
import { AccountType } from '@/types';
import { useRouter } from 'expo-router';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Pressable, Text, View } from 'react-native';
import LucideIcon from '../../components/LucideIcon';
import { Card } from '../../components/ui/card';
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarSeparator, MenubarTrigger } from '../../components/ui/menubar';

export default function CategoryCard({ data }: { data: AccountType }) {
    const categoryStore = useCategoryStore();
    const router = useRouter();
    const [menuValue, setMenuValue] = useState<string | undefined>(undefined);
    const isPositive = data.balance >= 0;

    function handleOpen() {
        router.push({
            pathname: '/ShowCategory',
            params: { id: data.id },
        });
    }

    function handleEdit() {
        Alert.alert('Edit category', `Editing ${data.name}`);
    }

    function handleDelete() {
        categoryStore.removeCategory(data.id);
    }

    return (
        <Card className='my-2 w-[95%] self-center rounded-xl border border-emerald-200 bg-emerald-50 p-3 flex-row items-center justify-between gap-3'>
            <Pressable onPress={handleOpen} className='flex-1 flex-row items-center gap-3'>
                <View className='h-12 w-12 items-center justify-center rounded-full bg-white'>
                    <LucideIcon name={data.icon} size={28} color='#059669' />
                </View>

                <View className='flex-1'>
                    <Text className='text-lg font-semibold text-slate-800'>{data.name}</Text>
                    <Text className={`text-lg font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                        {currency.symbol}{data.balance.toFixed(2)}
                    </Text>
                </View>
            </Pressable>

            <Menubar value={menuValue} onValueChange={setMenuValue} className='bg-inherit border-0'>
                <MenubarMenu value='category-menu'>
                    <MenubarTrigger className='rounded-full p-2 bg-emerald-200'>
                        <MoreHorizontal size={22} color='black' />
                    </MenubarTrigger>

                    <MenubarContent className='bg-white -translate-x-14 flex justify-center items-center min-w-fit'>
                        <MenubarItem onPress={handleEdit} className='active:bg-inherit'>
                            <View className='flex-row items-center gap-2'>
                                <Pencil size={14} color='#0f172a' />
                                <Text>Edit</Text>
                            </View>
                        </MenubarItem>

                        <MenubarSeparator className='w-[90%] mx-auto' />
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
    );
}
