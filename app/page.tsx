import { AlertBanner } from "@/components/dashboard/alert-banner"
import { BalanceCards } from "@/components/dashboard/balance-cards"
import { FlowChart } from "@/components/dashboard/flow-chart"
import { ExpenseChart } from "@/components/dashboard/expense-chart"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { CLUB } from "@/lib/mock-data"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <p className="text-sm text-muted-foreground">
          Bonjour, voici l&apos;état des comptes du club
        </p>
        <h2 className="text-2xl font-semibold tracking-tight">{CLUB.name}</h2>
      </div>

      <AlertBanner />
      <BalanceCards />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <FlowChart />
        </div>
        <QuickActions />
      </div>

      <ExpenseChart />
    </div>
  )
}
