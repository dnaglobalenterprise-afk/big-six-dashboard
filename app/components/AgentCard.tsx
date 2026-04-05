'use client'

import { MessageSquare, Activity, Clock } from 'lucide-react'

interface Agent {
  id: string
  name: string
  role: string
  business: string
  status: 'online' | 'busy' | 'away' | 'offline'
  avatar: string
  avatarBg: string
  currentTask?: string
  lastActive: string
}

interface AgentCardProps {
  agent: Agent
}

const statusColors = {
  online: 'bg-agent-online',
  busy: 'bg-agent-busy',
  away: 'bg-agent-away',
  offline: 'bg-gray-500'
}

const statusLabels = {
  online: 'Online',
  busy: 'Busy',
  away: 'Away',
  offline: 'Offline'
}

export default function AgentCard({ agent }: AgentCardProps) {
  return (
    <div className="agent-card cursor-pointer group">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative">
          <div className={`agent-avatar ${agent.avatarBg} transition-transform group-hover:scale-110`}>
            {agent.avatar}
          </div>
          <div className={`status-dot ${statusColors[agent.status]}`} />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-bold text-lg truncate">{agent.name}</h3>
            <span className={`text-xs px-2 py-1 rounded-full ${statusColors[agent.status]} text-white`}>
              {statusLabels[agent.status]}
            </span>
          </div>
          
          <p className="text-sm text-gray-400 mb-2">{agent.role}</p>
          
          {agent.currentTask && (
            <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
              <Activity className="w-4 h-4 text-office-accent" />
              <span className="truncate">{agent.currentTask}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="w-3 h-3" />
            {agent.lastActive}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-office-accent rounded-lg text-sm hover:bg-office-accent/80 transition-colors">
          <MessageSquare className="w-4 h-4" />
          Message
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-office-card border border-office-accent rounded-lg text-sm hover:bg-office-accent/20 transition-colors">
          <Activity className="w-4 h-4" />
          Brief
        </button>
      </div>
    </div>
  )
}
