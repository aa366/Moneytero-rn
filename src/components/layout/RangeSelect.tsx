import currency from "@/lib/currency";
import {
    ArrowLeft,
    ArrowRight,
    Funnel
} from "lucide-react-native";
import { View } from "react-native";
import { Button } from "../ui/button";
import { Text } from "../ui/text";

export default function RangeSelect() {
    return (
        <View className="bg-gray-200">

            <View className="flex flex-row justify-center">
                <View className="flex flex-row gap-5 items-center">
                    <Button variant={"ghost"}>
                        <ArrowLeft color="black" />
                    </Button>
                    <Text className="text-black">Augest,2026</Text>
                    <Button variant={"ghost"}>
                        <ArrowRight color="black" />
                    </Button>
                </View>
                <View>
                    <Button variant={"ghost"}>

                        <Funnel color="black" />
                    </Button>
                </View>
            </View>
            <View className="flex flex-row p-2 pt-0 justify-between">
                <View className="p-1 items-center">
                    <Text className="uppercase text-black">
                        Expense
                    </Text>
                    <Text className="text-red-500">
                        {currency.symbol}6265.56
                    </Text>
                </View>
                <View className="p-1 items-center">
                    <Text className="uppercase text-black">
                        income
                    </Text>
                    <Text className="text-green-500">
                        {currency.symbol}8921.56
                    </Text>
                </View>
                <View className="p-1 items-center">
                    <Text className="uppercase text-black">
                        total
                    </Text>
                    <Text className="text-green-500" >
                        {currency.symbol}8897.56
                    </Text>
                </View>

            </View>
        </View >

    )
}