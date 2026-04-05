'use client'

import { Leaf, Truck, Cpu, LayoutGrid } from 'lucide-react'

interface BusinessSwitcherProps {
  selected: string
  onSelect: (business: string) => void
}

const businesses = [
  { id: 'all', name: 'All Businesses', icon: LayoutGrid, color: 'text-white' },
  { id: 'dna', name: 'DNA Global Herbs', icon: Leaf, color: 'text-green-400' },
  { id: 'defy', name: 'Defy Transportation', icon: Truck, color: 'text-blue-400' },
  { id: 'blacktop', name: 'Blacktop Systems', icon: Cpu, color: 'text-gray-400' },
]

export default function BusinessSwitcher({ selected, onSelect }: BusinessSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {businesses.map((business) => {
        const Icon = business.icon
        const isActive = selected === business.id
        
        return (
          <button
            key={business.id}
            onClick={() => onSelect(business.id)}
            className={`business-tab flex items-center gap-2 ${isActive ? 'active' : ''}`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'text-white' : business.color}`} />
            {business.name}
          </button>
        )
      })}
    </div>
  )
}
