import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { RecordType } from '@/types';
import { Text, View } from 'react-native';

interface Props {
    record: RecordType;
    setRecord: (t: RecordType) => void;
}
export default function EditTabs({
    record,
    setRecord
}: Props) {
    function setEditType(status: "income" | "expense" | "transfer") {
        setRecord({ ...record, type: status })
    }
    return (
        <View className='flex flex-row  items-center justify-center'>
            {/* income button */}
            <Button variant={"ghost"} onPress={() => setEditType("income")}>
                <Text className={` uppercase  font-bold  text-lg ${!(record.type === "income") && "text-gray-600"} `}>
                    Income</Text>
            </Button>
            <Separator orientation='vertical' />
            {/* expense button */}
            <Button variant={"ghost"} onPress={() => setEditType("expense")}>
                <Text className={` uppercase  font-bold  text-lg ${!(record.type === "expense") && "text-gray-600"} `}>
                    expense</Text>
            </Button>
            <Separator orientation='vertical' />
            {/* transfer button */}
            <Button variant={"ghost"} onPress={() => setEditType("transfer")}>
                <Text className={` uppercase font-bold   text-lg ${!(record.type === "transfer") && "text-gray-600"} `}>
                    transfer</Text>
            </Button>

        </View>
    )
}