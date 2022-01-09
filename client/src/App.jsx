import React, { useState } from 'react'
import Cookies from 'universal-cookie';
import { Chat } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { ChannelListContainer, ChannelContainer, Auth } from './components';
import 'stream-chat-react/dist/css/index.css';
import "./index.css";
import styled from "styled-components";

const apiKey = "8x9sft46tkdq";
const client = StreamChat.getInstance(apiKey);
const cookies = new Cookies();
const authToken = cookies.get('token');

if(authToken) {
  client.connectUser({
    name: cookies.get("username"),
    fullName: cookies.get("fullName"),
    id: cookies.get("userId"),
    avatar: cookies.get("avatar"),
    email: cookies.get("email"),
    hashedPassword: cookies.get("hashedPassword"),
  }, authToken);
}

function App() {
  const [createType, setCreateType] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  if(!authToken) return <Auth />
  return (
    <div>
      <ChannelContainerWrapper>
      <Chat client={client} theme="team light">
          <ChannelListContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
          <ChannelContainer
            isCreating={isCreating}
            setIsCreating={setIsCreating}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            createType={createType}
          />
      </Chat>
      </ChannelContainerWrapper>
    </div>
  );
}

export default App;

const ChannelContainerWrapper = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  box-shadow: rgba(0, 0, 0, 0.33) 0px 1px 4px 0px;
`;