"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

export const ComplaintsCard = () => {
    const [selectedComplaint, setSelectedComplaint] = useState<{ id: number; parent: string; subject: string; status: string; date: string; } | null>(null);

    const complaints = [
        { id: 1, parent: "John Doe", subject: "Bullying Incident", status: "New", date: "2023-05-15" },
        { id: 2, parent: "Jane Smith", subject: "Curriculum Concern", status: "In Progress", date: "2023-05-14" },
        { id: 3, parent: "Mike Johnson", subject: "Facility Issue", status: "Resolved", date: "2023-05-13" },
    ]
    return (
        <>
            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle className="text-green-800">Recent Complaints</CardTitle>
                    <CardDescription>Click on a complaint to respond</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        {complaints.map((complaint) => (
                            <li
                                key={complaint.id}
                                className="flex items-center justify-between p-3 bg-white rounded-lg shadow cursor-pointer hover:bg-green-100 transition-colors"
                                onClick={() => setSelectedComplaint(complaint)}
                            >
                                <div className="flex items-center space-x-3">
                                    <Avatar>
                                        <AvatarImage src={`/placeholder.svg?height=40&width=40`} alt={complaint.parent} />
                                        <AvatarFallback>{complaint.parent.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-green-800">{complaint.subject}</p>
                                        <p className="text-sm text-green-600">{complaint.parent}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className={`px-2 py-1 text-xs rounded-full ${complaint.status === 'New' ? 'bg-red-100 text-red-800' :
                                        complaint.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-green-100 text-green-800'
                                        }`}>
                                        {complaint.status}
                                    </span>
                                    <span className="text-sm text-green-600">{complaint.date}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="col-span-1">
                <CardHeader>
                    <CardTitle className="text-green-800">Respond to Complaint</CardTitle>
                    <CardDescription>Provide a thoughtful response to the selected complaint</CardDescription>
                </CardHeader>
                <CardContent>
                    {selectedComplaint ? (
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-800">Complaint Subject</label>
                                <Input value={selectedComplaint.subject} readOnly className="bg-green-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-800">Parent</label>
                                <Input value={selectedComplaint.parent} readOnly className="bg-green-50" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-800">Status</label>
                                <Select defaultValue={selectedComplaint.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="New">New</SelectItem>
                                        <SelectItem value="In Progress">In Progress</SelectItem>
                                        <SelectItem value="Resolved">Resolved</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-green-800">Your Response</label>
                                <Textarea placeholder="Type your response here..." className="h-32" />
                            </div>
                            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Send Response</Button>
                        </form>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-64 text-green-600">
                            <AlertCircleIcon className="h-12 w-12 mb-4" />
                            <p className="text-lg font-medium">Select a complaint to respond</p>
                        </div>
                    )}
                </CardContent>
            </Card>
        </>
    )
}