
'use client';

import { visits, clients, caregivers } from "@/lib/data";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, PlusCircle, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { VisitForm } from "./_components/visit-form";

const statusVariants = {
    'Upcoming': 'secondary',
    'Completed': 'default',
    'In Progress': 'outline',
    'Cancelled': 'destructive',
} as const;

export default function AdminVisitsPage() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle>Scheduled Visits</CardTitle>
            <CardDescription>
            Manage and schedule all client visits.
            </CardDescription>
        </div>
        <VisitForm trigger={
            <Button>
                <PlusCircle />
                Schedule New Visit
            </Button>
        } />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Client</TableHead>
              <TableHead>Caregiver</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {visits.map(visit => (
                 <TableRow key={visit.id}>
                    <TableCell className="font-medium">{visit.clientName}</TableCell>
                    <TableCell>{visit.caregiverName}</TableCell>
                    <TableCell>
                        <div>{visit.date}</div>
                        <div className="text-sm text-muted-foreground">{visit.time}</div>
                    </TableCell>
                    <TableCell>
                        <Badge variant={statusVariants[visit.status]}>{visit.status}</Badge>
                    </TableCell>
                    <TableCell>
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                             <VisitForm 
                                visit={visit}
                                trigger={<DropdownMenuItem onSelect={(e) => e.preventDefault()}><Pencil/> Edit</DropdownMenuItem>}
                            />
                            <DropdownMenuItem>Reschedule</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Cancel</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
