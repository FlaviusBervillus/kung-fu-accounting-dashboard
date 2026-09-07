"use client"

import Link from "next/link"
import { TriangleAlertIcon, ArrowRightIcon } from "lucide-react"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { backup, toCategorizeCount, hoursSince } from "@/lib/mock-data"

export function AlertBanner() {
  const backupHours = hoursSince(backup.lastBackupAt)
  const backupStale = backupHours > 48
  const hasCategorize = toCategorizeCount > 0

  if (!backupStale && !hasCategorize) return null

  const messages: string[] = []
  if (hasCategorize) {
    messages.push(
      `${toCategorizeCount} transaction${toCategorizeCount > 1 ? "s" : ""} Stripe à catégoriser`,
    )
  }
  if (backupStale) {
    messages.push(
      `dernière sauvegarde Mega il y a ${Math.round(backupHours / 24)} jours`,
    )
  }

  return (
    <Alert className="border-warning/40 bg-warning/10 [&>svg]:text-[oklch(0.55_0.15_60)] dark:[&>svg]:text-[oklch(0.8_0.14_65)]">
      <TriangleAlertIcon />
      <AlertTitle className="text-[oklch(0.42_0.12_55)] dark:text-[oklch(0.85_0.13_65)]">
        Actions requises
      </AlertTitle>
      <AlertDescription className="text-[oklch(0.45_0.08_55)] dark:text-[oklch(0.82_0.1_65)]">
        <span className="capitalize">{messages.join(" · ")}.</span>
      </AlertDescription>
      <div className="mt-2 flex flex-wrap gap-2 group-has-[>svg]/alert:col-start-2">
        {hasCategorize ? (
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            className="border-warning/40 bg-background"
            render={<Link href="/transactions?statut=a_categoriser" />}
          >
            Catégoriser
            <ArrowRightIcon data-icon="inline-end" />
          </Button>
        ) : null}
        {backupStale ? (
          <Button
            size="sm"
            variant="outline"
            nativeButton={false}
            className="border-warning/40 bg-background"
            render={<Link href="/parametres" />}
          >
            Lancer une sauvegarde
          </Button>
        ) : null}
      </div>
    </Alert>
  )
}
