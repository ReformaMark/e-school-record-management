import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { roomColumns, roomData } from "../../data/room-data";

export const SchoolClassroomCardTable = () => {
    return (
        <Card
            className="xl:col-span-2"
        >
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>Classrooms</CardTitle>
                    <CardDescription>
                        View and manage rooms
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    {/* <Link href="#">
                                    View All
                                    <ArrowUpRightIcon className="h-4 w-4" />
                                </Link> */}
                </Button>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={roomColumns}
                    data={roomData}
                    filter="roomNumber"
                    placeholder="by room number"
                />
            </CardContent>
        </Card>
    )
}