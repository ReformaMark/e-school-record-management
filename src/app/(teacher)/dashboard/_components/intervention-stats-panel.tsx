"use client"

import { Card } from "@/components/ui/card"

interface InterventionStatsProps {
    stats: {
        totalInterventions: number;
        averageImprovement: number;
        successRate: number;
        mostUsedInterventions: string[];
    }
}

export function InterventionStatsPanel({ stats }: InterventionStatsProps) {
    return (
        <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
            <Card className="p-3">
                <div className="text-sm font-medium text-muted-foreground">
                    Total Interventions
                </div>
                <div className="text-2xl font-bold">{stats.totalInterventions}</div>
            </Card>
            <Card className="p-3">
                <div className="text-sm font-medium text-muted-foreground">
                    Average Improvement
                </div>
                <div className="text-2xl font-bold">
                    {stats.averageImprovement.toFixed(1)}%
                </div>
            </Card>
            <Card className="p-3">
                <div className="text-sm font-medium text-muted-foreground">
                    Success Rate
                </div>
                <div className="text-2xl font-bold">
                    {stats.successRate.toFixed(1)}%
                </div>
            </Card>
            <Card className="p-3">
                <div className="text-sm font-medium text-muted-foreground">
                    Common Interventions
                </div>
                <div className="text-sm">
                    {stats.mostUsedInterventions.join(", ")}
                </div>
            </Card>
        </div>
    )
}