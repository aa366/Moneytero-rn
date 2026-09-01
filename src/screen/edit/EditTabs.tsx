import { EditType } from '@/app/Edit';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Dispatch, SetStateAction } from 'react';
import { Text, View } from 'react-native';

interface Props {
    setEditType: Dispatch<SetStateAction<EditType>>;
    editType: EditType;
}
export default function EditTabs({
    setEditType,
    editType
}: Props) {
    return (
        <View className='flex flex-row  items-center justify-center'>
            {/* income button */}
            <Button variant={"ghost"} onPress={() => setEditType("income")}>
                <Text className={` uppercase  font-bold  text-lg ${!(editType === "income") && "text-gray-600"} `}>
                    Income</Text>
            </Button>
            <Separator orientation='vertical' />
            {/* expense button */}
            <Button variant={"ghost"} onPress={() => setEditType("expense")}>
                <Text className={` uppercase  font-bold  text-lg ${!(editType === "expense") && "text-gray-600"} `}>
                    expense</Text>
            </Button>
            <Separator orientation='vertical' />
            {/* transfer button */}
            <Button variant={"ghost"} onPress={() => setEditType("transfer")}>
                <Text className={` uppercase font-bold   text-lg ${!(editType === "transfer") && "text-gray-600"} `}>
                    transfer</Text>
            </Button>

        </View>
    )
}