import icon from "@/assets/images/icon.png";
import { RecordType } from '@/types';
import { Image, Text, View } from 'react-native';

interface Props {
    data: RecordType;

}

export default function Record({
    data: {
        id,
        to,
        from,
        amount,
        time,
        note
    }
}: Props) {

    return (
        <View className=' flex flex-row gap-2 items-center mx-2 p-2 bg-gray-200'>
            <Image source={icon} alt='' className="size-16 rounded-full " />
            <View>


                <Text>{`${from.name} => ${to.name}`}</Text>
                <Text>{id}</Text>
                <Text>{amount}</Text>
                {/* <Text>{time}</Text> */}
                {/* <Text>{note}</Text> */}
            </View>
        </View>
    )
}