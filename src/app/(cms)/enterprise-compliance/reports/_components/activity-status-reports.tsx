'use client';

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronRight } from "lucide-react"
import { Label } from "@/components/ui/label";
import { Area, CartesianGrid, PolarAngleAxis, XAxis } from "recharts";
import { RadialBar } from "recharts";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { AreaChart, RadialBarChart } from "recharts";
import React from "react";

const complianceData = [
  {
    id: "RegB",
    status: "Not Met",
    title: "Regulation B - Equal Credit Opportunity",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "Reg B.1", status: "Met", title: "Q1 2024 - Notification requirements and statements of specific reasons for adverse action" },
      { id: "Reg B.2", status: "Not Met", title: "Q2 2024 - Rules concerning requests for information and record retention" },
      { id: "Reg B.3", status: "Met", title: "Q3 2024 - Rules prohibiting discrimination in credit transactions" },
      { id: "Reg B.4", status: "Not Met", title: "Q4 2024 - Requirements for credit applications and evaluation procedures" }
    ]
  },
  {
    id: "RegE",
    status: "Not Met",
    title: "Regulation E - Electronic Funds Transfer",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "Reg E.1", status: "Met", title: "Q1 2024 - APR disclosure accuracy." },
      { id: "Reg E.2", status: "Not Met", title: "Q2 2024 - Advertising and marketing compliance." }
    ]
  },
  {
    id: "RegZ",
    status: "Met",
    title: "Regulation Z - Truth in Lending",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "Reg Z.1", status: "Met", title: "Q1 2024 - Disclosure of closing costs." },
      { id: "Reg Z.2", status: "Not Met", title: "Q2 2024 - Restrictions on referral fees." }
    ]
  },
  {
    id: "RegCC",
    status: "Met",
    title: "Regulation CC - Availability of Funds and Collection of Checks",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "Reg CC.1", status: "Met", title: "Q1 2024 - Disclosure of closing costs." },
      { id: "Reg CC.2", status: "Not Met", title: "Q2 2024 - Restrictions on referral fees." }
    ]
  },
  {
    id: "RegDD",
    status: "Met",
    title: "Regulation DD - Truth in Savings",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "Reg DD.1", status: "Met", title: "Q1 2024 - Disclosure of closing costs." },
      { id: "Reg DD.2", status: "Not Met", title: "Q2 2024 - Restrictions on referral fees." }
    ]
  },
  {
    id: "RESPA",
    status: "Met",
    title: "RESPA - Real Estate Settlement Procedures",
    overdue: "10 of 12",
    complete: "10 of 12",
    comments: "Comments",
    subLevels: [
      { id: "RESPA.1", status: "Met", title: "Q1 2024 - APR disclosure accuracy." },
      { id: "RESPA.2", status: "Not Met", title: "Q2 2024 - Advertising and marketing compliance." }
    ]
  }
];

const chartData = [
  { month: 'January', passed: 186, exceptions: 80 },
  { month: 'February', passed: 305, exceptions: 200 },
  { month: 'March', passed: 237, exceptions: 120 },
  { month: 'April', passed: 73, exceptions: 190 },
  { month: 'May', passed: 209, exceptions: 130 },
  { month: 'June', passed: 214, exceptions: 140 }
];

