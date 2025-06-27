// Web3 类型定义

interface Window {
  ethereum?: {
    isMetaMask?: boolean
    request: (args: { method: string; params?: any[] }) => Promise<any>
    on: (event: string, handler: (...args: any[]) => void) => void
    removeListener: (event: string, handler: (...args: any[]) => void) => void
  }
}

// 争议状态枚举
export enum DisputeStatus {
  None = 0,
  Submitted = 1,
  EvidencePending = 2,
  AwaitingAI = 3,
  AIProposed = 4,
  Voting = 5,
  Resolved = 6,
  Closed = 7
}

// 争议数据结构
export interface DisputeData {
  disputeId: number
  claimant: string
  respondent: string
  ruleSetId: number
  caseURI: string
  evidenceURI: string
  aiVerdictURI: string
  status: DisputeStatus
  createdAt: number
  finalVerdictAt: number
}

// 仲裁员信息
export interface ArbiterInfo {
  address: string
  totalStake: bigint
  casesHandled: number
  reputation: number
  isActive: boolean
  lastActiveTime: number
}

// 投票信息
export interface VoteInfo {
  inFavorClaimant: boolean
  stake: bigint
  timestamp: number
  reason: string
}

// 投票统计
export interface VotingStats {
  favorVotes: bigint
  againstVotes: bigint
  totalVoters: number
  votedCount: number
}

// 规则集信息
export interface RuleSetInfo {
  id: number
  ipfsHash: string
  title: string
  jurisdiction: string
  timestamp: number
}

// 合约事件类型
export interface DisputeSubmittedEvent {
  id: number
  claimant: string
  respondent: string
  ruleSetId: number
}

export interface EvidenceUpdatedEvent {
  id: number
  evidenceURI: string
}

export interface AIVerdictProposedEvent {
  id: number
  aiVerdictURI: string
}

export interface DisputeStatusChangedEvent {
  id: number
  newStatus: DisputeStatus
}

export interface ArbiterRegisteredEvent {
  arbiter: string
  stake: bigint
}

export interface PanelSelectedEvent {
  id: number
  arbiters: string[]
}

export interface VotedEvent {
  id: number
  voter: string
  favorClaimant: boolean
  stake: bigint
  reason: string
}

export interface VerdictFinalizedEvent {
  id: number
  favorClaimant: boolean
  favorVotes: bigint
  againstVotes: bigint
}

// API响应类型
export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// 前端状态类型
export interface Web3State {
  isConnected: boolean
  address: string
  chainId: number
  isConnecting: boolean
  error: string | null
}

export interface DisputeFormData {
  title: string
  description: string
  respondent: string
  ruleSetId: string
  evidenceFile: File | null
  category: string
  amount: string
}

export interface ArbiterRegistrationData {
  address: string
  stake: string
  qualifications: string
  experience: string
  specializations: string[]
}

export interface VoteFormData {
  favorClaimant: boolean
  stake: string
  reason: string
}
