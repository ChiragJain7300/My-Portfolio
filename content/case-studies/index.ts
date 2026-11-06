import { CaseStudy } from "@/types/case-study";
import { wdmPlatformCaseStudy } from "./wdm-platform";
import { blancaCaseStudy } from "./blanca";
import { inventamHrmsCaseStudy } from "./inventam-hrms";
import { justWalkIndiaCaseStudy } from "./just-walk-india";
import { vectalkAiCaseStudy } from "./vectalk-ai";
import { verifiedInboxCaseStudy } from "./verified-inbox";
import { cleancrmCaseStudy } from "./cleancrm";
import { eventcrmCaseStudy } from "./eventcrm";

export const caseStudiesRegistry: Record<string, CaseStudy> = {
  "wdm-platform": wdmPlatformCaseStudy,
  "blanca": blancaCaseStudy,
  "inventam-hrms": inventamHrmsCaseStudy,
  "just-walk-india": justWalkIndiaCaseStudy,
  "vectalk-ai": vectalkAiCaseStudy,
  "verified-inbox": verifiedInboxCaseStudy,
  "cleancrm": cleancrmCaseStudy,
  "eventcrm": eventcrmCaseStudy,
};

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudiesRegistry[slug];
}

export function getAllCaseStudies(): CaseStudy[] {
  return Object.values(caseStudiesRegistry);
}
