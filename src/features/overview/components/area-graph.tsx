'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
const chartData = [
  { month: 'January', passed: 186, exceptions: 80 },
  { month: 'February', passed: 305, exceptions: 200 },
  { month: 'March', passed: 237, exceptions: 120 },
  { month: 'April', passed: 73, exceptions: 190 },
  { month: 'May', passed: 209, exceptions: 130 },
  { month: 'June', passed: 214, exceptions: 140 }
];

const chartConfig = {
  passed: {
    label: 'Passed',
    color: 'hsl(var(--chart-1))'
  },
  exceptions: {
    label: 'Exceptions',
    color: 'hsl(var(--chart-1))'
  }
} satisfies ChartConfig;

export function AreaGraph() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Area Chart - Stacked</CardTitle>
        <CardDescription>Showing total visitors for the last 6 months</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className='aspect-auto h-[310px] w-full'>
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
      <CardFooter>
        <div className='flex w-full items-start gap-2 text-sm'>
          <div className='grid gap-2'>
            <div className='flex items-center gap-2 font-medium leading-none'>
              Trending up by 5.2% this month <TrendingUp className='h-4 w-4' />
            </div>
            <div className='flex items-center gap-2 leading-none text-muted-foreground'>January - June 2024</div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
