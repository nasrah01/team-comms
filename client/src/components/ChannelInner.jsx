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
      <div style={{ display: "flex", width: "100%"}}>
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
                size={24}
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
      <EditingChannel>
        <p>{channel.data.name}</p>
        <span style={{ display: "flex", width: "100%" }} onClick={() => setIsEditing(true)}>
          <ChannelInfo />
        </span>
      </EditingChannel>
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
  display: flex;
  padding: 2rem;
  border-bottom: 1px solid #e6e6e6;
  height: 65px;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UserContainer = styled.div`
  display: flex;
  align-items: center;
`

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: #2c2c30;
  padding-right: 2rem;
`;

const OnlineUsers = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.2rem;
  color: #858688;
`;

const EditingChannel = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 1.4rem;
  color: #2c2c30;

  p {
    padding-right: 0.75rem;
  }
`;