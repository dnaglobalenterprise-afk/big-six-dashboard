'use client'

import { useState } from 'react'
import { MessageSquare, Activity, Clock, X, Send, FileText } from 'lucide-react'

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
  const [showMessageModal, setShowMessageModal] = useState(false)
  const [showBriefModal, setShowBriefModal] = useState(false)
  const [messageText, setMessageText] = useState('')
  const [briefText, setBriefText] = useState('')

  const handleSendMessage = () => {
    if (messageText.trim()) {
      alert(`Message sent to ${agent.name}: ${messageText}`)
      setMessageText('')
      setShowMessageModal(false)
    }
  }

  const handleSendBrief = () => {
    if (briefText.trim()) {
      alert(`Brief sent to ${agent.name}: ${briefText}`)
      setBriefText('')
      setShowBriefModal(false)
    }
  }

  return (
    <>
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
          <button 
            onClick={() => setShowMessageModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-office-accent rounded-lg text-sm hover:bg-office-accent/80 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            Message
          </button>
          <button 
            onClick={() => setShowBriefModal(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-office-card border border-office-accent rounded-lg text-sm hover:bg-office-accent/20 transition-colors"
          >
            <FileText className="w-4 h-4" />
            Brief
          </button>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-office-card rounded-xl p-6 w-full max-w-md border border-office-accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Message {agent.name}
              </h3>
              <button 
                onClick={() => setShowMessageModal(false)}
                className="p-1 hover:bg-office-accent rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${agent.avatarBg}`}>
                {agent.avatar}
              </div>
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </div>
            </div>

            <textarea
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message..."
              className="w-full h-32 bg-office-bg rounded-lg p-3 text-white placeholder-gray-500 border border-office-accent focus:border-office-accent focus:outline-none resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowMessageModal(false)}
                className="flex-1 py-2 rounded-lg border border-office-accent hover:bg-office-accent/20"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                className="flex-1 py-2 rounded-lg bg-office-accent hover:bg-office-accent/80 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Brief Modal */}
      {showBriefModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-office-card rounded-xl p-6 w-full max-w-md border border-office-accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Brief {agent.name}
              </h3>
              <button 
                onClick={() => setShowBriefModal(false)}
                className="p-1 hover:bg-office-accent rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="mb-4 flex items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${agent.avatarBg}`}>
                {agent.avatar}
              </div>
              <div>
                <p className="font-semibold">{agent.name}</p>
                <p className="text-sm text-gray-400">{agent.role}</p>
              </div>
            </div>

            <textarea
              value={briefText}
              onChange={(e) => setBriefText(e.target.value)}
              placeholder="Enter task brief, objectives, and success criteria..."
              className="w-full h-32 bg-office-bg rounded-lg p-3 text-white placeholder-gray-500 border border-office-accent focus:border-office-accent focus:outline-none resize-none"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowBriefModal(false)}
                className="flex-1 py-2 rounded-lg border border-office-accent hover:bg-office-accent/20"
              >
                Cancel
              </button>
              <button
                onClick={handleSendBrief}
                className="flex-1 py-2 rounded-lg bg-office-accent hover:bg-office-accent/80 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send Brief
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
