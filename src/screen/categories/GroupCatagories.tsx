import { Text } from '@/components/ui/text';
import { AccountType } from '@/types';
import { ScrollView, View } from 'react-native';
import CatagoryCard from './CatagoryCard';

interface Props {
    data: AccountType[]

}

export default function GroupCatagories({ data }: Props) {
    const incomes = {
        title: "Incomes"
        , data: data.filter((i) => i.type === "income")
    }
    const expenses = {
        title: "Expenses",
        data: data.filter((i) => i.type === "expense")
    }
    const joints = {
        title: "Joint", data: data.filter((i) => i.type === "joint")
    }
    const group = [incomes, expenses, joints]

    return (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
            {group.map((i) => (
                <View key={i.title + "Title"}>
                    <Text
                        className='text-black mt-5'
                        variant={"h2"}>
                        {i.title}

                    </Text>
                    <View>

                        {i.data.map((item) => (
                            <CatagoryCard
                                data={item}
                                key={item.id} />
                        ))}
                    </View>
                </View>
            ))}

        </ScrollView>
    )
}