"use client"
import { SchoolSectionCardTable } from "@/components/school-section-card-table";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FileIcon, PlusCircleIcon } from "lucide-react";
import Link from "next/link";
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { exportToExcelSections } from "@/lib/export-to-excel";

const SystemAdminSectionsPage = () => {
    const sections = useQuery(api.sections.getSections);

    const handleExport = () => {
        if (!sections) return;
        exportToExcelSections(sections, 'sections');
    };

    return (
        // <div className="flex min-h-screen w-full flex-col">
        //     <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        //         <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        //             <Card
        //                 className="xl:col-span-2"
        //             >
        //                 <CardHeader className="flex flex-row items-center">
        //                     <div className="grid gap-2">
        //                         <CardTitle>Sections</CardTitle>
        //                         <CardDescription>
        //                             View and manage sections
        //                         </CardDescription>
        //                     </div>
        //                     {/* <Button asChild size="sm" className="ml-auto gap-1">
        //                         <Link href="#">
        //                             View All
        //                             <ArrowUpRightIcon className="h-4 w-4" />
        //                         </Link>
        //                     </Button> */}
        //                 </CardHeader>
        //                 <CardContent>
        //                     <DataTable
        //                         columns={sectionColumns}
        //                         data={sectionData}
        //                         filter="sectionName"
        //                         placeholder="by section name"
        //                     />
        //                 </CardContent>
        //             </Card>

        //             <AddSectionCard />
        //         </div>
        //     </main>
        // </div>
        <div className="container mx-auto p-4">
            <main className="space-y-4">
                <div className="flex items-center">
                    <div className="ml-auto flex items-center gap-2">
                        {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilterIcon className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Current
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Old
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu> */}

                        <Button
                            size="sm"
                            variant="outline"
                            className="h-7 gap-1"
                            onClick={handleExport}
                            disabled={!sections}
                        >
                            <FileIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Export
                            </span>
                        </Button>

                        <Link
                            href="/sysadmin-sections/sysadmin-add-section"
                            className={cn("", buttonVariants({
                                variant: "default",
                                size: "sm",
                                className: "text-white h-7 gap-1 w-full p-2"
                            }))}>
                            <PlusCircleIcon className="h-3.5 w-3.5" />
                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                Add section
                            </span>
                        </Link>
                    </div>
                </div>

                <SchoolSectionCardTable />
            </main>
        </div>
    )
}

export default SystemAdminSectionsPage;