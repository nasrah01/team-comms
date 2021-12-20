import React, { useState } from "react";
import { useChatContext } from 'stream-chat-react';
import { UserList } from './';
import { CloseCreateChannel } from "../assets/CloseCreateChannel";

const ChannelNameInput = ({ channelName='', setChannelName}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value)
  }

  return (
    <div>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
      <p>Add Members</p>
    </div>
  )
};

const CreateChannel = ({ createType, setIsCreating }) => {

  const [channelName, setChannelName] = useState('');
 
  return (
    <div>
      <div>
        <p>{createType === 'team' ? 'Create a New Channel' : 'Send a Direct Message'}</p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === 'team' && <ChannelNameInput  channelName={channelName} setChannelName={setChannelName} />}
      <UserList />
    </div>
  );
};

export default CreateChannel;
