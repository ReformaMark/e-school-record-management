"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useConvexMutation } from "@convex-dev/react-query";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "convex/react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { BiLeftArrow } from "react-icons/bi";
import { toast } from "sonner";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { AddScheduleModal } from "../../_components/add-schedule-modal";
import { Trash } from "lucide-react";

const AddClassToSectionPage = () => {
    const params = useParams();
    const router = useRouter();
    const sectionId = params.sectionId as Id<"sections">;

    const [formData, setFormData] = useState({
        subjectId: "" as Id<"subjects">,
        teacherId: "" as Id<"users">,
        semester: "",
        track: "",
        schedules: [] as Array<{
            days: string[];
            schoolPeriodId: Id<"schoolPeriods">;
            roomId: Id<"rooms">;
        }>
    });

    // Queries
    const section = useQuery(api.sections.getSections);
    const currentSection = section?.find(s => s._id === sectionId);
    const teachers = useQuery(api.users.getTeachers);
    const subjects = useQuery(api.subjects.getSubjects);
    const classes = useQuery(api.classes.getClassesBySection, { sectionId });
    const schoolPeriods = useQuery(api.schoolPeriod.get);
    const rooms = useQuery(api.classroom.getAvailableRooms);

    const filteredSubjects = subjects?.filter(
        subject => subject.gradeLevelId === currentSection?.gradeLevelId
    );

    const availableSubjects = filteredSubjects?.filter(subject => {
        const isSubjectAssigned = classes?.some(
            classItem => classItem.subjectId === subject._id
        );
        return !isSubjectAssigned;
    });

    const isSHS = currentSection?.gradeLevel?.level.includes("11") ||
        currentSection?.gradeLevel?.level.includes("12");

    // Mutation
    const { mutate: addClass, isPending } = useMutation({
        mutationFn: useConvexMutation(api.sections.addClassToSection),
        onSuccess: () => {
            toast.success("Class added successfully");
            setFormData({
                subjectId: "" as Id<"subjects">,
                teacherId: "" as Id<"users">,
                semester: "",
                track: "",
                schedules: [],
            });
        },
        onError: (error) => {
            toast.error(error.message);
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!sectionId) return;

        // Validate required fields
        if (!formData.subjectId || !formData.teacherId) {
            toast.error("Please fill in all required fields");
            return;
        }

        // Validate SHS specific fields
        if (isSHS && (!formData.semester || !formData.track)) {
            toast.error("Please select semester and track for SHS classes");
            return;
        }

        // Validate at least one schedule
        if (formData.schedules.length === 0) {
            toast.error("Please add at least one schedule");
            return;
        }

        addClass({
            sectionId,
            subjectId: formData.subjectId,
            teacherId: formData.teacherId,
            semester: formData.semester,
            track: formData.track,
            schedules: formData.schedules.map(schedule => ({
                days: schedule.days,
                schoolPeriodId: schedule.schoolPeriodId,
                roomId: schedule.roomId
            }))
        });
    };

    const handleScheduleAdd = (schedule: {
        days: string[];
        schoolPeriodId: string;
        roomId: string;
    }) => {
        setFormData(prev => ({
            ...prev,
            schedules: [...prev.schedules, {
                days: schedule.days,
                schoolPeriodId: schedule.schoolPeriodId as Id<"schoolPeriods">,
                roomId: schedule.roomId as Id<"rooms">
            }]
        }));
    };

    if (!currentSection) return <div>Section not found</div>;

    return (
        <div className="container mx-auto p-4">
            <Button onClick={() => router.back()} className="mb-4 text-black flex flex-row gap-2" variant="ghost">
                <BiLeftArrow className="w-5 h-5" />
                Go Back
            </Button>
            <Card>
                <CardHeader>
                    <CardTitle>Add Class to {currentSection.name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid gap-4">
                            <div className="grid gap-2">
                                <Label>Subject</Label>
                                <Select
                                    onValueChange={(value: Id<"subjects">) =>
                                        setFormData(prev => ({ ...prev, subjectId: value }))
                                    }
                                    value={formData.subjectId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={
                                            availableSubjects?.length === 0
                                                ? "No available subjects"
                                                : "Select subject"
                                        } />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {availableSubjects?.length === 0 ? (
                                            <SelectItem disabled value="none">
                                                All subjects are already assigned
                                            </SelectItem>
                                        ) : (
                                            availableSubjects?.map((subject) => (
                                                <SelectItem key={subject._id} value={subject._id}>
                                                    {subject.name}
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid gap-2">
                                <Label>Teacher</Label>
                                <Select
                                    onValueChange={(value: Id<"users">) =>
                                        setFormData(prev => ({ ...prev, teacherId: value }))
                                    }
                                    value={formData.teacherId}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select teacher" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teachers?.map((teacher) => (
                                            <SelectItem key={teacher.id} value={teacher.id}>
                                                {teacher.lastName}, {teacher.firstName}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {isSHS && (
                                <>
                                    <div className="grid gap-2">
                                        <Label>Semester</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setFormData(prev => ({ ...prev, semester: value }))
                                            }
                                            value={formData.semester}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="1st">1st Semester</SelectItem>
                                                <SelectItem value="2nd">2nd Semester</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="grid gap-2">
                                        <Label>Track</Label>
                                        <Select
                                            onValueChange={(value) =>
                                                setFormData(prev => ({ ...prev, track: value }))
                                            }
                                            value={formData.track}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select track" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="core">Core Subject (All Track)</SelectItem>
                                                <SelectItem value="academic">Academic Track</SelectItem>
                                                <SelectItem value="immersion">Work Immersion/Culminating Activity</SelectItem>
                                                <SelectItem value="tvl">TVL Track</SelectItem>
                                                <SelectItem value="sports">Sports Track</SelectItem>
                                                <SelectItem value="arts">Arts and Design Track</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </>
                            )}

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <Label>Schedules</Label>
                                    <AddScheduleModal
                                        onScheduleAdd={handleScheduleAdd}
                                        schoolPeriods={schoolPeriods || []}
                                        rooms={rooms || []}
                                    />
                                </div>

                                {/* Display added schedules */}
                                <div className="space-y-2">
                                    {formData.schedules.map((schedule, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between p-2 bg-gray-50 rounded-md"
                                        >
                                            <div className="space-y-1">
                                                <div className="text-sm font-medium">
                                                    {schedule.days.join(", ")}
                                                </div>
                                                <div className="text-sm text-muted-foreground">
                                                    {schoolPeriods?.find(p => p._id === schedule.schoolPeriodId)?.timeRange} |
                                                    {rooms?.find(r => r._id === schedule.roomId)?.name}
                                                </div>
                                            </div>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    setFormData(prev => ({
                                                        ...prev,
                                                        schedules: prev.schedules.filter((_, i) => i !== index)
                                                    }));
                                                }}
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <Button type="submit" disabled={isPending} className="text-white">
                            {isPending ? "Adding..." : "Add Class"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default AddClassToSectionPage;