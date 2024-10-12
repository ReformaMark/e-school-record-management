import { SchoolGradeLevelsCardTable } from "@/components/school-grade-levels-card";
import { AddGradeLevelCard } from "./_components/add-grade-level-card";

const SystemAdminGradeLevelsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col p-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <SchoolGradeLevelsCardTable isSystemAdmin />

                <AddGradeLevelCard />
            </div>
        </div>
    )
}

export default SystemAdminGradeLevelsPage;