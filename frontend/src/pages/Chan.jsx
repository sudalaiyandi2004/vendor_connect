import React from 'react'

function Chan(recipientEmail,setRecipientEmail,subject,setSubject,message,setMessage) {
    const cha=()=>{
         setRecipientEmail('sabarishkumar651@gmail.com')
        setSubject('order came')
        setMessage('you have a job on Monday')
    }
  return (
    <div>
      {cha()}
    </div>
  )
}

export default Chan