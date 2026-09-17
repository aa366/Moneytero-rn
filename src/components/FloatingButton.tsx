import { cn } from '@/lib/utils';
// import { EMPTY_RECORD, useRecord } from '@/store/record.store';
import { useRouter } from 'expo-router';
import { Plus } from 'lucide-react-native';
import { Button } from './ui/button';

interface Props {
    className?: string;
}
export default function FloatingButton({ className }: Props) {
    const router = useRouter()
    // const record = useRecord()

    function handleGo() {
        // record.updateCurrent(EMPTY_RECORD)
        router.navigate("/Edit")
    }

    return (
        <Button className={cn('  aspect-square  p-2 rounded-full ml-auto w-fit mb-auto  bg-blue-300 ', className)} onPress={handleGo}>
            <Plus className='w-full h-full aspect-square size-full' />
            {/* <Text>sdasa</Text> */}
        </Button>
    )
}

