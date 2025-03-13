import React, { useEffect } from 'react'

const TwitterWidget = ({ account, height = 600 }) => {
  useEffect(() => {
    // Load Twitter widget script
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    document.body.appendChild(script)
    
    return () => {
      document.body.removeChild(script)
    }
  }, [])
  
  return (
    <div className="twitter-widget mb-6">
      <a 
        className="twitter-timeline" 
        data-height={height} 
        href={`https://twitter.com/${account.replace('@', '')}`}
      >
        Tweets de {account}
      </a>
    </div>
  )
}

export default TwitterWidget