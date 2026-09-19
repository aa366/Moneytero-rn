import { EMPTY_RECORD } from '@/constants/empty';
import { mockRecords } from '@/constants/mock-data';
import { getRecordById } from '@/database/records-action';
import Calc from '@/screen/edit/Calc';
import EditNavBar from '@/screen/edit/EditNavBar';
import EditNote from '@/screen/edit/EditNote';
import EditSelect from '@/screen/edit/EditSelect';
import EditTabs from '@/screen/edit/EditTabs';
import TimeControl from '@/screen/edit/TimeControl';
import { RecordType } from '@/types';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

export default function Edit() {
    const { id } = useLocalSearchParams<{ id: string; }>()

    const [record, setRecord] = useState<RecordType>(EMPTY_RECORD)

    useEffect(() => {
        const h = async () => {
            if (!id) {
                return
            }

            const dbRecord = await getRecordById(id)
            const mock = mockRecords.find((i) => i.id === id)
            // console.log(dbRecord, "-".repeat(40), mock);

            setRecord(mock ?? dbRecord ?? EMPTY_RECORD)

        }
        h()
    }, [])

    return (
        <View className='bg-gray-200 min-h-full p-1 gap-2'>
            <EditNavBar record={record} />
            <EditTabs
                record={record}
                setRecord={setRecord}
            />
            <EditSelect
                record={record}
                setRecord={setRecord}
            />
            <EditNote
                record={record}
                setRecord={setRecord}
            />
            <Calc
                record={record}
                setRecord={setRecord}
            />
            <TimeControl
                record={record}
                setRecord={setRecord}
            />
        </View>
    )
}