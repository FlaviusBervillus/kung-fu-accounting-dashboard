import { Suspense } from "react"

import { AddTransactionDialog } from "@/components/add-transaction-dialog"
import { TransactionsTable } from "@/components/transactions/transactions-table"
import { Skeleton } from "@/components/ui/skeleton"

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-semibold tracking-tight">
            Liste des transactions
          </h2>
          <p className="text-sm text-muted-foreground">
            Journal des écritures du club, imports Stripe et saisies manuelles.
          </p>
        </div>
        <AddTransactionDialog />
      </div>

      <Suspense fallback={<Skeleton className="h-96 w-full" />}>
        <TransactionsTable />
      </Suspense>
    </div>
  )
}
