export type PaymentMethod = "stripe" | "especes" | "cheque" | "virement"
export type TransactionType = "entree" | "sortie"
export type TransactionStatus = "valide" | "en_attente" | "a_categoriser"

export type Category =
  | "Cotisations"
  | "Licences"
  | "Équipements"
  | "Location salle"
  | "Compétitions"
  | "Subventions"
  | "Assurance"
  | "Stages & événements"
  | "Frais bancaires"
  | "Non catégorisé"

export interface StripeDetails {
  paymentIntentId: string
  chargeId: string
  fee: number
  net: number
  raw: Record<string, unknown>
}

export interface Justificatif {
  type: "pdf" | "image"
  name: string
}

export interface Transaction {
  id: string
  date: string
  description: string
  member: string | null
  method: PaymentMethod
  category: Category
  type: TransactionType
  amount: number
  status: TransactionStatus
  stripe?: StripeDetails
  justificatif?: Justificatif
  note?: string
}

export const CLUB = {
  name: "Club Kung-Fu Wushu Lyon",
  season: "Saison 2025 — 2026",
  treasurer: "Marie Lefèvre",
}

/* ---------- Soldes ---------- */
export const balances = {
  comptable: 14382.55,
  bancaire: 14156.9,
  get ecart() {
    return Math.round((this.bancaire - this.comptable) * 100) / 100
  },
  lastReconciliation: "2026-09-05T09:12:00",
}

/* ---------- Sauvegarde Mega ---------- */
export const backup = {
  lastBackupAt: "2026-09-05T22:04:00",
  size: "18,4 Mo",
  fileName: "sauvegarde_compta_2026-09-05.zip",
  megaSynced: true,
  rcloneStatus: "OK",
}

/* ---------- Entrées / Sorties 6 mois ---------- */
export const monthlyFlow = [
  { month: "Avr.", entrees: 2450, sorties: 1320 },
  { month: "Mai", entrees: 1980, sorties: 1610 },
  { month: "Juin", entrees: 1240, sorties: 890 },
  { month: "Juil.", entrees: 620, sorties: 540 },
  { month: "Août", entrees: 480, sorties: 1210 },
  { month: "Sept.", entrees: 6820, sorties: 2140 },
]

/* ---------- Répartition des dépenses ---------- */
export const expenseByCategory = [
  { category: "Location salle", amount: 3600, key: "location" },
  { category: "Licences", amount: 2180, key: "licences" },
  { category: "Équipements", amount: 1740, key: "equipements" },
  { category: "Assurance", amount: 980, key: "assurance" },
  { category: "Compétitions", amount: 760, key: "competitions" },
  { category: "Frais bancaires", amount: 190, key: "frais" },
]

