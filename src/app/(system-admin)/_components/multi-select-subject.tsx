"use client"
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";

import { X } from "lucide-react";

import { Command as CommandPrimitive } from "cmdk";
import { useCallback, useRef, useState } from "react";

import { schoolSubjects, SchoolSubjects } from "../../../../data/teachers-data";

type MultiSelectSubjectProps = {
    value?: SchoolSubjects[];
    onChange?: (subjects: SchoolSubjects[]) => void;
    defaultValue?: SchoolSubjects[];
};

export const MultiSelectSubject = ({
    value,
    onChange,
    defaultValue = []
}: MultiSelectSubjectProps) => {
    // Use controlled or uncontrolled component pattern
    const [internalSubjects, setInternalSubjects] = useState<SchoolSubjects[]>(defaultValue);
    
    // Determine which subjects to use
    const selectedSubjects = value !== undefined ? value : internalSubjects;
    
    // Determine which set function to use
    const setSelectedSubjects = onChange || setInternalSubjects;

    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>("");

    const handleUnselect = useCallback((subject: SchoolSubjects) => {
        const newSubjects = selectedSubjects.filter((s) => s?.value !== subject?.value);
        console.log("Unselecting subject:", subject, "New Subjects:", newSubjects)
        setSelectedSubjects(newSubjects);
    }, [selectedSubjects, setSelectedSubjects]);

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;
            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newSubjects = selectedSubjects.slice(0, -1);
                        setSelectedSubjects(newSubjects);
                    }
                }
                // This is not a default behaviour of the <input /> field
                if (e.key === "Escape") {
                    input.blur();
                }
            }
        },
        [selectedSubjects, setSelectedSubjects]
    );

    const selectables = schoolSubjects.filter(
        (subject) => !selectedSubjects.some((s) => s?.value === subject.value)
    );

    return (
        <div className="grid gap-3">
            <Label htmlFor="subjects">Subjects Handling</Label>
            <Command
                onKeyDown={handleKeyDown}
                className="overflow-visible bg-transparent"
            >
                <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                    <div className="flex flex-wrap gap-1">
                        {selectedSubjects.map((subject) => {
                            return (
                                <Badge key={subject?.value} variant="secondary">
                                    {subject?.label}
                                    <button
                                        className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                        onKeyDown={(e) => {
                                            if (e.key === "Enter") {
                                                handleUnselect(subject);
                                            }
                                        }}
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onClick={() => handleUnselect(subject)}
                                    >
                                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                    </button>
                                </Badge>
                            );
                        })}
                        <CommandPrimitive.Input
                            ref={inputRef}
                            value={inputValue}
                            onValueChange={setInputValue}
                            onBlur={() => setOpen(false)}
                            onFocus={() => setOpen(true)}
                            placeholder="Select subjects..."
                            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
                        />
                    </div>
                </div>
                <div className="relative mt-2">
                    <CommandList>
                        {open && selectables.length > 0 ? (
                            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                <CommandGroup className="h-full overflow-auto">
                                    {selectables.map((subject) => {
                                        return (
                                            <CommandItem
                                                key={subject?.value}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onSelect={() => {
                                                    setInputValue("");
                                                    const newSubjects = [...selectedSubjects, subject];
                                                    console.log("Selecting subject:", subject, "New subjects:", newSubjects)
                                                    setSelectedSubjects(newSubjects);
                                                }}
                                                className={"cursor-pointer"}
                                            >
                                                {subject?.label}
                                            </CommandItem>
                                        );
                                    })}
                                </CommandGroup>
                            </div>
                        ) : null}
                    </CommandList>
                </div>
            </Command>
        </div>
    );
};