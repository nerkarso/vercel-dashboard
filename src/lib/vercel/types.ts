export interface Pagination {
  count: number;
  next: null;
  prev: number;
}

export interface Project {
  accountId: string;
  autoExposeSystemEnvs: boolean;
  buildCommand: string;
  createdAt: number;
  crons: Crons;
  devCommand: null;
  directoryListing: boolean;
  env: any[];
  framework: null;
  gitForkProtection: boolean;
  id: string;
  installCommand: string;
  lastRollbackTarget: null;
  lastAliasRequest: null;
  name: string;
  nodeVersion: string;
  outputDirectory: string;
  passwordProtection: null;
  publicSource: null;
  resourceConfig: ResourceConfig;
  rootDirectory: null;
  serverlessFunctionRegion: string;
  sourceFilesOutsideRootDirectory: boolean;
  ssoProtection: SsoProtection;
  updatedAt: number;
  live: boolean;
  link: Link;
  latestDeployments: LatestDeployment[];
  targets: Targets;
  transferStartedAt: number;
  transferCompletedAt: number;
  transferredFromAccountId: string;
}

export interface Crons {
  enabledAt: number;
  disabledAt: null;
  updatedAt: number;
  deploymentId: null;
  definitions: any[];
}

export interface LatestDeployment {
  alias: string[];
  aliasAssigned: number;
  aliasError: null;
  automaticAliases?: string[];
  builds: any[];
  createdAt: number;
  createdIn: string;
  creator: Creator;
  deploymentHostname: string;
  forced: boolean;
  id: string;
  meta: Meta;
  name: string;
  plan: string;
  private: boolean;
  readyState: ReadyState;
  target: string;
  teamId: string;
  type: string;
  url: string;
  userId: string;
  withCache: boolean;
  buildingAt: number;
  readyAt: number;
  previewCommentsEnabled?: boolean;
}

export interface Creator {
  uid: string;
  email: string;
  username: string;
  githubLogin: string;
}

export interface Meta {
  githubCommitAuthorName: string;
  githubCommitMessage: string;
  githubCommitOrg: string;
  githubCommitRef: string;
  githubCommitRepo: string;
  githubCommitSha: string;
  githubDeployment: string;
  githubOrg: string;
  githubRepo: string;
  githubRepoOwnerType?: string;
  githubCommitRepoId: string;
  githubRepoId: string;
  githubRepoVisibility?: string;
  githubCommitAuthorLogin: string;
  branchAlias?: string;
}

export interface Link {
  type: string;
  repo: string;
  repoId: number;
  org: string;
  gitCredentialId: string;
  productionBranch: string;
  sourceless: boolean;
  createdAt: number;
  updatedAt: number;
  deployHooks: any[];
}

export interface ResourceConfig {
  functionDefaultMemoryType: string;
}

export interface SsoProtection {
  deploymentType: string;
}

export interface Targets {
  production: LatestDeployment;
}

export type ReadyState = 'BUILDING' | 'READY';
