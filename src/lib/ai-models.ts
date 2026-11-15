// Central AI model catalog shared by the settings tab and the server resolver.
export const CENTRAL_MODELS = [
  { id: "openai/gpt-6-sol", name: "GPT-6 Sol", badge: "Raisonnement & stratégie", hint: "Flux multi-étapes, planification, décisions." },
  { id: "openai/gpt-6-luna", name: "GPT-6 Luna", badge: "Vitesse & réactivité", hint: "Réponses instantanées, synthèses rapides." },
  { id: "openai/gpt-6-astra", name: "GPT-6 Astra", badge: "Création & documents", hint: "Rédaction riche, mise en page, analyses." },
] as const;

// Every lab app with AI features follows the central choice. New apps: add one line here + RECOMMENDED.
export const AI_APPS = [
  { key: "aura", name: "Aura", hint: "Assistant vocal" },
  { key: "memotrack", name: "MemoTrack", hint: "Mémos de réunion" },
  { key: "angelo", name: "ANGELO Billing", hint: "Relances de factures" },
  { key: "ocktavus", name: "OCKTAVUS", hint: "Google Workspace" },
  { key: "mymackenzy", name: "MyMackenzy", hint: "Automatisations & agents" },
  { key: "tep", name: "TEP", hint: "Recrutement, post-it & planning" },
  { key: "skydoc", name: "SkyDoc", hint: "Rédaction de documents" },
  { key: "skytab", name: "SkyTab", hint: "Tableurs & calculs" },
  { key: "crm", name: "Nova CRM", hint: "Pipeline & opportunités" },
  { key: "noject", name: "Noject", hint: "Gestion de projets" },
  { key: "planning", name: "Planning", hint: "Post-it & agenda intelligent" },
  { key: "skyachat", name: "SkyAchat", hint: "Lecture des factures fournisseurs" },
  { key: "skytask", name: "SKY Task", hint: "Assistant SKY (tâches, notes, agenda)" },
  { key: "sendy", name: "Sendy", hint: "Rédaction des e-mails de documents" },
  { key: "dyap", name: "Dyap", hint: "Diaporamas d’analyse de données" },
  { key: "businessplan", name: "Business Plan", hint: "Analyse et reconstruction de business plans PDF" },
  { key: "nexusjob", name: "NexusJob", hint: "Analyse de CV & matching d’offres" },
  { key: "feeloo", name: "Feeloo", hint: "Analyse de CV, fiches de poste & matching RH" },
  { key: "etudedemarche", name: "Étude de marché", hint: "Rédaction d’études de marché" },
] as const;

export type AiAppKey = (typeof AI_APPS)[number]["key"];

export const RECOMMENDED: Record<AiAppKey, string> = {
  aura: "openai/gpt-6-luna",
  memotrack: "openai/gpt-6-luna",
  angelo: "openai/gpt-6-astra",
  ocktavus: "openai/gpt-6-luna",
  mymackenzy: "openai/gpt-6-sol",
  tep: "openai/gpt-6-astra",
  skydoc: "openai/gpt-6-astra",
  skytab: "openai/gpt-6-luna",
  crm: "openai/gpt-6-luna",
  noject: "openai/gpt-6-sol",
  planning: "openai/gpt-6-luna",
  skyachat: "openai/gpt-6-astra",
  skytask: "openai/gpt-6-astra",
  sendy: "openai/gpt-6-astra",
  dyap: "openai/gpt-6-astra",
  businessplan: "openai/gpt-6-astra",
  nexusjob: "openai/gpt-6-luna",
  feeloo: "openai/gpt-6-luna",
  etudedemarche: "openai/gpt-6-sol",
};

export function isCentralModel(id: unknown): id is string {
  return CENTRAL_MODELS.some((m) => m.id === id);
}
