export const roomData = [
    {
        id: "1",
        roomNumber: "101",
        estimatedCapacity: "40-50",
        roomType: "Classroom",
        roomFeatures: "Basic classroom setup with projector, whiteboard, etc.",
        //isOccupied? if yes what section has it occupied?
    },
    {
        id: "2",
        roomNumber: "102",
        estimatedCapacity: "20-30",
        roomType: "Computer Laboratory",
        roomFeatures: "Computers, Projector, TV, etc.",
    },
]

export const roomTypes = [
    "Classroom",
    "Computer Laboratory",
    "Office",
    "Auditorium",
    "Library",
    "Cafeteria",
]

export const roomColumns = [
    {
        accessorKey: "roomNumber",
        header: "Room Number",
    },
    {
        accessorKey: "estimatedCapacity",
        header: "Estimated Capacity",
    },
    {
        accessorKey: "roomType",
        header: "Room Type",
    },
    {
        accessorKey: "roomFeatures",
        header: "Room Features",
    },
]