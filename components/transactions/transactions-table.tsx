"use client"

import { useMemo, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import {
  SearchIcon,
  MoreHorizontalIcon,
  EyeIcon,
  SparklesIcon,
  ZapIcon,
} from "lucide-react"
import { toast } from "sonner"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Empty } from "@/components/ui/empty"
import { MethodBadge, StatusBadge, Amount } from "@/components/finance-badges"
import {
  transactions as seed,
  formatDate,
  methodLabels,
  type Transaction,
} from "@/lib/mock-data"

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

const periods = [
  { value: "all", label: "Toute la saison" },
  { value: "30", label: "30 derniers jours" },
  { value: "90", label: "90 derniers jours" },
]

const categoryItems = [
  { value: "all", label: "Toutes catégories" },
  ...categories.map((c) => ({ value: c, label: c })),
]

const methodItems = [
  { value: "all", label: "Tous paiements" },
  ...Object.entries(methodLabels).map(([value, label]) => ({ value, label })),
]

const statusItems = [
  { value: "all", label: "Tous statuts" },
  { value: "valide", label: "Validé" },
  { value: "en_attente", label: "En attente" },
  { value: "a_categoriser", label: "À catégoriser" },
]

export function TransactionsTable() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [rows, setRows] = useState<Transaction[]>(seed)
  const [query, setQuery] = useState("")
  const [category, setCategory] = useState("all")
  const [method, setMethod] = useState("all")
  const [status, setStatus] = useState(searchParams.get("statut") ?? "all")
  const [period, setPeriod] = useState("all")

  const filtered = useMemo(() => {
    const now = Date.now()
    return rows.filter((t) => {
      if (query) {
        const q = query.toLowerCase()
        const hay = `${t.description} ${t.member ?? ""} ${t.id}`.toLowerCase()
        if (!hay.includes(q)) return false
      }
      if (category !== "all" && t.category !== category) return false
      if (method !== "all" && t.method !== method) return false
      if (status !== "all" && t.status !== status) return false
      if (period !== "all") {
        const days = Number(period)
        const age = (now - new Date(t.date).getTime()) / 864e5
        if (age > days) return false
      }
      return true
    })
  }, [rows, query, category, method, status, period])

  function categorize(id: string) {
    setRows((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: "valide", category: "Cotisations" }
          : t,
      ),
    )
    toast.success("Transaction catégorisée", {
      description: "Classée dans « Cotisations » et validée.",
    })
  }

  const hasFilters =
    query !== "" ||
    category !== "all" ||
    method !== "all" ||
    status !== "all" ||
    period !== "all"

  function reset() {
    setQuery("")
    setCategory("all")
    setMethod("all")
    setStatus("all")
    setPeriod("all")
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <InputGroup className="lg:max-w-xs">
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Rechercher (adhérent, description…)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </InputGroup>

        <div className="flex flex-wrap gap-2">
          <Select items={periods} value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-auto min-w-40" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {periods.map((p) => (
                  <SelectItem key={p.value} value={p.value}>
                    {p.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select items={categoryItems} value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-auto min-w-36" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {categoryItems.map((c) => (
                  <SelectItem key={c.value} value={c.value}>
                    {c.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select items={methodItems} value={method} onValueChange={setMethod}>
            <SelectTrigger className="w-auto min-w-36" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {methodItems.map((m) => (
                  <SelectItem key={m.value} value={m.value}>
                    {m.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select items={statusItems} value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-auto min-w-32" size="sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {statusItems.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={reset}>
              Réinitialiser
            </Button>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Date</TableHead>
              <TableHead>Description / Adhérent</TableHead>
              <TableHead>Paiement</TableHead>
              <TableHead>Catégorie</TableHead>
              <TableHead className="text-right">Montant</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((t) => (
              <TableRow
                key={t.id}
                className="cursor-pointer"
                onClick={() => router.push(`/transactions/${t.id}`)}
              >
                <TableCell className="whitespace-nowrap text-muted-foreground">
                  {formatDate(t.date)}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium">{t.description}</span>
                    {t.member ? (
                      <span className="text-xs text-muted-foreground">
                        {t.member}
                      </span>
                    ) : null}
                  </div>
                </TableCell>
                <TableCell>
                  <MethodBadge method={t.method} />
                </TableCell>
                <TableCell>
                  {t.status === "a_categoriser" ? (
                    <Badge
                      variant="outline"
                      className="gap-1 border-warning/40 bg-warning/15 text-[oklch(0.45_0.12_55)] dark:text-[oklch(0.82_0.14_65)]"
                    >
                      <SparklesIcon className="size-3" />
                      À catégoriser
                    </Badge>
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      {t.category}
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Amount value={t.type === "entree" ? t.amount : -t.amount} />
                </TableCell>
                <TableCell>
                  <StatusBadge status={t.status} />
                </TableCell>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  {t.status === "a_categoriser" ? (
                    <Button
                      size="sm"
                      className="h-8 gap-1"
                      onClick={() => categorize(t.id)}
                    >
                      <ZapIcon data-icon="inline-start" />
                      Classer
                    </Button>
                  ) : (
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        render={
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-8"
                            aria-label="Actions"
                          />
                        }
                      >
                        <MoreHorizontalIcon />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() =>
                              router.push(`/transactions/${t.id}`)
                            }
                          >
                            <EyeIcon />
                            Voir le détail
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() =>
                              toast.info("Justificatif téléchargé (démo).")
                            }
                          >
                            Télécharger le justificatif
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {filtered.length === 0 ? (
          <Empty className="border-0">
            <p className="text-sm text-muted-foreground">
              Aucune transaction ne correspond à ces filtres.
            </p>
            <Button variant="outline" size="sm" onClick={reset} className="mt-3">
              Réinitialiser les filtres
            </Button>
          </Empty>
        ) : null}
      </div>

      <p className="text-xs text-muted-foreground">
        {filtered.length} transaction{filtered.length > 1 ? "s" : ""} affichée
        {filtered.length > 1 ? "s" : ""} sur {rows.length}
      </p>
    </div>
  )
}
