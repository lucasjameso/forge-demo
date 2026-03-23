import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'
import type { DemoStats, Project, Agent, AgentSession, ContentReview, ActivityLog, ProjectActionItem, FinancialModelData } from '@/lib/types'

const ONE_WEEK_AGO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()

export function useDemoStats() {
  return useQuery<DemoStats>({
    queryKey: ['demo-stats'],
    queryFn: async () => {
      const [tasks, projects, content, sessions] = await Promise.all([
        supabase.from('tasks').select('id', { count: 'exact', head: true }),
        supabase.from('projects').select('id', { count: 'exact', head: true }).eq('status', 'active'),
        supabase.from('content_reviews').select('id', { count: 'exact', head: true }),
        supabase.from('agent_sessions').select('id', { count: 'exact', head: true }).gte('started_at', ONE_WEEK_AGO),
      ])
      return {
        totalTasks: tasks.count ?? 0,
        activeProjects: projects.count ?? 0,
        contentPieces: content.count ?? 0,
        agentRunsThisWeek: sessions.count ?? 0,
      }
    },
    staleTime: 60_000,
  })
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useAgents() {
  return useQuery<Agent[]>({
    queryKey: ['agents'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('agents')
        .select('*')
        .order('created_at', { ascending: true })
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useAgentSessions(agentId?: string) {
  return useQuery<AgentSession[]>({
    queryKey: ['agent-sessions', agentId],
    queryFn: async () => {
      let q = supabase
        .from('agent_sessions')
        .select('*')
        .order('started_at', { ascending: false })
        .limit(agentId ? 1 : 50)
      if (agentId) q = q.eq('agent_id', agentId)
      const { data, error } = await q
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useContentReviews() {
  return useQuery<ContentReview[]>({
    queryKey: ['content-reviews'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('content_reviews')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useActivityLog() {
  return useQuery<ActivityLog[]>({
    queryKey: ['activity-log'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('activity_log')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useProjectActionItems() {
  return useQuery<ProjectActionItem[]>({
    queryKey: ['project-action-items'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('project_action_items')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      if (error) throw error
      return data ?? []
    },
    staleTime: 60_000,
  })
}

export function useFinancialModel() {
  return useQuery<FinancialModelData | null>({
    queryKey: ['financial-model'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('financial_model_data')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
      if (error) throw error
      return data
    },
    staleTime: 60_000,
  })
}
