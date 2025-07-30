
'use client';

import {
  Activity,
  ArrowUpRight,
  Briefcase,
  Clock,
  Star,
  Users2,
  Calendar,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart as RechartsLineChart } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link";
import { visits, clients, caregivers } from "@/lib/data";


const lineChartData = [
  { month: "January", clients: 186 },
  { month: "February", clients: 305 },
  { month: "March", clients: 237 },
  { month: "April", clients: 273 },
  { month: "May", clients: 209 },
  { month: "June", clients: 214 },
]

const lineChartConfig = {
  clients: {
    label: "Clients",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig

const barChartData = [
    { name: 'Companion', hours: 120, fill: 'var(--color-companion)' },
    { name: 'Personal', hours: 190, fill: 'var(--color-personal)' },
    { name: 'Nursing', hours: 80, fill: 'var(--color-nursing)' },
    { name: 'Transport', hours: 45, fill: 'var(--color-transport)' },
];

const barChartConfig = {
    hours: { label: 'Hours' },
    companion: { label: 'Companion Care', color: 'hsl(var(--chart-1))' },
    personal: { label: 'Personal Care', color: 'hsl(var(--chart-2))' },
    nursing: { label: 'Skilled Nursing', color: 'hsl(var(--chart-3))' },
    transport: { label: 'Transport', color: 'hsl(var(--chart-4))' },
} satisfies ChartConfig

export default function AdminDashboard() {
  const upcomingVisits = visits.filter(v => v.status === 'Upcoming' || v.status === 'In Progress').slice(0, 5);
  const availableCaregivers = caregivers.filter(c => c.status === 'Available');

  return (
    <>
        <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Active Clients
              </CardTitle>
              <Users2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{clients.length}</div>
              <p className="text-xs text-muted-foreground">
                Currently managed clients
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Caregivers
              </CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{caregivers.length}</div>
              <p className="text-xs text-muted-foreground">
                Total registered caregivers
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Hours Logged (This Month)</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">
                +180.1 since last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Client Satisfaction</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8/5</div>
              <p className="text-xs text-muted-foreground">
                Based on 25 recent reviews
              </p>
            </CardContent>
          </Card>
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
          <Card className="xl:col-span-2">
             <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Upcoming Visits</CardTitle>
                <CardDescription>
                  A summary of scheduled visits for the upcoming days.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/admin/visits">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
               <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Caregiver</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingVisits.map((visit) => (
                    <TableRow key={visit.id}>
                      <TableCell>
                        <div className="font-medium">{visit.clientName}</div>
                      </TableCell>
                       <TableCell>
                        <div className="font-medium">{visit.caregiverName}</div>
                      </TableCell>
                      <TableCell>
                        <div>{visit.date}</div>
                        <div className="text-sm text-muted-foreground">{visit.time}</div>
                      </TableCell>
                       <TableCell>
                        <Badge variant={visit.status === 'Upcoming' ? 'secondary' : 'outline'}>{visit.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Client Growth</CardTitle>
               <CardDescription>Monthly new client acquisitions.</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={lineChartConfig}>
                <RechartsLineChart
                  accessibilityLayer
                  data={lineChartData}
                  margin={{
                    left: 12,
                    right: 12,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Line
                    dataKey="clients"
                    type="natural"
                    stroke="var(--color-clients)"
                    strokeWidth={2}
                    dot={false}
                  />
                </RechartsLineChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
         <div className="grid gap-4 md:gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle>Visit Hours by Care Type</CardTitle>
                    <CardDescription>Distribution of billable hours across different service types this month.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={barChartConfig} className="w-full h-[300px]">
                        <BarChart data={barChartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                            <XAxis type="number" dataKey="hours" hide />
                            <YAxis 
                                dataKey="name" 
                                type="category"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={10}
                                width={100}
                             />
                            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="line" />} />
                            <Bar dataKey="hours" radius={5} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Caregiver Availability</CardTitle>
                    <CardDescription>Caregivers with upcoming availability for assignments.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                       {availableCaregivers.length > 0 ? (
                            availableCaregivers.map(caregiver => (
                                <div key={caregiver.id} className="flex items-center gap-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={caregiver.avatarUrl} data-ai-hint="person portrait" />
                                        <AvatarFallback>{caregiver.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                    </Avatar>
                                    <div className="flex-grow">
                                        <p className="font-medium">{caregiver.name}</p>
                                        <p className="text-sm text-muted-foreground">Available Now</p>
                                    </div>
                                    <Button variant="outline" size="sm">Assign</Button>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-muted-foreground">No caregivers are currently available.</p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
      </>
  )
}
