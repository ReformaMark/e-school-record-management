import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DataTable } from '@/components/data-table'
import { forImprovements, forImprovementsColumns } from './studentData'

function NeedsImprovement() {
  return (
    <div>
        <Tabs>
            <TabsList defaultValue='1st' className='space-x-3'>
                <TabsTrigger value='1st'>1st</TabsTrigger>
                <TabsTrigger value='2nd'>2nd</TabsTrigger>
                <TabsTrigger value='3rd'>3rd</TabsTrigger>
                <TabsTrigger value='4th'>4th</TabsTrigger>
            </TabsList>
            <TabsContent value="1st">
                <DataTable
                    columns={forImprovementsColumns}
                    data={forImprovements}
                    filter='fullName'
                    placeholder='by Full name'
                />
            </TabsContent>
            <TabsContent value="2nd"></TabsContent>
            <TabsContent value="3rd"></TabsContent>
            <TabsContent value="4th"></TabsContent>
        </Tabs>
    </div>
  )
}

export default NeedsImprovement