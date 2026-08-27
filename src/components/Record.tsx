import { RecordType } from '@/types';
import { Image, Text, View } from 'react-native';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";

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

        <Dialog>
            <DialogTrigger>
                <View className=' flex flex-row gap-2 items-center mx-2 p-2 bg-gray-200'>
                    <Image source={require("@/assets/images/icon.png")} alt='' className="size-16 rounded-full " />
                    <View>


                        <Text>{`${from.name} => ${to.name}`}</Text>
                        <Text>{id}</Text>
                        <Text>{amount}</Text>
                        {/* <Text>{time}</Text> */}
                        {/* <Text>{note}</Text> */}
                    </View>

                </View>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove your data
                        from our servers.
                    </DialogDescription>
                </DialogHeader>
                <Text>{`${from.name} => ${to.name}`}</Text>
                <Text>{id}</Text>
                <Text>{amount}</Text>
                {/* <Text>{time}</Text> */}
                {/* <Text>{note}</Text> */}
            </DialogContent>



        </Dialog>
    )
}