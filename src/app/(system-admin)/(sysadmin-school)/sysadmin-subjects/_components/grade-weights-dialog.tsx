import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Doc } from "../../../../../../convex/_generated/dataModel";

interface GradeWeightsDialogProps {
    open: boolean;
    onClose: () => void;
    subject: Doc<"subjects"> | null;
}

export const GradeWeightsDialog = ({ open, onClose, subject }: GradeWeightsDialogProps) => {
    if (!subject) return null;

    const {
        // isMapeh, mapehWeights,
        gradeWeights, name } = subject;

    // const components = ["music", "arts", "pe", "health"] as const;

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Grade Weights - {name}</DialogTitle>
                </DialogHeader>
                <ScrollArea className="max-h-[600px] pr-4">
                    {/* {isMapeh && mapehWeights ? (
                        <div className="grid grid-cols-2 gap-4">
                            {components.map((component) => (
                                <Card key={component}>
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold capitalize mb-4">{component}</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span>Written:</span>
                                                <span className="font-medium">{mapehWeights[component].written}%</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>Performance:</span>
                                                <span className="font-medium">{mapehWeights[component].performance}%</span>
                                            </div>

                                            {mapehWeights[component].exam && (
                                                <div className="flex justify-between">
                                                    <span>Exam:</span>
                                                    <span className="font-medium">{mapehWeights[component].exam}%</span>
                                                </div>
                                            )}
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : ( */}
                    <Card>
                        <CardContent className="pt-6">
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>Written:</span>
                                    <span className="font-medium">{gradeWeights?.written}%</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Performance:</span>
                                    <span className="font-medium">{gradeWeights?.performance}%</span>
                                </div>
                                {gradeWeights?.exam && (
                                    <div className="flex justify-between">
                                        <span>Exam:</span>
                                        <span className="font-medium">{gradeWeights.exam}%</span>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                    {/* )} */}
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
};