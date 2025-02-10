import { SchoolSubjectsCardTableSH } from "./_components/school-subjects-card-table-sh";

const SchoolHeadSubjectsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <SchoolSubjectsCardTableSH />
            </main>
        </div>
    )
}

export default SchoolHeadSubjectsPage;