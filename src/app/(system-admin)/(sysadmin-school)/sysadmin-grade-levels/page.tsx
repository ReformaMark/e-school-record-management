import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { gradeLevelData } from "../../../../../data/grade-levels";
import { PencilIcon, Trash2Icon } from "lucide-react";
import { AddGradeLevelCard } from "./_components/add-grade-level-card";

const SystemAdminGradeLevelsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

                                <div className="flex gap-3 cursor-pointer">
                                    <PencilIcon className="h-4 w-4 text-primary" />
                                    <Trash2Icon className="h-4 w-4 text-rose-500" />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>

                <AddGradeLevelCard />
            </div>
        </div>
    )
}

export default SystemAdminGradeLevelsPage;