const chartConfig = {
  exceptions: {
    label: 'Exceptions',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export default function ActivityStatusReports() {
  const [regulation, setRegulation] = useState("RegB");
  const [assessment, setAssessment] = useState("All");
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({});

  const toggleRow = (id: string) => {
    setExpandedRows((prev: Record<string, boolean>) => ({ ...prev, [id]: !prev[id] }));
  };

  const radialBarChart = () => {
    return (
      <Card className="max-w-md">
          <CardContent className="flex gap-4 p-2">
            <div className="grid items-center gap-2">
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">% Complete</div>
                <p className="text-4xl font-bold">88%</p>
                
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Exercise</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  73/120
                  <span className="text-sm font-normal text-muted-foreground">
                    min
                  </span>
                </div>
              </div>
              <div className="grid flex-1 auto-rows-min gap-0.5">
                <div className="text-sm text-muted-foreground">Stand</div>
                <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none">
                  8/12
                  <span className="text-sm font-normal text-muted-foreground">
                    hr
                  </span>
                </div>
              </div>
            </div>
            <ChartContainer
              config={{
                move: {
                  label: "Move",
                  color: "hsl(var(--chart-1))"
                },
                exercise: {
                  label: "Exercise",
                  color: "hsl(var(--chart-2))"
                },
                stand: {
                  label: "Stand",
                  color: "hsl(var(--chart-3))"
                }
              }}
              className="mx-auto aspect-square w-full max-w-[80%]"
            >
              <RadialBarChart
                margin={{
                  left: -10,
                  right: -10,
                  top: -10,
                  bottom: -10
                }}
                data={[
                  {
                    activity: "stand",
                    value: (8 / 12) * 100,
                    fill: "var(--color-stand)"
                  },
                  {
                    activity: "exercise",
                    value: (46 / 60) * 100,
                    fill: "var(--color-exercise)"
                  },
                  {
                    activity: "move",
                    value: (245 / 360) * 100,
                    fill: "var(--color-move)"
                  }
                ]}
                innerRadius="20%"
                barSize={24}
                startAngle={90}
                endAngle={450}
              >
                <PolarAngleAxis
                  type="number"
                  domain={[0, 100]}
                  dataKey="value"
                  tick={false}
                />
                <RadialBar dataKey="value" background cornerRadius={5} />
              </RadialBarChart>
            </ChartContainer>
          </CardContent>
        </Card>
    )
  }

  return (
    <div className="p-2 space-y-2">
      <div className="flex gap-4 mb-4">
        <div className="space-y-1">
          <Label htmlFor="cmmc-level">Regulation Citations</Label>
          <Select onValueChange={setRegulation}>
            <SelectTrigger id="cmmc-level" className="w-96">
              <SelectValue placeholder="Select Regulation" className="truncate" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="All">All</SelectItem>
              {complianceData.map((regulation) => (
                <SelectItem key={regulation.id} value={regulation.id} className="truncate">
                  {regulation.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="cmmc-level">Assessment Name</Label>
          <Select onValueChange={setAssessment}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder="Assessment Name" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All</SelectItem>
            <SelectItem value="Assessment 1">Assessment 1</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Test / Activity Status</h3>
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">25</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Planned</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-yellow-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">18</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">In-Progress</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">32</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Complete</p>
              </div>
              <div className="text-center">
                <div className="relative mx-auto w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                  <span className="text-lg font-bold text-white">8</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">Overdue</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Control Requirements</h3>
            <div className="flex items-center gap-6 mt-2">
              <div className="relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    className="stroke-gray-100"
                    strokeWidth="20"
                    fill="none"
                  />
                  {/* Met - 60% */}
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    className="stroke-green-500"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48 * 0.6} ${2 * Math.PI * 48}`}
                    strokeDashoffset="0"
                  />
                  {/* Met with Exception - 20% */}
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    className="stroke-yellow-500"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48 * 0.2} ${2 * Math.PI * 48}`}
                    strokeDashoffset={`${-2 * Math.PI * 48 * 0.6}`}
                  />
                  {/* Not Met - 20% */}
                  <circle
                    cx="64"
                    cy="64"
                    r="48"
                    className="stroke-red-500"
                    strokeWidth="20"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 48 * 0.2} ${2 * Math.PI * 48}`}
                    strokeDashoffset={`${-2 * Math.PI * 48 * 0.8}`}
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <span className="text-2xl font-bold">80%</span>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm">Met (60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Met with Exception (20%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm">Not Met (20%)</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>


        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Exceptions</h3>
            <p className="text-2xl font-bold"></p>
            <ChartContainer config={chartConfig} className='aspect-auto h-[160px] w-full mt-2'>
              <AreaChart
                accessibilityLayer
                data={chartData}
                margin={{
                  left: 12,
                  right: 12
                }}
              >
              <CartesianGrid vertical={false} />
              <XAxis  
                dataKey='month'
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent indicator='dot' />} />

              <Area
                dataKey='exceptions'
                type='natural'
                fill='var(--color-exceptions)'
                fillOpacity={0.4}
                stroke='var(--color-exceptions)'
                stackId='a'
              />
            </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
{/* 
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold">Control Requirements</h3>
            <p className="text-2xl font-bold">83% Met</p>
            <Progress value={83} className="mt-2" />
          </CardContent>
        </Card>

        {radialBarChart()} */}

      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="min-w-12"></TableHead>
            <TableHead className="min-w-80">Regulatory Citation</TableHead>
            <TableHead className="min-w-24">Compliance Status</TableHead>
            <TableHead className="min-w-24">How many met the deadline?</TableHead>
            <TableHead className="min-w-24">Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {complianceData.map((item) => (
            <React.Fragment key={item.id}>
              <TableRow>
                <TableCell>
                  {item.subLevels.length > 0 && (
                    <button onClick={() => toggleRow(item.id)}>
                      {expandedRows[item.id] ? <ChevronDown /> : <ChevronRight />}
                    </button>
                  )}
                </TableCell>
                <TableCell className="font-bold">{item.title}</TableCell>
                <TableCell>
                  <Badge variant={item.status === "Met" ? "success" : "error"}>{item.status}</Badge>
                </TableCell>
                <TableCell>{item.overdue}</TableCell>
                <TableCell>{item.comments}</TableCell>
              </TableRow>
              {expandedRows[item.id] && item.subLevels.map((sub) => (
                <TableRow key={sub.id} className="bg-gray-100">
                  <TableCell></TableCell>
                  <TableCell className="pl-8 font-bold">{sub.title}</TableCell>
                  <TableCell>
                    <Badge variant={sub.status === "Met" ? "success" : "error"}>{sub.status}</Badge>
                  </TableCell>
                  <TableCell>Regulation sub-section</TableCell>
                  <TableCell>Comments</TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
