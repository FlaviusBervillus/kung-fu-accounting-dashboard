"use client"

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { monthlyFlow } from "@/lib/mock-data"

const chartConfig = {
  entrees: { label: "Entrées", color: "var(--chart-5)" },
  sorties: { label: "Sorties", color: "var(--chart-1)" },
} satisfies ChartConfig

export function FlowChart() {
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Entrées / Sorties</CardTitle>
        <CardDescription>6 derniers mois · en euros</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <BarChart data={monthlyFlow} barGap={4}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={48}
              tickFormatter={(v) => `${v} €`}
            />
            <ChartTooltip
              content={<ChartTooltipContent />}
              cursor={{ fill: "var(--muted)", opacity: 0.4 }}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="entrees" fill="var(--color-entrees)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="sorties" fill="var(--color-sorties)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
