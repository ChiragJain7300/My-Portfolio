export type SystemCategory = "backend" | "fullstack" | "ai" | "infrastructure";

export interface ImpactMetric {
  value: string;
  label: string;
  detail: string;
  defenseInInterview?: string; // How to explain/defend this number in an interview
}

export interface ArchitectureComponent {
  name: string;
  type: string;
  role: string;
  tech: string;
  inputs?: string;
  outputs?: string;
  failureMode?: string;
}

export interface DataFlowStep {
  step: number;
  from: string;
  to: string;
  action: string;
  protocolOrPayload: string;
}

export interface DatabaseColumn {
  name: string;
  type: string;
  key?: "PK" | "FK" | "INDEX";
  description: string;
}

export interface DatabaseTable {
  name: string;
  type: "collection" | "table" | "view";
  description: string;
  columns: DatabaseColumn[];
  indexes?: string[];
  relationships?: string[];
  sampleQuery?: {
    title: string;
    code: string;
    explanation: string;
  };
}

export interface CodeSnippet {
  id: string;
  filename: string;
  language: string;
  description: string;
  code: string;
  highlights?: string[];
  explanation: string;
}

export interface ApiEndpoint {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  path: string;
  description: string;
  authRequired: boolean;
  rateLimit?: string;
  requestBody?: string;
  responseSample: string;
  statusCode: number;
}

export interface ArchitecturalDecision {
  id: string;
  title: string;
  status: "ACCEPTED" | "SUPERSEDED";
  problem: string;
  chosenApproach: string;
  alternativesConsidered: string[];
  rationale: string;
  tradeoffsAndLimitations: string;
}

export interface TechnicalChallenge {
  title: string;
  difficulty: string;
  problem: string;
  investigation: string;
  solution: string;
  outcome: string;
  lessonsLearned: string;
}

export interface InterviewTalkingPoint {
  topic: string;
  claim: string;
  defense: string;
}

export interface CaseStudy {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: SystemCategory;
  categoryLabel: string;
  role: string;
  timeline: string;
  teamSize?: string;
  status: "PRODUCTION_ACTIVE" | "COMPLETED" | "PROPRIETARY_NDA";
  isPrivate: boolean;
  liveUrl?: string;
  githubUrl?: string;
  techStack: string[];
  tags: string[];

  // 10-Second Recruiter HUD Metrics
  impactMetrics: ImpactMetric[];

  // 01 / Executive Summary & Context
  executiveSummary: {
    overview: string;
    targetUsers: string;
    businessContext: string;
    coreProblem: string;
    solutionStatement: string;
  };

  // 02 / Key Capabilities & Feature Tree
  capabilities: {
    category: string;
    items: string[];
  }[];

  // 03 / System Architecture & Blueprint
  architecture: {
    summary: string;
    asciiDiagram?: string;
    components: ArchitectureComponent[];
    dataFlowSteps: DataFlowStep[];
    interactiveType?: "token-concurrency" | "pipeline-inspector" | "state-machine";
  };

  // 04 / Database Design & Schema Explorer
  database: {
    engine: string;
    designPhilosophy: string;
    tables: DatabaseTable[];
  };

  // 05 / Code Walkthrough & Implementation Snippets
  codeWalkthrough: {
    summary: string;
    snippets: CodeSnippet[];
  };

  // 06 / API Architecture & Endpoints
  apiArchitecture: {
    summary: string;
    endpoints: ApiEndpoint[];
  };

  // 07 / Architectural Decision Records (ADRs)
  decisions: ArchitecturalDecision[];

  // 08 / Concurrency, Resilience & Recovery
  resilienceAndRecovery?: {
    summary: string;
    mechanisms: {
      name: string;
      problem: string;
      implementation: string;
      recoveryScenario: string;
    }[];
  };

  // 09 / Security & Access Control
  security: {
    measures: {
      title: string;
      description: string;
      implemented: boolean;
    }[];
  };

  // 10 / Production Challenges (STAR format)
  challenges: TechnicalChallenge[];

  // 11 / Interview Talking Points & Number Defense
  interviewTalkingPoints: InterviewTalkingPoint[];

  // 12 / What I Would Improve in V2
  futureImprovements: string[];
}

