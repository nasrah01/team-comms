import React from 'react';
import { AddChannel } from '../assets/AddChannel';
import styled from 'styled-components';


const TeamChannelList = ({children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing}) => {
  if(error) {
    return type === "team" ? (
      <div>
        <p>
          Connection error, please wait a moment and try again.
        </p>
      </div>
    ) : null;
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
  width: 100%;
  padding-top: 3rem;
`

const ListWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1.6rem;
  margin-bottom: 1rem;

  p {
    line-height: 16px;
    height: 16px;
    color: rgba(255, 255, 255, 0.66);
    font-size: 1.8rem;
  }

  svg {
    cursor: pointer;
  }
`;

const ListChild = styled.div``