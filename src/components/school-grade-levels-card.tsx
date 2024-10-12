import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { gradeLevelData } from "../../data/grade-levels";

interface SchoolGradeLevelsCardTableProps {
    isSystemAdmin?: boolean;
}
export const SchoolGradeLevelsCardTable = ({
    isSystemAdmin
}: SchoolGradeLevelsCardTableProps) => {
    return (
        <Card className="md:col-span-2">
            <CardHeader>
                <CardTitle>All grade levels</CardTitle>
                <CardDescription className="text-[13px]">In this section you can manage all grade levels</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-3">
                {gradeLevelData.map((gradeLevel) => (
                    <div
                        key={gradeLevel.id}
                        className="flex flex-row items-center justify-between gap-3 p-3 hover:bg-green-50"
                    >
                        <p className="flex-1 text-black">
                            {gradeLevel.gradeLevel}
                        </p>

                        {isSystemAdmin && (
                            <div className="flex gap-3 cursor-pointer">
                                <PencilIcon className="h-4 w-4 text-primary" />
                                <Trash2Icon className="h-4 w-4 text-rose-500" />
                            </div>
                        )}

                    </div>
                ))}
            </CardContent>
        </Card>
    )
}