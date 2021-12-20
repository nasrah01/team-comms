import React from 'react';
import { AddChannel } from '../assets/AddChannel';


const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing}) => {
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
        <p>{type === "team" ? "Channels" : "Direct Messages"}</p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </div>
      {children}
    </div>
  );
};

export default TeamChannelList;
