import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { mockAccounts, mockCategories } from '@/constants/mock-data';
import { useRecord } from '@/store/record.store';
import { AccountType } from '@/types';
import { useState } from 'react';
import { View } from 'react-native';

interface Props {
    title: string;
    items: AccountType[];
    defaultValue?: AccountType;
    field: "from" | "to";
}

function MySelect({
    title = "account",
    items = mockAccounts,
    defaultValue,
    field,
}: Props) {
    const record = useRecord()
    const [item, setItem] =
        useState<AccountType | undefined>();
    const selectedValue = item ?? defaultValue;

    function handleValueChange(option: {
        value: string;
        label: string;
    } | undefined
    ) {
        const selectedItem = items.find((item) => item.id === option?.value);
        if (!selectedItem) return;

        setItem(selectedItem)
        record.updateCurrent({
            ...record.current,
            [field]: {
                id: selectedItem.id,
                name: selectedItem.name,
            },
        })
    }

    return (
        <Select
            value={selectedValue && {
                value: selectedValue.id,
                label: selectedValue.name
            }}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue className='text-black' placeholder={selectedValue?.name ?? title} />
            </SelectTrigger>

            <SelectContent className='w-[180px]'>

                <SelectLabel>
                    {title}
                </SelectLabel>
                {
                    items.map((item, i) => (
                        <SelectItem
                            label={item.name.slice(0, 15)}
                            value={item.id}
                            key={item.id + i + "select-key"}>
                            {item.name}
                        </SelectItem>

                    ))
                }

            </SelectContent>
        </Select>
    )
}
export default function EditSelect({
    editType,
    fromAccount,
    toAccount
}: {
    editType: "transfer" | "income" | "expense";
    fromAccount: AccountType | null;
    toAccount: AccountType | null;
}) {

    const fromSelect = fromAccount ?? undefined;
    const toSelect = toAccount ?? undefined;


    return (
        <View className=' flex flex-row gap-2 mx-2 justify-center'>
            {editType == "transfer" ? (
                <>
                    <View >
                        <Text variant={"large"} className='text-black'>From</Text>
                        <MySelect
                            title='From'
                            items={mockAccounts}
                            defaultValue={fromSelect}
                            field='from'
                        />
                    </View>
                    <View>
                        <Text variant={"large"} className='text-black'>To</Text>
                        <MySelect
                            title='to'
                            items={mockAccounts}
                            defaultValue={toSelect}
                            field='to'
                        />
                    </View>

                </>
            ) : (
                <>
                    <View >
                        <Text variant={"large"} className='text-black'>Account</Text>
                        <MySelect
                            title='account'
                            items={mockAccounts}
                            defaultValue={editType == "income" ? toSelect : fromSelect}
                            field={editType == "income" ? "to" : "from"}
                        />
                    </View>

                    <View>
                        <Text
                            variant={"large"} className='text-black'>Category</Text>
                        <MySelect
                            title='category'
                            items={mockCategories}
                            defaultValue={editType == "income" ? fromSelect : toSelect}
                            field={editType == "income" ? "from" : "to"}
                        />
                    </View>

                </>
            )}
        </View>
    )
}
