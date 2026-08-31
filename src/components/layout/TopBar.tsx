import { Menu, Search } from 'lucide-react-native'
import { View } from 'react-native'
import { Button } from '../ui/button'
import { Text } from '../ui/text'
export default function TopBar() {
    return (
        <View className='flex flex-row bg-gray-200 justify-between p-2 items-center'>
            <View className='flex flex-row gap-3'>
                <Button variant={"ghost"}>

                    <Menu color="black" />
                </Button>
                <Text className='border-0 text-amber-600 font-extrabold ' variant={"h2"}>
                    MoneyTero
                </Text>
            </View>

            <Button variant={"ghost"}>
                <Search color="black" />
            </Button>
        </View>
    )
}