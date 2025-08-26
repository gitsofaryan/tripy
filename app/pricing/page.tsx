import React from 'react'
import { PricingTable } from '@clerk/nextjs'
export default function page() {
  return (
    <div>
          <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
              <PricingTable />
          </div>
    </div>
  )
}
