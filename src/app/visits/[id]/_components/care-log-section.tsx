'use client';

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Clock, LogIn, LogOut, Mic, FileText, MapPin } from "lucide-react";
import { CareLogSummary } from "@/components/care-log-summary";

export function CareLogSection() {
    const [clockedIn, setClockedIn] = useState(false);
    const [clockedOut, setClockedOut] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [careLog, setCareLog] = useState("");
    const [submittedLog, setSubmittedLog] = useState("");
    const [currentTime, setCurrentTime] = useState("");
    const [gpsStatus, setGpsStatus] = useState("Verifying location...");

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        // Simulate GPS check
        setTimeout(() => {
            setGpsStatus("Location verified");
        }, 2000);

        return () => clearInterval(timer);
    }, []);

    const handleClockIn = () => {
        setClockedIn(true);
    };

    const handleClockOut = () => {
        setClockedOut(true);
    };

    const handleRecord = () => {
        setIsRecording(prev => !prev);
    };

    const handleSubmitLog = () => {
        if (careLog.trim()) {
            setSubmittedLog(careLog);
            setCareLog("");
        }
    };

    const canSubmitLog = clockedIn && !clockedOut;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Time Tracking</CardTitle>
                    <CardDescription>Clock in to begin your visit and clock out when you're done.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div className="font-mono text-lg font-semibold">{currentTime}</div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="w-4 h-4" />
                            <span>{gpsStatus}</span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Button onClick={handleClockIn} disabled={clockedIn} size="lg">
                            <LogIn className="mr-2 h-4 w-4" /> Clock In
                        </Button>
                        <Button onClick={handleClockOut} disabled={!clockedIn || clockedOut} variant="destructive" size="lg">
                            <LogOut className="mr-2 h-4 w-4" /> Clock Out
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {submittedLog ? (
                <CareLogSummary careLog={submittedLog} />
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Care Log</CardTitle>
                        <CardDescription>
                            {canSubmitLog 
                                ? "Record the activities and observations from your visit."
                                : "Please clock in to submit a care log."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Textarea
                            placeholder="Enter care log details here..."
                            rows={6}
                            disabled={!canSubmitLog}
                            value={careLog}
                            onChange={(e) => setCareLog(e.target.value)}
                        />
                        <div className="flex flex-col sm:flex-row gap-2">
                             <Button 
                                variant="outline"
                                onClick={handleRecord}
                                disabled={!canSubmitLog}
                                className="w-full sm:w-auto"
                            >
                                <Mic className="mr-2 h-4 w-4" /> 
                                {isRecording ? "Stop Recording" : "Record Voice Memo"}
                            </Button>
                            <Button 
                                onClick={handleSubmitLog} 
                                disabled={!canSubmitLog || !careLog.trim()}
                                className="w-full sm:w-auto flex-grow"
                            >
                                <FileText className="mr-2 h-4 w-4" /> Submit Log
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
