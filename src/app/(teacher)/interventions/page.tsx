
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import React from 'react'

function InterventionsPage() {
  return (
    <div className='m-6 bg-white p-5'>
        Interventions for Students who has 80 and below grades.
        <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger >
                        
                    </AccordionTrigger>
                    <AccordionContent className='pl-10'>
                        
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
    </div>
  )
}

export default InterventionsPage