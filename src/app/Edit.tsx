import { EMPTY_RECORD } from '@/constants/empty';
import EditNavBar from '@/screen/edit/EditNavBar';
import EditSelect from '@/screen/edit/EditSelect';
import EditTabs from '@/screen/edit/EditTabs';
import EditNote from '@/screen/edit/EditNote';
import Calc from '@/screen/edit/Calc';
import TimeControl from '@/screen/edit/TimeControl';
import { RecordType } from '@/types';
import { useState } from 'react';
import { View } from 'react-native';

export default function Edit() {
    const [record, setRecord] = useState<RecordType>(EMPTY_RECORD)

    return (
        <View className='bg-gray-200 min-h-full p-2 gap-3'>
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