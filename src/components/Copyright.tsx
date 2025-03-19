import React from 'react'

function Copyright() {
    const date = new Date()
    const year = date.getFullYear()
    return (
        <div className='flex items-center justify-center text-muted-foreground mt-10'>Copyright © {year} Electronic Record Management System (ERMS). All rights reserved.</div>
    )
}

export default Copyright