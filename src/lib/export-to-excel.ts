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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToExcelTeachers = (data: any[], fileName: string) => {
    const exportData: ExportData[] = data.map(item => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        status: item.isActive ? 'Active' : 'Inactive',
        position: item.position,
        specialization: item.specialization,
        advisoryClass: item.advisoryClass,
        employeeId: item.employeeId,
        contactNumber: item.contactNumber,
        gender: item.gender,
        yearsOfExperience: item.yearsOfExperience,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = [
        { wch: 15 }, // firstName
        { wch: 15 }, // lastName
        { wch: 25 }, // email
        { wch: 10 }, // status
        { wch: 20 }, // position
        { wch: 20 }, // specialization
        { wch: 20 }, // advisoryClass
        { wch: 20 }, // employeeId
        { wch: 20 }, // contactNumber
        { wch: 20 }, // gender
        { wch: 20 }, // yearsOfExperience
    ];

    ws['!cols'] = colWidths;

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Teachers');

    const date = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${date}.xlsx`;

    XLSX.writeFile(wb, fullFileName);
}
