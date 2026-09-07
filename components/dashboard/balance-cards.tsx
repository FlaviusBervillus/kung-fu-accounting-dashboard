import {
  BanknoteIcon,
  LandmarkIcon,
  ScaleIcon,
  CheckCircle2Icon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { balances, formatEuro, formatDate } from "@/lib/mock-data"

export function BalanceCards() {
  const ecart = balances.ecart
  const balanced = Math.abs(ecart) < 0.01

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <BanknoteIcon className="size-4" />
            Solde comptable
          </CardDescription>
          <CardTitle className="font-mono text-3xl tabular-nums">
            {formatEuro(balances.comptable)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Calculé depuis le journal des écritures
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <LandmarkIcon className="size-4" />
            Solde bancaire réel
          </CardDescription>
          <CardTitle className="font-mono text-3xl tabular-nums">
            {formatEuro(balances.bancaire)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            Synchronisé via GoCardless · {formatDate(balances.lastReconciliation)}
          </p>
        </CardContent>
      </Card>

      <Card
        className={cn(
          "border-2",
          balanced
            ? "border-success/40 bg-success/5"
            : "border-destructive/40 bg-destructive/5",
        )}
      >
        <CardHeader>
          <CardDescription className="flex items-center gap-2">
            <ScaleIcon className="size-4" />
            Écart de solde
          </CardDescription>
          <CardTitle
            className={cn(
              "flex items-center gap-2 font-mono text-3xl tabular-nums",
              balanced
                ? "text-success dark:text-[oklch(0.74_0.14_155)]"
                : "text-destructive",
            )}
          >
            {balanced ? "0,00 €" : formatEuro(ecart, { signed: true })}
            {balanced ? <CheckCircle2Icon className="size-6" /> : null}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-muted-foreground">
            {balanced
              ? "Comptabilité et banque rapprochées"
              : "Rapprochement bancaire nécessaire"}
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
