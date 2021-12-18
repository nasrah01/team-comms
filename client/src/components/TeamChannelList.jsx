import React from 'react';


const TeamChannelList = ({children, error = false, loading, type}) => {
  if(error) {
    return type === 'team' ? (
      <div>Connection error please try again in a moment</div>
    ) : null
  }

  if(loading) {
     return (
       <div>
         <p>
           {type === 'team' ? 'Channels' : 'Messages'} loading...
         </p>
       </div>
     )
  }

  return (
    <div>
      <div>
        <p>{type === 'team' ? 'Channels' : 'Direct Messages'}</p>
      </div>
      {children}
    </div>
  )
};

export default TeamChannelList;
