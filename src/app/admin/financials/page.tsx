

'use client';

import {
  DollarSign,
  CreditCard,
  Users,
  CircleDollarSign,
  ArrowUpRight,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { recentTransactions } from "@/lib/data";

const revenueVsExpensesData = [
  { month: "Apr", revenue: 45000, expenses: 32000 },
  { month: "May", revenue: 52000, expenses: 34000 },
  { month: "Jun", revenue: 55000, expenses: 36000 },
  { month: "Jul", revenue: 60000, expenses: 38000 },
];

const revenueVsExpensesConfig = {
  revenue: { label: "Revenue", color: "hsl(var(--primary))" },
  expenses: { label: "Expenses", color: "hsl(var(--secondary))" },
} satisfies ChartConfig;


const revenueByServiceData = [
  { service: "personal", value: 45, fill: "var(--color-personal)" },
  { service: "nursing", value: 30, fill: "var(--color-nursing)" },
  { service: "companion", value: 15, fill: "var(--color-companion)" },
  { service: "transport", value: 10, fill: "var(--color-transport)" },
]

const revenueByServiceConfig = {
  value: { label: "Percentage" },
  personal: { label: "Personal Care", color: "hsl(var(--chart-1))" },
  nursing: { label: "Skilled Nursing", color: "hsl(var(--chart-2))" },
  companion: { label: "Companion Care", color: "hsl(var(--chart-3))" },
  transport: { label: "Transport", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig


export default function FinancialsPage() {
    const customerTransactions = recentTransactions.filter(t => t.type === 'Invoice');
    const caregiverTransactions = recentTransactions.filter(t => t.type === 'Payroll');

    const legendFormatter = (value: string) => {
        const label = revenueVsExpensesConfig[value as keyof typeof revenueVsExpensesConfig]?.label || value;
        return <span className="text-foreground">{label}</span>;
    };
    
    const pieLegendFormatter = (value: string) => {
        const itemConfig = revenueByServiceConfig[value as keyof typeof revenueByServiceConfig];
        return <span className="text-foreground">{itemConfig?.label || value}</span>;
    };

    const pieTooltipFormatter = (value: number, name: string) => {
        const itemConfig = revenueByServiceConfig[name as keyof typeof revenueByServiceConfig];
        return (
            <div className="flex flex-col text-sm">
                <span className="font-semibold">{itemConfig?.label}</span>
                <span className="text-muted-foreground">{value}%</span>
            </div>
        )
    }

  return (
    <>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl md:text-3xl">Financials</h1>
      </div>
      
       <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue (MTD)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MUR60,000</div>
              <p className="text-xs text-muted-foreground">
                +9.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Net Profit (MTD)
              </CardTitle>
              <CircleDollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MUR22,000</div>
              <p className="text-xs text-muted-foreground">
                +12.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Accounts Receivable</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MUR15,231.89</div>
              <p className="text-xs text-muted-foreground">
                15 outstanding invoices
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payroll Expenses (MTD)</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">MUR38,000</div>
              <p className="text-xs text-muted-foreground">
                 for 45 caregivers
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
                <CardHeader>
                    <CardTitle>Revenue vs. Expenses</CardTitle>
                    <CardDescription>A look at profitability over the last four months.</CardDescription>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={revenueVsExpensesConfig} className="w-full h-[300px]">
                        <BarChart data={revenueVsExpensesData}>
                            <CartesianGrid vertical={false} />
                            <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                            <YAxis tickFormatter={(value) => `MUR${Number(value) / 1000}k`} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <ChartLegend formatter={legendFormatter} />
                            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
                            <Bar dataKey="expenses" fill="var(--color-expenses)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>

             <Card className="col-span-3">
                <CardHeader>
                    <CardTitle>Revenue by Service Type</CardTitle>
                    <CardDescription>Breakdown of revenue streams for the current month.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                     <ChartContainer config={revenueByServiceConfig} className="mx-auto aspect-square max-h-[300px]">
                        <PieChart>
                            <ChartTooltip content={<ChartTooltipContent formatter={pieTooltipFormatter} hideLabel />} />
                            <Pie data={revenueByServiceData} dataKey="value" nameKey="service">
                               {revenueByServiceData.map((entry) => (
                                 <Cell key={`cell-${entry.service}`} fill={entry.fill} />
                               ))}
                            </Pie>
                             <ChartLegend
                                content={<ChartLegendContent formatter={pieLegendFormatter} nameKey="service" />}
                                className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
                            />
                        </PieChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>

         <Card>
            <Tabs defaultValue="customer">
                 <CardHeader className="flex flex-row items-center">
                    <div className="grid gap-2">
                        <CardTitle>Recent Transactions</CardTitle>
                        <CardDescription>
                            Invoices paid and payments issued this month.
                        </CardDescription>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                         <TabsList>
                            <TabsTrigger value="customer">Customer Invoices</TabsTrigger>
                            <TabsTrigger value="caregiver">Caregiver Payroll</TabsTrigger>
                        </TabsList>
                    </div>
                </CardHeader>
                <CardContent>
                    <TabsContent value="customer">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Customer</TableHead>
                                    <TableHead>Invoice #</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {customerTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                <TableCell>
                                    <div className="font-medium">{transaction.name}</div>
                                </TableCell>
                                <TableCell>
                                    {transaction.description}
                                </TableCell>
                                <TableCell>
                                    <Badge 
                                        variant={transaction.status === 'Paid' ? 'default' : 'destructive'} 
                                        className={transaction.status === 'Pending' ? 'bg-yellow-500' : ''}
                                    >
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell className="text-right">{transaction.amount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                    <TabsContent value="caregiver">
                          <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Caregiver</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {caregiverTransactions.map((transaction) => (
                                <TableRow key={transaction.id}>
                                <TableCell>
                                    <div className="font-medium">{transaction.name}</div>
                                </TableCell>
                                <TableCell>
                                    {transaction.description}
                                </TableCell>
                                <TableCell>
                                    <Badge variant={transaction.status === 'Sent' ? 'default' : 'destructive'}>
                                        {transaction.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell className="text-right">{transaction.amount}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TabsContent>
                </CardContent>
            </Tabs>
          </Card>
    </>
  );
}
