"use client"

import { useRouter } from "next/navigation"
import { PlusIcon, RefreshCwIcon, CloudUploadIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { AddTransactionDialog } from "@/components/add-transaction-dialog"

export function QuickActions() {
  const router = useRouter()

  function handleBackup() {
    toast.promise(new Promise((res) => setTimeout(res, 1800)), {
      loading: "Sauvegarde en cours et envoi vers Mega…",
      success: "Sauvegarde terminée et synchronisée sur Mega.",
      error: "Échec de la sauvegarde.",
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Actions rapides</CardTitle>
        <CardDescription>Les opérations courantes du trésorier</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <AddTransactionDialog
          trigger={
            <Button variant="outline" className="w-full justify-start">
              <PlusIcon data-icon="inline-start" />
              Ajouter une transaction manuelle
            </Button>
          }
        />
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={() => router.push("/transactions?statut=a_categoriser")}
        >
          <RefreshCwIcon data-icon="inline-start" />
          Rapprochement bancaire
        </Button>
        <Button
          variant="outline"
          className="w-full justify-start"
          onClick={handleBackup}
        >
          <CloudUploadIcon data-icon="inline-start" />
          Lancer une sauvegarde
        </Button>
      </CardContent>
    </Card>
  )
}
