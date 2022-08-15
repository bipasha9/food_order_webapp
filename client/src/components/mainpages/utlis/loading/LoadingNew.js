import React from 'react'
import './loading.css'


const LoadingNew = () => {
    return (
        
        <div className="loading-new"
        style={{background: '#ededed', color: 'dimgrey', top: 0, left: 0, zIndex: 9}}>
            <svg width="205" height="250" viewBox="0 0 40 50">
                <polygon strokeWidth="1" stroke="dimgrey" fill="none"
                points="20,1 40,40 1,40"></polygon>
                <text fill="dimgrey" x="6.5" y="47">Loading</text>
            </svg>
        </div>
    )
}

export default  LoadingNew;