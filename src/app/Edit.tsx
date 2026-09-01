import Calc from '@/screen/edit/Calc';
import EditNavBar from '@/screen/edit/EditNavBar';
import EditNote from '@/screen/edit/EditNote';
import EditSelect from '@/screen/edit/EditSelect';
import EditTabs from '@/screen/edit/EditTabs';
import TimeControl from '@/screen/edit/TimeControl';
import { useState } from 'react';
import { View } from 'react-native';

export type EditType = "income" | "expense" | "transfer"


export default function Edit() {
    const [editType, setEditType] =
        useState<EditType>("income");

    return (
        <View className='bg-gray-200 min-h-full p-1 gap-2'>
            <EditNavBar />
            <EditTabs
                editType={editType}
                setEditType={setEditType}
            />
            <EditSelect editType={editType} />
            <EditNote />
            <Calc />
            <TimeControl />
        </View>
    )
}