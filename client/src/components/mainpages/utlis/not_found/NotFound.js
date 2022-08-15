import React from "react";
import {Link }from "react-router-dom"
import Error from '../../images/error.png'

function NotFound(){
    return(
        <div className="not-found">
        
        <div style={{textAlign: 'center',marginBottom:'10px',marginTop:'2rem'}}>
        <Link to='/' >
            <button style={{backgroundColor:'#2eb82e',padding:'10px',width:'17rem',borderRadius:'7px',boxShadow:'3px 3px 3px 0 grey',color:'white',fontSize:'1rem'}}>
                
                    Go to Home
           </button>
           </Link>
        </div>
        <div>
            <img src={Error} alt="empty" style={{width:"80%",height:'60%',position:'absolute',top:'10%',left:'0',right:'0',bottom:'0',margin:'auto'}}/>
       
        </div>
        </div>
        
    )
}
export default NotFound