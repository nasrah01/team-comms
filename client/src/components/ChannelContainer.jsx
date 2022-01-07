import React from 'react';
import { Channel, VirtualizedMessageList } from 'stream-chat-react';
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
    <ChannelContents>
      <Channel EmptyStateIndicator={EmptyState}>
        <VirtualizedMessageList />
        <ChannelContWrap><ChannelInner setIsEditing={setIsEditing} /></ChannelContWrap>
        
      </Channel>
    </ChannelContents>
  );
}

export default ChannelContainer

const ChannelContents = styled.div`
  border: 5px solid brown;
  background: lightpink;
`

const ChannelContWrap = styled.div`
  background: pink;
`