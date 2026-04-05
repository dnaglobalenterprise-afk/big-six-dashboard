'use client'

import { Activity, FileText, Mail, Users, Share2 } from 'lucide-react'

interface Activity {
  id: number
  agent: string
  action: string
  time: string
  type: string
}

interface ActivityFeedProps {
  activities: Activity[]
}

const typeIcons = {
  content: FileText,
  lead: Users,
  crm: Activity,
  social: Share2,
  email: Mail,
}

const typeColors = {
  content: 'text-green-400',
  lead: 'text-orange-400',
  crm: 'text-blue-400',
  social: 'text-purple-400',
  email: 'text-blue-300',
}

export default function ActivityFeed({ activities }: ActivityFeedProps) {
  return (
    <div className="bg-office-card rounded-xl p-6 border border-office-accent h-full">
      <div className="flex items-center gap-2 mb-6">
        <Activity className="w-5 h-5 text-office-accent" />
        <h2 className="text-xl font-semibold">Activity Feed</h2>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = typeIcons[activity.type as keyof typeof typeIcons] || Activity
          const colorClass = typeColors[activity.type as keyof typeof typeColors] || 'text-gray-400'
          
          return (
            <div key={activity.id} className="flex gap-3 p-3 rounded-lg bg-office-bg/50 hover:bg-office-bg transition-colors">
              <div className={`mt-1 ${colorClass}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-semibold">{activity.agent}</span>{' '}
                  {activity.action}
                </p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>

      <button className="w-full mt-6 py-2 text-sm text-gray-400 hover:text-white transition-colors">
        View all activity →
      </button>
    </div>
  )
}
