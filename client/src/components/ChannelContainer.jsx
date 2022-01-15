import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel, EmptyState } from './';
import styled from 'styled-components';


const ChannelContainer = ({isCreating, setIsCreating, isEditing, setIsEditing, createType}) => {


  if(isCreating) {
    return (
      <div>
        <CreateChannel createType={createType} setIsCreating={setIsCreating}/>
      </div>
    )
  }

  if(isEditing) {
    return (
      <div>
        <EditChannel setIsEditing={setIsEditing} />
      </div>
    )
  }

  return (
    <>
      <ChannelContents>
        <Channel
          EmptyStateIndicator={EmptyState}
          Message={(messageProps, i) => (
            <MessageTeam key={i} {...messageProps} />
          )}
        >
        <ChannelInner setIsEditing={setIsEditing} />
        </Channel>
      </ChannelContents>
    </>
  );
}

export default ChannelContainer

const ChannelContents = styled.div`
  height: 100%;
  width: 100%;
`