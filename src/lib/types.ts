export interface Project {
  id: string
  name: string
  status: string
  description: string | null
  created_at: string
  updated_at: string
}

export interface Task {
  id: string
  project_id: string | null
  title: string
  status: string
  priority: string | null
  created_at: string
}

export interface Agent {
  id: string
  slug: string
  name: string
  description: string | null
  model: string
  schedule: string | null
  is_active: boolean
  created_at: string
}

export interface AgentSession {
  id: string
  agent_id: string
  started_at: string
  ended_at: string | null
  status: string
  output_summary: string | null
  estimated_cost_usd: number | null
}

export interface ContentReview {
  id: string
  title: string
  status: string
  created_at: string
}

export interface ActivityLog {
  id: string
  action: string
  description: string | null
  created_at: string
  metadata: Record<string, unknown> | null
}

export interface ProjectActionItem {
  id: string
  project_id: string
  title: string
  status: string
  priority: string | null
  created_at: string
}

export interface FinancialModelData {
  id: string
  created_at: string
  current_mrr: number | null
  monthly_burn: number | null
  conservative_mrr: number | null
  moderate_mrr: number | null
  aggressive_mrr: number | null
  months_to_exit: number | null
  raw_data: Record<string, unknown> | null
}

export interface DemoStats {
  totalTasks: number
  activeProjects: number
  contentPieces: number
  agentRunsThisWeek: number
}
