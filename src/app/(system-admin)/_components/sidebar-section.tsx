import { cn } from "@/lib/utils";
import { ChevronRightIcon, LucideIcon } from "lucide-react";
import { IconType } from "react-icons/lib";
import { useToggle } from "react-use";
interface SidebarSectionProps {
    children: React.ReactNode;
    label: string;
    icon: LucideIcon | IconType;
}

export const SidebarSection = ({
    children,
    label,
    icon: Icon,
}: SidebarSectionProps) => {
    const [on, toggle] = useToggle(false)

    return (
        <div className="flex flex-col justify-center mt-3 cursor-pointer pl-1.5">
            <div className="flex items-center px-4 group" onClick={toggle}>

                <Icon className="mr-2 h-4 w-4" />

                <div className="flex flex-1 items-center justify-between">
                    <div
                        className="group px-1.5 text-sm  justify-center overflow-hidden items-center"
                    >
                        <span className="truncate ml-3">{label}</span>
                    </div>

                    <div

                        className="p-0.5 text-sm shrink-0 size-6"

                    >
                        <ChevronRightIcon className={cn("size-4 transition-transform", on && "rotate-90")} />
                    </div>
                </div>
            </div>
            {on && (
                <div className="space-y-1 ml-16 mt-2">
                    {children}
                </div>
            )}
        </div>
    )
}