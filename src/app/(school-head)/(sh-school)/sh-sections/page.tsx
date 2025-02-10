import { SchoolSectionCardTableSH } from "./_components/school-section-card-table-sh";

const SchoolHeadSectionsPage = () => {
    return (
        <div className="flex min-h-screen w-full flex-col">
            <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
                <SchoolSectionCardTableSH />
            </main>
        </div>
    )
}

export default SchoolHeadSectionsPage;