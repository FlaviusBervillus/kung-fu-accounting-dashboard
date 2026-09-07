import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import {
  type PaymentMethod,
  type TransactionStatus,
  methodLabels,
  statusLabels,
} from "@/lib/mock-data"

const methodStyles: Record<PaymentMethod, string> = {
  stripe:
    "border-transparent bg-[oklch(0.55_0.13_265)]/12 text-[oklch(0.5_0.15_265)] dark:text-[oklch(0.75_0.12_265)]",
  especes:
    "border-transparent bg-success/12 text-success dark:text-[oklch(0.72_0.14_155)]",
  cheque:
    "border-transparent bg-[oklch(0.6_0.1_200)]/14 text-[oklch(0.48_0.11_200)] dark:text-[oklch(0.72_0.1_200)]",
  virement:
    "border-transparent bg-warning/15 text-[oklch(0.5_0.12_60)] dark:text-[oklch(0.8_0.13_65)]",
}

export function MethodBadge({ method }: { method: PaymentMethod }) {
  return (
    <Badge variant="outline" className={cn("font-medium", methodStyles[method])}>
      {methodLabels[method]}
    </Badge>
  )
}

export function StatusBadge({ status }: { status: TransactionStatus }) {
  if (status === "valide") {
    return (
      <Badge
        variant="outline"
        className="border-transparent bg-success/12 font-medium text-success dark:text-[oklch(0.72_0.14_155)]"
      >
        {statusLabels[status]}
      </Badge>
    )
  }
  if (status === "en_attente") {
    return (
      <Badge
        variant="outline"
        className="border-transparent bg-muted font-medium text-muted-foreground"
      >
        {statusLabels[status]}
      </Badge>
    )
  }
  return (
    <Badge
      variant="outline"
      className="border-transparent bg-warning/20 font-medium text-[oklch(0.45_0.12_55)] dark:text-[oklch(0.82_0.14_65)]"
    >
      {statusLabels[status]}
    </Badge>
  )
}

export function Amount({
  value,
  className,
}: {
  value: number
  className?: string
}) {
  const positive = value >= 0
  return (
    <span
      className={cn(
        "font-mono tabular-nums font-medium",
        positive
          ? "text-success dark:text-[oklch(0.74_0.14_155)]"
          : "text-destructive",
        className,
      )}
    >
      {positive ? "+" : "−"}
      {new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
      }).format(Math.abs(value))}
    </span>
  )
}
