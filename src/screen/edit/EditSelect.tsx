import {
    Select,
    SelectContent,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { Text } from '@/components/ui/text';
import { getAllAccounts } from '@/database/accounts-action';
import { AccountType, RecordType } from '@/types';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

interface Props {
    title: string;
    defaultValue?: AccountType;
    field: "fromId" | "toId";
    record: RecordType;
    setRecord: (t: RecordType) => void;
    accounts: AccountType[];
}

function MySelect({
    title = "account",
    defaultValue,
    field,
    record,
    setRecord,
    accounts
}: Props) {
    const [item, setItem] = useState<AccountType | undefined>(defaultValue);
    const selectedValue = item ?? defaultValue;

    useEffect(() => {
        setItem(defaultValue)
    }, [defaultValue?.id])

    function handleValueChange(option: { value: string; label: string; } | undefined) {
        const selectedItem = accounts.find((item) => item.id === option?.value);
        if (!selectedItem) return;

        setItem(selectedItem)
        setRecord({
            ...record,
            [field]: selectedItem.id,
        })
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
                {accounts.map((item, i) => (
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
    setRecord: (t: RecordType) => void;
}) {
    const [accounts, setAccounts] = useState<AccountType[]>([])

    const fromSelect = accounts.find((item) => item.id === record.fromId);
    const toSelect = accounts.find((item) => item.id === record.toId);

    useEffect(() => {
        const h = async () => {
            const data = await getAllAccounts()
            setAccounts(data)
        }
        h()
    }, [])

    return (
        <View className='flex flex-row gap-2 mx-2 justify-center'>
            {record.type == "transfer" ? (
                <>
                    <View>
                        <Text variant={"large"} className='text-black'>From</Text>
                        <MySelect
                            title='From'

                            defaultValue={fromSelect}
                            field='fromId'
                            setRecord={setRecord}
                            record={record}
                            accounts={accounts.filter((i) => i.type == "account")}
                        />
                    </View>
                    <View>
                        <Text variant={"large"} className='text-black'>To</Text>
                        <MySelect
                            title='to'

                            defaultValue={toSelect}
                            field='toId'
                            setRecord={setRecord}
                            record={record}
                            accounts={accounts.filter((i) => i.type == "account")}
                        />
                    </View>
                </>
            ) : (
                <>
                    <View>
                        <Text variant={"large"} className='text-black'>Account</Text>
                        <MySelect
                            title='account'

                            defaultValue={record.type == "income" ? toSelect : fromSelect}
                            field={record.type == "income" ? "toId" : "fromId"}
                            setRecord={setRecord}
                            record={record}
                            accounts={accounts.filter((i) => i.type == "account")}
                        />
                    </View>

                    <View>
                        <Text variant={"large"} className='text-black'>Category</Text>
                        <MySelect
                            title='category'

                            defaultValue={record.type == "income" ? fromSelect : toSelect}
                            field={record.type == "income" ? "fromId" : "toId"}
                            setRecord={setRecord}
                            record={record}
                            accounts={record.type == "income" ? accounts.filter((i) => i.type != "account" && i.type != "expense")
                                :
                                accounts.filter((i) => i.type != "account" && i.type != "income")}
                        />
                    </View>
                </>
            )}
        </View>
    )
}
