import * as XLSX from 'xlsx';

type ExportData = {
    firstName: string;
    lastName: string;
    email: string;
    status: string;
    yearsOfExperience?: number;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToExcel = (data: any[], fileName: string) => {
    // Transform data to desired format
    const exportData: ExportData[] = data.map(item => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        status: item.isActive ? 'Active' : 'Inactive',
        yearsOfExperience: item.yearsOfExperience || 0
    }));

    // Create worksheet
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Set column widths
    const colWidths = [
        { wch: 15 }, // firstName
        { wch: 15 }, // lastName
        { wch: 25 }, // email
        { wch: 10 }, // status
        { wch: 20 }, // yearsOfExperience
    ];
    ws['!cols'] = colWidths;

    // Create workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Administrators');

    // Generate file name with date
    const date = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fullFileName);
}; 