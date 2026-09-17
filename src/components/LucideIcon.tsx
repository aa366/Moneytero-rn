import { LucideProps } from 'lucide-react-native';
import * as icons from "lucide-react-native/icons";

export type IconName = keyof typeof icons;

export interface IconProps extends Omit<LucideProps, "name"> {
    name: IconName | string;
}

const isIconName = (name: string): name is IconName => { return Object.prototype.hasOwnProperty.call(icons, name); }

export default function LucideIcon({ name, ...props }: IconProps) {
    if (!isIconName(name)) {
        return null;
    }

    const Icon = icons[name];
    return <Icon {...props} />;
}


