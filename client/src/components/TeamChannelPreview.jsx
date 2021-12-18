import React from 'react';
import {Avatar, useChatContext} from 'stream-chat-react';

const TeamChannelPreview = ({channel, type}) => {

  const {channel: activeChannel, client} = useChatContext();
  const ChannelPreview = () => {
    return (
      <p>
        # {channel?.data?.name || channel?.data?.id}
      </p>
    )
  };

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter( ({user}) => user.id !== client.userID);

    return (
      <div>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName}
          size={24}
        />
        <p>{members[0]?.user?.fullName}</p>
      </div>
    );
  }

  return (
    <div onClick={() => console.log(channel)}>
      {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
    </div>
  )
}

export default TeamChannelPreview
