import { SchoolClassroomCardTableSH } from "./_components/school-classroom-card-table-sh";

const SchoolHeadClassroomsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <SchoolClassroomCardTableSH />
            </main>
        </div>
    )
}

export default SchoolHeadClassroomsPage;