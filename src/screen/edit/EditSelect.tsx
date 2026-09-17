import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { mockAccounts } from '@/constants/mock-data';
import { getAccount } from '@/lib';
import { AccountType, RecordType } from '@/types';
import { Dispatch, SetStateAction, useState } from 'react';
import { View } from 'react-native';

interface Props {
    title: string;
    items: AccountType[];
    defaultValue?: AccountType;
    field: "fromId" | "toId";
    record: RecordType;
    setRecord: Dispatch<SetStateAction<RecordType>>;
}

function MySelect({
    title = "account",
    items = mockAccounts,
    defaultValue,
    field,
    record,
    setRecord
}: Props) {
    const [item, setItem] = useState<AccountType | undefined>();
    const selectedValue = item ?? defaultValue;

    function handleValueChange(option: { value: string; label: string; } | undefined) {
        const selectedItem = items.find((item) => item.id === option?.value);
        if (!selectedItem) return;

        setItem(selectedItem)
        setRecord((current) => ({
            ...current,
            [field]: selectedItem.id,
        }))
    }

    return (
        <Select
            value={selectedValue ? {
                value: selectedValue.id,
                label: selectedValue.name
            } : undefined}
            onValueChange={handleValueChange}
        >
            <SelectTrigger className='w-[180px]'>
                <SelectValue className='text-black' placeholder={selectedValue?.name ?? title} />
            </SelectTrigger>

            <SelectContent className='w-[180px]'>
                <SelectLabel>{title}</SelectLabel>
                {items.map((item, i) => (
                    <SelectItem
                        label={item.name.slice(0, 15)}
                        value={item.id}
                        key={item.id + i + "select-key"}
                    >
                        {item.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default function EditSelect({
    record,
    setRecord
}: {
    record: RecordType;
    setRecord: Dispatch<SetStateAction<RecordType>>;
}) {
    const fromSelect = getAccount(record.fromId) ?? undefined;
    const toSelect = getAccount(record.toId) ?? undefined;

    return (
        <View className='flex flex-row gap-2 mx-2 justify-center'>
            {record.type == "transfer" ? (
                <>
                    <View>
                        <Text variant={"large"} className='text-black'>From</Text>
                        <MySelect
                            title='From'
                            items={mockAccounts}
                            defaultValue={fromSelect}
                            field='fromId'
                            setRecord={setRecord}
                            record={record}
                        />
                    </View>
                    <View>
                        <Text variant={"large"} className='text-black'>To</Text>
                        <MySelect
                            title='to'
                            items={mockAccounts}
                            defaultValue={toSelect}
                            field='toId'
                            setRecord={setRecord}
                            record={record}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Text variant={"large"} className='text-black'>Account</Text>
                        <MySelect
                            title='account'
                            items={mockAccounts}
                            defaultValue={record.type == "income" ? toSelect : fromSelect}
                            field={record.type == "income" ? "toId" : "fromId"}
                            setRecord={setRecord}
                            record={record}
                        />
                    </View>

                    <View>
                        <Text variant={"large"} className='text-black'>Category</Text>
                        <MySelect
                            title='category'
                            items={mockAccounts}
                            defaultValue={record.type == "income" ? fromSelect : toSelect}
                            field={record.type == "income" ? "fromId" : "toId"}
                            setRecord={setRecord}
                            record={record}
                        />
                    </View>
                </>
            )}
        </View>
    )
}
