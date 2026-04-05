'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Briefcase, MessageSquare, Activity, Users, Truck, Cpu, Leaf } from 'lucide-react'
import AgentCard from './components/AgentCard'
import ActivityFeed from './components/ActivityFeed'
import BusinessSwitcher from './components/BusinessSwitcher'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

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

const agents: Agent[] = [
  {
    id: 'oliver',
    name: 'Oliver',
    role: 'Ops Manager - DNA Global Herbs',
    business: 'dna',
    status: 'online',
    avatar: '🌿',
    avatarBg: 'bg-dna-green',
    currentTask: 'Reviewing content calendar',
    lastActive: '2 min ago'
  },
  {
    id: 'trey',
    name: 'Trey',
    role: 'Ops Manager - Defy Transportation',
    business: 'defy',
    status: 'busy',
    avatar: '🚛',
    avatarBg: 'bg-defy-blue',
    currentTask: 'Driver recruitment campaign',
    lastActive: '5 min ago'
  },
  {
    id: 'miles',
    name: 'Miles',
    role: 'Ops Manager - Blacktop Systems',
    business: 'blacktop',
    status: 'online',
    avatar: '⚡',
    avatarBg: 'bg-blacktop-gray',
    currentTask: 'Carrier prospect outreach',
    lastActive: '1 min ago'
  },
  {
    id: 'social',
    name: 'Social Media Agent',
    role: 'Content & Engagement',
    business: 'all',
    status: 'online',
    avatar: '📱',
    avatarBg: 'bg-purple-600',
    currentTask: 'Creating Instagram content',
    lastActive: 'Just now'
  },
  {
    id: 'lead',
    name: 'Lead Scraping Agent',
    role: 'Prospecting & Data',
    business: 'all',
    status: 'busy',
    avatar: '🔍',
    avatarBg: 'bg-orange-600',
    currentTask: 'Enriching driver prospects',
    lastActive: '10 min ago'
  },
  {
    id: 'email',
    name: 'Email Agent',
    role: 'Outreach & Communications',
    business: 'all',
    status: 'online',
    avatar: '✉️',
    avatarBg: 'bg-blue-500',
    currentTask: 'Sending newsletter campaign',
    lastActive: '3 min ago'
  },
  {
    id: 'crm',
    name: 'CRM Agent',
    role: 'Pipeline & Contacts',
    business: 'all',
    status: 'away',
    avatar: '📊',
    avatarBg: 'bg-indigo-600',
    currentTask: 'Updating pipeline stages',
    lastActive: '15 min ago'
  }
]

export default function Dashboard() {
  const [selectedBusiness, setSelectedBusiness] = useState('all')
  const [activities, setActivities] = useState([
    { id: 1, agent: 'Oliver', action: 'Approved content draft', time: '2 min ago', type: 'content' },
    { id: 2, agent: 'Trey', action: 'Added 5 driver prospects', time: '5 min ago', type: 'lead' },
    { id: 3, agent: 'Miles', action: 'Scheduled demo call', time: '8 min ago', type: 'crm' },
    { id: 4, agent: 'Social Media', action: 'Posted to Instagram', time: '12 min ago', type: 'social' },
    { id: 5, agent: 'Email Agent', action: 'Campaign sent: 1,234 recipients', time: '15 min ago', type: 'email' },
  ])

  useEffect(() => {
    // Subscribe to real-time updates
    const channel = supabase.channel('agents')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agent_activities' }, (payload) => {
        console.log('Change received!', payload)
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  const filteredAgents = selectedBusiness === 'all' 
    ? agents 
    : agents.filter(agent => agent.business === selectedBusiness || agent.business === 'all')

  const onlineCount = agents.filter(a => a.status === 'online').length
  const busyCount = agents.filter(a => a.status === 'busy').length
  const awayCount = agents.filter(a => a.status === 'away').length

  return (
    <div className="min-h-screen p-8">
      {/* Header */}
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
              <span className="text-5xl">🎲</span>
              Big Six Virtual Office
            </h1>
            <p className="text-gray-400">Command center for DNA Global Herbs, Defy Transportation &amp; Blacktop Systems</p>
          </div>
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-agent-online"></div>
              <span>{onlineCount} Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-agent-busy"></div>
              <span>{busyCount} Busy</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-agent-away"></div>
              <span>{awayCount} Away</span>
            </div>
          </div>
        </div>
      </header>

      {/* Business Switcher */}
      <BusinessSwitcher selected={selectedBusiness} onSelect={setSelectedBusiness} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Virtual Office - Agent Grid */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Team ({filteredAgents.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredAgents.map(agent => (
              <AgentCard key={agent.id} agent={agent} />
            ))}
          </div>
        </div>

        {/* Activity Feed */}
        <div>
          <ActivityFeed activities={activities} />
        </div>
      </div>
    </div>
  )
}
