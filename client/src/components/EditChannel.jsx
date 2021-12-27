import React, { useState } from "react";
import { useChatContext } from "stream-chat-react";
import { UserList } from './';
import { CloseCreateChannel } from "../assets/CloseCreateChannel";

const ChannelNameInput = ({ channelName = "", setChannelName }) => {
  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value);
  };

  return (
    <div>
      <p>Name</p>
      <input
        value={channelName}
        onChange={handleChange}
        placeholder="channel-name (no spaces)"
      />
      <p>Add Members</p>
    </div>
  );
};

const EditChannel = ({setIsEditing}) => {
  const { channel } = useChatContext();
  const [channelName, setChannelName] = useState(channel?.data?.name);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const updateChannel = async (e) => {
    e.preventDefault();

    const nameChanged = channelName !== (channel.data.name || channel.data.id);

    if(nameChanged) {
      await channel.update({name: channelName}, {text: `Channel name changed to ${channelName}`});
    }

    if(selectedUsers.length) {
      await channel.addMembers(selectedUsers);
    }

    setChannelName(null);
    setIsEditing(false);
    setSelectedUsers([]);
  }

  return <div>
    <div>
      <p>Edit Channel</p>
      <CloseCreateChannel  setIsEditing={setIsEditing}/>
      <ChannelNameInput channelName={channelName} setChannelName={setChannelName}/>
      <UserList setSelectedUsers={setSelectedUsers} />
      <div onClick={updateChannel}>
        <button>Save Changes</button>
      </div>
    </div>
  </div>;
};

export default EditChannel;
