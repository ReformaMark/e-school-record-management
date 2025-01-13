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

export const getAge = (birthDate: string) =>{
    const currentDate = new Date()
      //get age
    const bDate = new Date(birthDate);
    let age = 0
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();
    age = currentYear - bDate.getFullYear()
    const isBirthMoth = currentMonth ===( bDate.getMonth() + 1)
    const isBirthDay = currentDay >=  bDate.getDate()

    if(isBirthMoth && isBirthDay){
        age += 1
    }
  return age
}