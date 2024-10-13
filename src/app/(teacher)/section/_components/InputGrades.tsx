import React from 'react'
import { InputGradesCol, studentsData } from './studentData'
import { DataTable } from '@/components/data-table';
import ClassRecordDialog from './ClassRecordDialog';
import { sections } from '../section-data';

function InputGrades({sec}:{sec:string}) {
    const males = studentsData
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
        const section = sections.find((section)=> section.section === sec)
  return (
    <div>
        <ClassRecordDialog subject={section ? section.subject : ''} gradeLevel={section ? section.gradeLevel : ''}/>
        <DataTable
            columns={InputGradesCol}
            data={males}
            filter='fullName'
            placeholder='by Full Name'
        />
    </div>
  )
}

export default InputGrades