'use client';

import * as React from 'react';
import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

export const description = 'An interactive bar chart';

const chartData = [
  { date: '2024-04-01', passed: 222, exceptions: 150 },
  { date: '2024-04-02', passed: 97, exceptions: 180 },
  { date: '2024-04-03', passed: 167, exceptions: 120 },
  { date: '2024-04-04', passed: 242, exceptions: 260 },
  { date: '2024-04-05', passed: 373, exceptions: 290 },
  { date: '2024-04-06', passed: 301, exceptions: 340 },
  { date: '2024-04-07', passed: 245, exceptions: 180 },
  { date: '2024-04-08', passed: 409, exceptions: 320 },
  { date: '2024-04-09', passed: 59, exceptions: 110 },
  { date: '2024-04-10', passed: 261, exceptions: 190 },
  { date: '2024-04-11', passed: 327, exceptions: 350 },
  { date: '2024-04-12', passed: 292, exceptions: 210 },
  { date: '2024-04-13', passed: 342, exceptions: 380 },
  { date: '2024-04-14', passed: 137, exceptions: 220 },
  { date: '2024-04-15', passed: 120, exceptions: 170 },
  { date: '2024-04-16', passed: 138, exceptions: 190 },
  { date: '2024-04-17', passed: 446, exceptions: 360 },
  { date: '2024-04-18', passed: 364, exceptions: 410 },
  { date: '2024-04-19', passed: 243, exceptions: 180 },
  { date: '2024-04-20', passed: 89, exceptions: 150 },
  { date: '2024-04-21', passed: 137, exceptions: 200 },
  { date: '2024-04-22', passed: 224, exceptions: 170 },
  { date: '2024-04-23', passed: 138, exceptions: 230 },
  { date: '2024-04-24', passed: 387, exceptions: 290 },
  { date: '2024-04-25', passed: 215, exceptions: 250 },
  { date: '2024-04-26', passed: 75, exceptions: 130 },
  { date: '2024-04-27', passed: 383, exceptions: 420 },
  { date: '2024-04-28', passed: 122, exceptions: 180 },
  { date: '2024-04-29', passed: 315, exceptions: 240 },
  { date: '2024-04-30', passed: 454, exceptions: 380 },
  { date: '2024-05-01', passed: 165, exceptions: 220 },
  { date: '2024-05-02', passed: 293, exceptions: 310 },
  { date: '2024-05-03', passed: 247, exceptions: 190 },
  { date: '2024-05-04', passed: 385, exceptions: 420 },
  { date: '2024-05-05', passed: 481, exceptions: 390 },
  { date: '2024-05-06', passed: 498, exceptions: 520 },
  { date: '2024-05-07', passed: 388, exceptions: 300 },
  { date: '2024-05-08', passed: 149, exceptions: 210 },
  { date: '2024-05-09', passed: 227, exceptions: 180 },
  { date: '2024-05-10', passed: 293, exceptions: 330 },
  { date: '2024-05-11', passed: 335, exceptions: 270 },
  { date: '2024-05-12', passed: 197, exceptions: 240 },
  { date: '2024-05-13', passed: 197, exceptions: 160 },
  { date: '2024-05-14', passed: 448, exceptions: 490 },
  { date: '2024-05-15', passed: 473, exceptions: 380 },
  { date: '2024-05-16', passed: 338, exceptions: 400 },
  { date: '2024-05-17', passed: 499, exceptions: 420 },
  { date: '2024-05-18', passed: 315, exceptions: 350 },
  { date: '2024-05-19', passed: 235, exceptions: 180 },
  { date: '2024-05-20', passed: 177, exceptions: 230 },
  { date: '2024-05-21', passed: 82, exceptions: 140 },
  { date: '2024-05-22', passed: 81, exceptions: 120 },
  { date: '2024-05-23', passed: 252, exceptions: 290 },
  { date: '2024-05-24', passed: 294, exceptions: 220 },
  { date: '2024-05-25', passed: 201, exceptions: 250 },
  { date: '2024-05-26', passed: 213, exceptions: 170 },
  { date: '2024-05-27', passed: 420, exceptions: 460 },
  { date: '2024-05-28', passed: 233, exceptions: 190 },
  { date: '2024-05-29', passed: 78, exceptions: 130 },
  { date: '2024-05-30', passed: 340, exceptions: 280 },
  { date: '2024-05-31', passed: 178, exceptions: 230 },
  { date: '2024-06-01', passed: 178, exceptions: 200 },
  { date: '2024-06-02', passed: 470, exceptions: 410 },
  { date: '2024-06-03', passed: 103, exceptions: 160 },
  { date: '2024-06-04', passed: 439, exceptions: 380 },
  { date: '2024-06-05', passed: 88, exceptions: 140 },
  { date: '2024-06-06', passed: 294, exceptions: 250 },
  { date: '2024-06-07', passed: 323, exceptions: 370 },
  { date: '2024-06-08', passed: 385, exceptions: 320 },
  { date: '2024-06-09', passed: 438, exceptions: 480 },
  { date: '2024-06-10', passed: 155, exceptions: 200 },
  { date: '2024-06-11', passed: 92, exceptions: 150 },
  { date: '2024-06-12', passed: 492, exceptions: 420 },
  { date: '2024-06-13', passed: 81, exceptions: 130 },
  { date: '2024-06-14', passed: 426, exceptions: 380 },
  { date: '2024-06-15', passed: 307, exceptions: 350 },
  { date: '2024-06-16', passed: 371, exceptions: 310 },
  { date: '2024-06-17', passed: 475, exceptions: 520 },
  { date: '2024-06-18', passed: 107, exceptions: 170 },
  { date: '2024-06-19', passed: 341, exceptions: 290 },
  { date: '2024-06-20', passed: 408, exceptions: 450 },
  { date: '2024-06-21', passed: 169, exceptions: 210 },
  { date: '2024-06-22', passed: 317, exceptions: 270 },
  { date: '2024-06-23', passed: 480, exceptions: 530 },
  { date: '2024-06-24', passed: 132, exceptions: 180 },
  { date: '2024-06-25', passed: 141, exceptions: 190 },
  { date: '2024-06-26', passed: 434, exceptions: 380 },
  { date: '2024-06-27', passed: 448, exceptions: 490 },
  { date: '2024-06-28', passed: 149, exceptions: 200 },
  { date: '2024-06-29', passed: 103, exceptions: 160 },
  { date: '2024-06-30', passed: 446, exceptions: 400 }
];

