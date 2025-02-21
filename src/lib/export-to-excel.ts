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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToExcelSections = (data: any[], fileName: string) => {
    const exportData = data.map(item => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const classes = item.classes?.map((cls: any) => {
            // Fix: Access schedules directly from cls and handle array mapping
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const schedules = cls.schedules?.map((schedule: any) => ({
                days: Array.isArray(schedule.days) ? schedule.days.join(', ') : schedule.days,
                // Get period and room data from the database IDs
                time: schedule.schoolPeriodId, // This needs to be fetched from schoolPeriods
                room: schedule.roomId // This needs to be fetched from rooms
            })).filter(Boolean);

            return {
                subject: cls.subject?.name,
                teacher: `${cls.teacher?.lastName}, ${cls.teacher?.firstName}`,
                semester: cls.semester || 'N/A',
                track: cls.track || 'N/A',
                schedules: schedules?.map((s: { days: string; time: string; room: string }) =>
                    `${s.days} - ${s.time} - ${s.room}`
                ).join(' | ') || 'No schedule'
            };
        });

        return {
            name: item.name,
            gradeLevel: item.gradeLevel?.level,
            adviser: `${item.advisor?.lastName}, ${item.advisor?.firstName}`,
            schoolYear: item.schoolYear?.name,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            classes: classes?.map((cls: any) =>
                `Subject: ${cls.subject}\nTeacher: ${cls.teacher}\nSchedule: ${cls.schedules}`
            ).join('\n\n')
        };
    });

    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = [
        { wch: 15 }, // name
        { wch: 15 }, // gradeLevel
        { wch: 25 }, // adviser
        { wch: 15 }, // schoolYear
        { wch: 60 }, // classes
    ];

    ws['!cols'] = colWidths;

    // Enable text wrapping for the classes column
    const range = XLSX.utils.decode_range(ws['!ref'] || 'A1');
    for (let R = range.s.r; R <= range.e.r; ++R) {
        const cell = ws[XLSX.utils.encode_cell({ r: R, c: 4 })]; // column E (classes)
        if (!cell) continue;
        cell.s = { alignment: { wrapText: true, vertical: 'top' } };
    }

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sections');

    const date = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${date}.xlsx`;

    XLSX.writeFile(wb, fullFileName);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const exportToExcelStudents = (data: any[], fileName: string) => {
    const exportData = data.map(item => ({
        "LRN": item.lrn || "N/A",
        "First Name": item.firstName,
        "Middle Name": item.middleName || "",
        "Last Name": item.lastName,
        "Birth Date": new Date(item.birthDate).toLocaleDateString(),
        "Gender": item.sex,
        "Grade Level": item.enrollmentStatus === "Enrolled"
            ? item.gradeLevel
            : `${item.gradeLevelToEnroll} (For Enrollment)`,
        "Birth Place": item.birthPlace || "N/A",
        "Address": item.currentAddress?.completeAddress || "N/A",
        "Enrollment Status": item.enrollmentStatus,
        "Student Type": item.returning === "Yes"
            ? "Returning"
            : item.als === "Yes"
                ? "ALS"
                : "Regular",
        "Parent/Guardian": `${item.fatherFirstName || ""} ${item.fatherLastName || ""} / ${item.motherFirstName || ""} ${item.motherLastName || ""}`.trim(),
        "Contact": item.fatherContact || item.motherContact || item.guardianContact || "N/A",
        "School Year": item.schoolYear || "N/A"
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = [
        { wch: 15 },  // LRN
        { wch: 15 },  // First Name
        { wch: 15 },  // Middle Name
        { wch: 15 },  // Last Name
        { wch: 12 },  // Birth Date
        { wch: 10 },  // Gender
        { wch: 20 },  // Grade Level
        { wch: 20 },  // Birth Place
        { wch: 40 },  // Address
        { wch: 15 },  // Enrollment Status
        { wch: 12 },  // Student Type
        { wch: 30 },  // Parent/Guardian
        { wch: 15 },  // Contact
        { wch: 12 },  // School Year
    ];

    ws['!cols'] = colWidths;

    // Create workbook and append worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Students');

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const fullFileName = `${fileName}_${date}.xlsx`;

    // Save file
    XLSX.writeFile(wb, fullFileName);
}