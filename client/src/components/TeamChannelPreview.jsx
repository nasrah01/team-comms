import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import styled from 'styled-components';

const TeamChannelPreview = ({
  setActiveChannel,
  setIsCreating,
  setIsEditing,
  setToggleContainer,
  channel,
  type,
}) => {
  const { channel: activeChannel, client } = useChatContext();

  const ChannelPreview = () => (
    <ChannelWrapper>
      <p># {channel?.data?.name || channel?.data?.id}</p>
    </ChannelWrapper>
  );

  const DirectPreview = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );

    return (
      <DirectWrapper>
        <Avatar
          image={members[0]?.user?.image}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={24}
        />
        <p>{members[0]?.user?.fullName || members[0]?.user?.id}</p>
      </DirectWrapper>
    );
  };

  return (
    <PreviewContainer
      className={
        channel?.id === activeChannel?.id
          ? "container__selected"
          : "container__wrapper"
      }
      onClick={() => {
        setIsCreating(false);
        setIsEditing(false);
        setActiveChannel(channel);
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
    >
      {type === "team" ? <ChannelPreview /> : <DirectPreview />}
    </PreviewContainer>
  );
};

export default TeamChannelPreview;

const PreviewContainer = styled.div`
  
`

const ChannelWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: Helvetica Neue, sans-serif;
  font-size: 14px;
  color: #ffffff;
  padding-left: 26px;
  height: 100%;
  width: 100%;
  text-overflow: ellipsis;
`

const DirectWrapper = styled.div`
  display: flex;
  align-items: center;
  font-family: Helvetica Neue, sans-serif;
  font-size: 14px;
  color: #ffffff;
  padding-left: 26px;
  height: 100%;
  width: 100%;
  text-overflow: ellipsis;
`;