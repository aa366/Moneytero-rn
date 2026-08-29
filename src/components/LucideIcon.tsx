import { LucideProps } from 'lucide-react-native';
import * as icons from "lucide-react-native/icons";

export type NAME = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, "name"> {
    name: NAME;
}

export default function LucideIcon({ name, ...props }: IconProps) {
    const Icon = icons[name];

    return <Icon {...props} />
}


