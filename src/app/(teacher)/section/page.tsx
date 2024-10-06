
import { DataTable } from '@/components/data-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import { sectionColumns, sections } from '../../../../data/section-data'


function SectionPage() {
  return (
    <div className='p-5 bg-white shadow-md m-5'>
        
        <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
                <CardTitle>Sections</CardTitle>
                <CardDescription>Manage the list of sections.</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable
                    columns={sectionColumns}
                    data={sections}
                    filter="section"
                    placeholder="section by section name"
                    
                />
            </CardContent>
        </Card>
        
    </div>
  )
}

export default SectionPage