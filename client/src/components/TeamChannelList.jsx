import React from 'react';
import { AddChannel } from '../assets/AddChannel';
import styled from 'styled-components';


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
    <ListContainer>
      <ListWrapper>
        <p>{type === "team" ? "Channels" : "Direct Messages"}</p>
        <AddChannel
          isCreating={isCreating}
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          type={type === 'team' ? 'team' : 'messaging'}
        />
      </ListWrapper>
      <ListChild>{children}</ListChild>
      
    </ListContainer>
  );
};

export default TeamChannelList;

const ListContainer = styled.div`
  background: lightgreen;
  border: 5px solid green;
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const ListChild = styled.div``