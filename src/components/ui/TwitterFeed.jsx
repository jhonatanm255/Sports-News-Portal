import React from 'react'
import TwitterWidget from './TwitterWidget'

const TwitterFeed = ({ accounts = [] }) => {
  if (!accounts || accounts.length === 0) {
    return null
  }
  
  return (
    <div className="twitter-feed bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">Twitter</h3>
      <div className="space-y-6">
        {accounts.map((account, index) => (
          <TwitterWidget key={index} account={account} height={500} />
        ))}
      </div>
    </div>
  )
}

export default TwitterFeed