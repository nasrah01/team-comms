import React, { useState } from "react";
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from "stream-chat-react";
import {ChannelInfo} from '../assets/ChannelInfo';
import styled from 'styled-components';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
  const [giphyState, setGiphyState] = useState(false);
  const { sendMessage } = useChannelActionContext();

  const overrideSubmitHandler = (message) => {
    let updatedMessage = {
      attachments: message.attachments,
      mentioned_users: message.mentioned_users,
      parent_id: message.parent?.id,
      parent: message.parent,
      text: message.text,
    };

    if (giphyState) {
      updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
    }

    if (sendMessage) {
      sendMessage(updatedMessage);
      setGiphyState(false);
    }
  };

  return (
    <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
      <div style={{ display: "flex", width: "100%" }}>
        <Window>
          <TeamChannelHeader setIsEditing={setIsEditing} />
          <MessageList />
          <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
        </Window>
        <Thread />
      </div>
    </GiphyContext.Provider>
  );
};

const TeamChannelHeader = ({ setIsEditing }) => {
  const { channel, watcher_count } = useChannelStateContext();
  const { client } = useChatContext();

  const MessagingHeader = () => {
    const members = Object.values(channel.state.members).filter(
      ({ user }) => user.id !== client.userID
    );
    const additionalMembers = members.length - 3;

    if (channel.type === "messaging") {
      return (
        <UserContainer>
          {members.map(({ user }, i) => (
            <UserWrapper key={i}>
              <Avatar
                image={user.image}
                name={user.fullName || user.id}
                size={28}
              />
              <p>
                {user.fullName || user.id}
              </p>
            </UserWrapper>
          ))}

          {additionalMembers > 0 && (
            <p>
              and {additionalMembers} more
            </p>
          )}
        </UserContainer>
      );
    }

    return (
      <div>
        <p># {channel.data.name}</p>
        <span style={{ display: "flex", width: "100%" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </div>
    );
  };

  const getWatcherText = (watchers) => {
    if (!watchers) return "No users online";
    if (watchers === 1) return "1 user online";
    return `${watchers} users online`;
  };

  return (
    <MessagingContainer>
      <Wrapper>
        <MessagingHeader />
        <OnlineUsers>
          <p>{getWatcherText(watcher_count)}</p>
        </OnlineUsers>
      </Wrapper>
    </MessagingContainer>
  );
};

export default ChannelInner;

const MessagingContainer = styled.div`
  border: 5px solid yellow;
  display: flex;
  padding: 2rem 1rem;
`

const Wrapper = styled.div`
  border: 1px solid pink;
  display: flex;
  font-size: clamp(1rem, 1.5vw, 1.5rem);
`;

const UserContainer = styled.div`
  border: 1px solid green;
  display: flex;
  align-items: center;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`

const OnlineUsers = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
`