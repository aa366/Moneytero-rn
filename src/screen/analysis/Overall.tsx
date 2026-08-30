import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Text } from '@/components/ui/text'
import currency from '@/lib/currency'
import { View } from 'react-native'
export default function Totals() {
    // Expense So far
    // income so far 
    // Total balance
    const expenses = 365424
    const incomes = 455665
    const total = (eval(incomes + "-" + expenses))
        .toLocaleString();
    console.log(expenses, incomes, total);

    return (

        <View className='border rounded-lg p-2'>
            <Text variant={"h3"} className='text-black'>Overall</Text>
            <Card className='bg-inherit  p-2 mt-3'>
                {/* so far */}
                <View className='flex flex-row justify-between'>
                    <View
                        className=' items-center'>
                        <Text
                            className='uppercase text-black'>
                            expense so far
                        </Text>
                        <Text
                            className='text-red-500'>
                            {currency.symbol + Math.abs(expenses)}
                        </Text>

                    </View>
                    <Separator
                        orientation='vertical'
                    />
                    <View
                        className=' items-center'>
                        <Text
                            className='uppercase text-black'>
                            income so far
                        </Text>
                        <Text
                            className='text-green-500'>
                            {currency.symbol + incomes}
                        </Text>

                    </View>
                </View>
                <Separator />
                {/* total */}
                <View
                    className=' items-center'>
                    <Text
                        className='uppercase text-black'>
                        Total balance
                    </Text>
                    <Text
                        className='text-black'>
                        {currency.symbol + total}
                    </Text>

                </View>
            </Card>
        </View>
    )
}