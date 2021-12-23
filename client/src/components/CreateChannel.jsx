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
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userId]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <div>
      <div>
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </div>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <button onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </button>
    </div>
  );
};

export default CreateChannel;
