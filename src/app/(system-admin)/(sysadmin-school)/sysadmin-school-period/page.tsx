import { SchoolPeriodCardTable } from "@/components/school-period-card-table";
import { AddSchoolPeriodCard } from "./_components/add-school-period-card";

const SystemAdminSchoolPeriodPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
                    <SchoolPeriodCardTable />

                    <AddSchoolPeriodCard />
                </div>
            </main>
        </div>
    )
}

export default SystemAdminSchoolPeriodPage;