const chartConfig = {
  views: {
    label: 'Page Views'
  },
  passed: {
    label: 'Passed',
    color: 'hsl(var(--chart-1))'
  },
  exceptions: {
    label: 'Exceptions',
    color: 'hsl(var(--chart-2))'
  },
  error: {
    label: 'Error',
    color: 'hsl(var(--chart-2))'
  }
} satisfies ChartConfig;

export function BarGraph() {
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>('passed');

  const total = React.useMemo(
    () => ({
      passed: chartData.reduce((acc, curr) => acc + curr.passed, 0),
      exceptions: chartData.reduce((acc, curr) => acc + curr.exceptions, 0)
    }),
    []
  );

  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  React.useEffect(() => {
    if (activeChart === 'error') {
      throw new Error('Mocking Error');
    }
  }, [activeChart]);

  if (!isClient) {
    return null;
  }

  return (
    <Card>
      <CardHeader className='flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6'>
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>Showing total visitors for the last 3 months</CardDescription>
        </div>
        <div className='flex'>
          {['passed', 'exceptions', 'error'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            if (!chart || total[key as keyof typeof total] === 0) return null;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='relative flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>{chartConfig[chart].label}</span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {total[key as keyof typeof total]?.toLocaleString()}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer config={chartConfig} className='aspect-auto h-[280px] w-full'>
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric'
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className='w-[150px]'
                  nameKey='views'
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