/* ---------- Transactions ---------- */
export const transactions: Transaction[] = [
  {
    id: "TX-2091",
    date: "2026-09-07T18:32:00",
    description: "Cotisation annuelle — adhésion en ligne",
    member: "Lucas Moreau",
    method: "stripe",
    category: "Non catégorisé",
    type: "entree",
    amount: 245,
    status: "a_categoriser",
    justificatif: { type: "pdf", name: "recu_stripe_TX-2091.pdf" },
    stripe: {
      paymentIntentId: "pi_3PqL8xK2mBv0aQ1z",
      chargeId: "ch_3PqL8xK2mBv0aQ1z",
      fee: 3.83,
      net: 241.17,
      raw: {
        id: "pi_3PqL8xK2mBv0aQ1z",
        object: "payment_intent",
        amount: 24500,
        currency: "eur",
        status: "succeeded",
        description: "Cotisation annuelle 2025-2026",
        metadata: { adherent: "Lucas Moreau", saison: "2025-2026" },
      },
    },
  },
  {
    id: "TX-2090",
    date: "2026-09-07T14:05:00",
    description: "Cotisation annuelle — adhésion en ligne",
    member: "Aïcha Benali",
    method: "stripe",
    category: "Non catégorisé",
    type: "entree",
    amount: 245,
    status: "a_categoriser",
    justificatif: { type: "pdf", name: "recu_stripe_TX-2090.pdf" },
    stripe: {
      paymentIntentId: "pi_3PqK1aK2mBv0bR7y",
      chargeId: "ch_3PqK1aK2mBv0bR7y",
      fee: 3.83,
      net: 241.17,
      raw: {
        id: "pi_3PqK1aK2mBv0bR7y",
        object: "payment_intent",
        amount: 24500,
        currency: "eur",
        status: "succeeded",
        metadata: { adherent: "Aïcha Benali", saison: "2025-2026" },
      },
    },
  },
  {
    id: "TX-2089",
    date: "2026-09-06T10:18:00",
    description: "Cotisation annuelle — adhésion en ligne",
    member: "Thomas Girard",
    method: "stripe",
    category: "Cotisations",
    type: "entree",
    amount: 245,
    status: "valide",
    justificatif: { type: "pdf", name: "recu_stripe_TX-2089.pdf" },
    stripe: {
      paymentIntentId: "pi_3PqA9xK2mBv0cT2w",
      chargeId: "ch_3PqA9xK2mBv0cT2w",
      fee: 3.83,
      net: 241.17,
      raw: {
        id: "pi_3PqA9xK2mBv0cT2w",
        object: "payment_intent",
        amount: 24500,
        currency: "eur",
        status: "succeeded",
        metadata: { adherent: "Thomas Girard", saison: "2025-2026" },
      },
    },
  },
  {
    id: "TX-2088",
    date: "2026-09-05T16:40:00",
    description: "Loyer dojo — septembre",
    member: null,
    method: "virement",
    category: "Location salle",
    type: "sortie",
    amount: 600,
    status: "valide",
    justificatif: { type: "pdf", name: "facture_gymnase_sept.pdf" },
  },
  {
    id: "TX-2087",
    date: "2026-09-04T11:22:00",
    description: "Achat de tenues (10 uniformes)",
    member: null,
    method: "cheque",
    category: "Équipements",
    type: "sortie",
    amount: 430,
    status: "valide",
    justificatif: { type: "image", name: "facture_equipement.jpg" },
  },
  {
    id: "TX-2086",
    date: "2026-09-03T09:05:00",
    description: "Cotisation — paiement au dojo",
    member: "Sophie Nguyen",
    method: "especes",
    category: "Cotisations",
    type: "entree",
    amount: 230,
    status: "valide",
  },
  {
    id: "TX-2085",
    date: "2026-09-02T19:15:00",
    description: "Licences fédérales (lot de 8)",
    member: null,
    method: "virement",
    category: "Licences",
    type: "sortie",
    amount: 312,
    status: "en_attente",
    justificatif: { type: "pdf", name: "bordereau_ffkda.pdf" },
  },
  {
    id: "TX-2084",
    date: "2026-08-28T13:47:00",
    description: "Subvention municipale — 1er versement",
    member: null,
    method: "virement",
    category: "Subventions",
    type: "entree",
    amount: 1500,
    status: "valide",
    justificatif: { type: "pdf", name: "notification_subvention.pdf" },
  },
  {
    id: "TX-2083",
    date: "2026-08-20T08:30:00",
    description: "Frais de tenue de compte — août",
    member: null,
    method: "virement",
    category: "Frais bancaires",
    type: "sortie",
    amount: 12,
    status: "valide",
  },
  {
    id: "TX-2082",
    date: "2026-08-18T17:02:00",
    description: "Inscription tournoi régional",
    member: null,
    method: "cheque",
    category: "Compétitions",
    type: "sortie",
    amount: 180,
    status: "valide",
    justificatif: { type: "pdf", name: "inscription_tournoi.pdf" },
  },
  {
    id: "TX-2081",
    date: "2026-08-12T10:40:00",
    description: "Cotisation annuelle — adhésion en ligne",
    member: "Karim Haddad",
    method: "stripe",
    category: "Cotisations",
    type: "entree",
    amount: 245,
    status: "valide",
    justificatif: { type: "pdf", name: "recu_stripe_TX-2081.pdf" },
    stripe: {
      paymentIntentId: "pi_3Pk22xK2mBv0dU3v",
      chargeId: "ch_3Pk22xK2mBv0dU3v",
      fee: 3.83,
      net: 241.17,
      raw: {
        id: "pi_3Pk22xK2mBv0dU3v",
        object: "payment_intent",
        amount: 24500,
        currency: "eur",
        status: "succeeded",
        metadata: { adherent: "Karim Haddad", saison: "2025-2026" },
      },
    },
  },
  {
    id: "TX-2080",
    date: "2026-07-30T15:10:00",
    description: "Assurance responsabilité civile — annuelle",
    member: null,
    method: "virement",
    category: "Assurance",
    type: "sortie",
    amount: 480,
    status: "valide",
    justificatif: { type: "pdf", name: "contrat_assurance.pdf" },
  },
  {
    id: "TX-2079",
    date: "2026-07-15T12:00:00",
    description: "Stage d'été — participation adhérents",
    member: null,
    method: "especes",
    category: "Stages & événements",
    type: "entree",
    amount: 620,
    status: "valide",
  },
  {
    id: "TX-2078",
    date: "2026-06-28T09:25:00",
    description: "Loyer dojo — juin",
    member: null,
    method: "virement",
    category: "Location salle",
    type: "sortie",
    amount: 600,
    status: "valide",
    justificatif: { type: "pdf", name: "facture_gymnase_juin.pdf" },
  },
  {
    id: "TX-2077",
    date: "2026-06-10T18:55:00",
    description: "Cotisation — chèque",
    member: "Emma Rousseau",
    method: "cheque",
    category: "Cotisations",
    type: "entree",
    amount: 230,
    status: "valide",
    justificatif: { type: "image", name: "cheque_emma.jpg" },
  },
]

