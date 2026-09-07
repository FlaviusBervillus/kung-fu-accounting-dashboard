import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ArrowLeftIcon,
  ArrowDownLeftIcon,
  ArrowUpRightIcon,
  CalendarIcon,
  TagIcon,
  UserIcon,
  FileTextIcon,
  ImageIcon,
  DownloadIcon,
  CreditCardIcon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { MethodBadge, StatusBadge, Amount } from "@/components/finance-badges"
import { getTransaction, formatDate, formatEuro } from "@/lib/mock-data"

export default async function TransactionDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const tx = getTransaction(id)
  if (!tx) notFound()

  const signed = tx.type === "entree" ? tx.amount : -tx.amount

  return (
    <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit -ml-2 text-muted-foreground"
        nativeButton={false}
        render={<Link href="/transactions" />}
      >
        <ArrowLeftIcon data-icon="inline-start" />
        Retour aux transactions
      </Button>

      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-muted-foreground">
              {tx.id}
            </span>
            <StatusBadge status={tx.status} />
          </div>
          <h2 className="text-2xl font-semibold tracking-tight">
            {tx.description}
          </h2>
        </div>
        <Amount value={signed} className="text-3xl" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Métadonnées</CardTitle>
            <CardDescription>Informations comptables</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-0">
            <MetaRow icon={CalendarIcon} label="Date">
              {formatDate(tx.date, true)}
            </MetaRow>
            <Separator />
            <MetaRow
              icon={tx.type === "entree" ? ArrowDownLeftIcon : ArrowUpRightIcon}
              label="Sens"
            >
              {tx.type === "entree" ? "Entrée (recette)" : "Sortie (dépense)"}
            </MetaRow>
            <Separator />
            <MetaRow icon={CreditCardIcon} label="Montant exact">
              <span className="font-mono tabular-nums">
                {formatEuro(tx.amount)}
              </span>
            </MetaRow>
            <Separator />
            <MetaRow icon={TagIcon} label="Catégorie">
              {tx.status === "a_categoriser" ? (
                <Badge
                  variant="outline"
                  className="border-warning/40 bg-warning/15 text-[oklch(0.45_0.12_55)] dark:text-[oklch(0.82_0.14_65)]"
                >
                  À catégoriser
                </Badge>
              ) : (
                tx.category
              )}
            </MetaRow>
            <Separator />
            <MetaRow icon={CreditCardIcon} label="Moyen de paiement">
              <MethodBadge method={tx.method} />
            </MetaRow>
            <Separator />
            <MetaRow icon={UserIcon} label="Adhérent lié">
              {tx.member ?? (
                <span className="text-muted-foreground">Aucun</span>
              )}
            </MetaRow>
          </CardContent>
        </Card>

        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle className="text-base">Justificatif</CardTitle>
            <CardDescription>
              {tx.justificatif
                ? tx.justificatif.name
                : "Aucun justificatif joint"}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-1 flex-col gap-4">
            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed bg-muted/40 p-6">
              {tx.justificatif ? (
                <ReceiptPreview tx={tx} />
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun document disponible.
                </p>
              )}
            </div>
            {tx.justificatif ? (
              <Button variant="outline" className="w-full">
                <DownloadIcon data-icon="inline-start" />
                Télécharger le justificatif
              </Button>
            ) : null}
          </CardContent>
        </Card>
      </div>

      {tx.stripe ? (
        <Card>
          <CardContent className="pt-6">
            <Accordion defaultValue={["stripe"]}>
              <AccordionItem value="stripe" className="border-0">
                <AccordionTrigger className="hover:no-underline">
                  <span className="flex items-center gap-2">
                    <span className="flex size-7 items-center justify-center rounded-md bg-[oklch(0.55_0.13_265)]/12 text-[oklch(0.5_0.15_265)] dark:text-[oklch(0.75_0.12_265)]">
                      <CreditCardIcon className="size-4" />
                    </span>
                    Détails de l&apos;intégration Stripe
                  </span>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-4">
                  <div className="grid gap-3 sm:grid-cols-3">
                    <StripeStat label="Montant brut">
                      {formatEuro(tx.amount)}
                    </StripeStat>
                    <StripeStat label="Frais Stripe déduits">
                      <span className="text-destructive">
                        − {formatEuro(tx.stripe.fee)}
                      </span>
                    </StripeStat>
                    <StripeStat label="Montant net crédité">
                      <span className="text-success dark:text-[oklch(0.74_0.14_155)]">
                        {formatEuro(tx.stripe.net)}
                      </span>
                    </StripeStat>
                  </div>

                  <dl className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">PaymentIntent</dt>
                      <dd className="font-mono text-xs">
                        {tx.stripe.paymentIntentId}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-muted-foreground">Charge</dt>
                      <dd className="font-mono text-xs">
                        {tx.stripe.chargeId}
                      </dd>
                    </div>
                  </dl>

                  <div className="flex flex-col gap-1.5">
                    <span className="text-xs font-medium text-muted-foreground">
                      Payload JSON brut
                    </span>
                    <pre className="max-h-72 overflow-auto rounded-lg bg-muted p-4 font-mono text-xs leading-relaxed">
                      {JSON.stringify(tx.stripe.raw, null, 2)}
                    </pre>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ) : null}
    </div>
  )
}

function MetaRow({
  icon: Icon,
  label,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <span className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="size-4" />
        {label}
      </span>
      <span className="text-right text-sm font-medium">{children}</span>
    </div>
  )
}

function StripeStat({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border bg-card p-3">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="font-mono text-lg font-semibold tabular-nums">
        {children}
      </span>
    </div>
  )
}

function ReceiptPreview({
  tx,
}: {
  tx: NonNullable<ReturnType<typeof getTransaction>>
}) {
  const isImage = tx.justificatif?.type === "image"
  return (
    <div className="flex w-full max-w-xs flex-col gap-3 rounded-md border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
          {isImage ? (
            <ImageIcon className="size-3.5" />
          ) : (
            <FileTextIcon className="size-3.5" />
          )}
          {isImage ? "Image" : "PDF"}
        </span>
        <Badge variant="secondary" className="text-[10px]">
          Justificatif
        </Badge>
      </div>
      <div className="flex flex-col gap-1.5">
        <div className="h-2 w-2/3 rounded-full bg-muted" />
        <div className="h-2 w-full rounded-full bg-muted" />
        <div className="h-2 w-5/6 rounded-full bg-muted" />
      </div>
      <Separator />
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">Total</span>
        <span className="font-mono font-semibold tabular-nums">
          {formatEuro(tx.amount)}
        </span>
      </div>
    </div>
  )
}
