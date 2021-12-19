import React from 'react';
import { Channel, VirtualizedMessageList } from 'stream-chat-react';
import { ChannelInner, CreateChannel, EditChannel } from './';

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
    <div>
      <Channel EmptyStateIndicator={EmptyState}>
        <VirtualizedMessageList />
        <ChannelInner setIsEditing={setIsEditing}/>
      </Channel>
    </div>
  )
}

export default ChannelContainer

