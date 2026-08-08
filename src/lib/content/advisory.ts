export type AdvisoryCategorySlug = "adoption" | "planting" | "water-management" | "symptoms-diagnosis" | "general";

export interface AdvisoryNote {
  id: string;
  category: AdvisoryCategorySlug;
  question: string;
  answerSummary?: string;
  mediaType: "audio" | "photo" | "video";
  mediaPath: string;
  farmerContext?: string;
  date?: string;
}

// Populated from Pedaver's PQNK WhatsApp learning groups. Empty until real
// voice notes / photos / videos are added — see the app's matching
// AdvisoryNote model for the same shape.
export const advisoryNotes: AdvisoryNote[] = [];

export const getNotesByCategory = (slug: AdvisoryCategorySlug) =>
  advisoryNotes.filter((n) => n.category === slug);
