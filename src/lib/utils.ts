import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { setDate } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getSchoolYear(){
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const nextYear = currentYear + 1


  // return 2024-2025
  return `${currentYear}-${nextYear}`
}

export const updateDatePart = (month: Date, newDay: Date): Date => {
  return setDate(month, newDay.getDate());
};