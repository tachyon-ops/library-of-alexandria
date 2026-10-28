import type { SeedDossier } from "./repo";
import { REGENERATION_PART_1_DOSSIERS } from "./regeneration-part-1";
import { REGENERATION_PART_2_DOSSIERS } from "./regeneration-part-2";
import { REGENERATION_PART_3_DOSSIERS } from "./regeneration-part-3";
import { REGENERATION_PART_4_DOSSIERS } from "./regeneration-part-4";
import { REGENERATION_PART_5_DOSSIERS } from "./regeneration-part-5";
import { REGENERATION_PART_6_DOSSIERS } from "./regeneration-part-6";
import { REGENERATION_PART_7_DOSSIERS } from "./regeneration-part-7";
import { REGENERATION_PART_8_DOSSIERS } from "./regeneration-part-8";
import { REGENERATION_PART_9_DOSSIERS } from "./regeneration-part-9";

export const REGENERATION_SEED_DOSSIERS: Record<string, SeedDossier> = {
  ...REGENERATION_PART_1_DOSSIERS,
  ...REGENERATION_PART_2_DOSSIERS,
  ...REGENERATION_PART_3_DOSSIERS,
  ...REGENERATION_PART_4_DOSSIERS,
  ...REGENERATION_PART_5_DOSSIERS,
  ...REGENERATION_PART_6_DOSSIERS,
  ...REGENERATION_PART_7_DOSSIERS,
  ...REGENERATION_PART_8_DOSSIERS,
  ...REGENERATION_PART_9_DOSSIERS,
};
