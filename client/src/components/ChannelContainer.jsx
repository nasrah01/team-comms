import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';
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

  const EmptyState = () => {
    return (
      <div>
        <p>Start your chat history now</p>
        <p>Send messages, attachments, links, emojis, and more!</p>
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