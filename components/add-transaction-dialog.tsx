"use client"

import { useState } from "react"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group"

const categories = [
  "Cotisations",
  "Licences",
  "Équipements",
  "Location salle",
  "Compétitions",
  "Subventions",
  "Assurance",
  "Stages & événements",
  "Frais bancaires",
]

const methods = [
  { value: "especes", label: "Espèces" },
  { value: "cheque", label: "Chèque" },
  { value: "virement", label: "Virement" },
  { value: "stripe", label: "Stripe" },
]

export function AddTransactionDialog({
  trigger,
}: {
  trigger?: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState("entree")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    toast.success("Transaction enregistrée", {
      description: "L'écriture a été ajoutée au journal comptable.",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          trigger ? (
            (trigger as React.ReactElement)
          ) : (
            <Button>
              <PlusIcon data-icon="inline-start" />
              Ajouter une transaction
            </Button>
          )
        }
      />
      <DialogContent className="sm:max-w-lg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Nouvelle transaction manuelle</DialogTitle>
            <DialogDescription>
              Saisissez une écriture comptable pour le journal du club.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup className="py-4">
            <Field>
              <FieldLabel>Sens de l&apos;opération</FieldLabel>
              <ToggleGroup
                value={[type]}
                onValueChange={(v) => v[0] && setType(v[0])}
                className="w-full"
              >
                <ToggleGroupItem value="entree" className="flex-1">
                  Entrée
                </ToggleGroupItem>
                <ToggleGroupItem value="sortie" className="flex-1">
                  Sortie
                </ToggleGroupItem>
              </ToggleGroup>
            </Field>

            <Field>
              <FieldLabel htmlFor="tx-desc">Description</FieldLabel>
              <Input
                id="tx-desc"
                placeholder="Ex. Cotisation annuelle — Jean Dupont"
                required
              />
            </Field>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel htmlFor="tx-amount">Montant (€)</FieldLabel>
                <Input
                  id="tx-amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0,00"
                  required
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="tx-date">Date</FieldLabel>
                <Input id="tx-date" type="date" required />
              </Field>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Field>
                <FieldLabel>Catégorie</FieldLabel>
                <Select defaultValue="Cotisations">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c}>
                          {c}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <FieldLabel>Moyen de paiement</FieldLabel>
                <Select items={methods} defaultValue="especes">
                  <SelectTrigger>
                    <SelectValue placeholder="Choisir" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {methods.map((m) => (
                        <SelectItem key={m.value} value={m.value}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </Field>
            </div>

            <Field>
              <FieldLabel htmlFor="tx-member">Adhérent lié (optionnel)</FieldLabel>
              <Input id="tx-member" placeholder="Nom de l'adhérent" />
              <FieldDescription>
                Rattachez l&apos;écriture à un adhérent pour le suivi des cotisations.
              </FieldDescription>
            </Field>
          </FieldGroup>

          <DialogFooter>
            <DialogClose render={<Button variant="outline">Annuler</Button>} />
            <Button type="submit">Enregistrer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