/* ---------- Rapport croisé (Produits / Charges) ---------- */
export const reportMonths = ["Avr.", "Mai", "Juin", "Juil.", "Août", "Sept."]

export const reportRevenue: { category: string; values: number[] }[] = [
  { category: "Cotisations", values: [1800, 1150, 690, 0, 245, 4900] },
  { category: "Subventions", values: [0, 0, 0, 0, 0, 1500] },
  { category: "Stages & événements", values: [400, 620, 350, 620, 0, 220] },
  { category: "Licences (refacturées)", values: [250, 210, 200, 0, 235, 200] },
]

export const reportExpense: { category: string; values: number[] }[] = [
  { category: "Location salle", values: [600, 600, 600, 0, 600, 600] },
  { category: "Licences", values: [0, 340, 0, 0, 0, 312] },
  { category: "Équipements", values: [420, 0, 0, 0, 380, 430] },
  { category: "Assurance", values: [0, 480, 0, 480, 0, 0] },
  { category: "Compétitions", values: [280, 178, 290, 48, 218, 180] },
  { category: "Frais bancaires", values: [20, 12, 0, 12, 12, 18] },
]

/* ---------- Helpers ---------- */
export function formatEuro(value: number, opts?: { signed?: boolean }) {
  const formatted = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))
  if (opts?.signed) {
    return `${value >= 0 ? "+" : "−"} ${formatted}`
  }
  return value < 0 ? `− ${formatted}` : formatted
}

export function formatDate(iso: string, withTime = false) {
  const d = new Date(iso)
  const date = new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(d)
  if (!withTime) return date
  const time = new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(d)
  return `${date} · ${time}`
}

export function hoursSince(iso: string) {
  return Math.round((Date.now() - new Date(iso).getTime()) / 36e5)
}

export const methodLabels: Record<PaymentMethod, string> = {
  stripe: "Stripe",
  especes: "Espèces",
  cheque: "Chèque",
  virement: "Virement",
}

export const statusLabels: Record<TransactionStatus, string> = {
  valide: "Validé",
  en_attente: "En attente",
  a_categoriser: "À catégoriser",
}

export function getTransaction(id: string) {
  return transactions.find((t) => t.id === id)
}

export const toCategorizeCount = transactions.filter(
  (t) => t.status === "a_categoriser",
).length
