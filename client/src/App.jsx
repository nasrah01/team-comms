import React from 'react'
import Cookies from 'universal-cookie';
import { Chat } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { ChannelListContainer, ChannelContainer, Auth } from './components';

const apiKey = "8x9sft46tkdq";
const client = StreamChat.getInstance(apiKey);
const authToken = false;

function App() {

  if(!authToken) return <Auth />
  return (
    <div>
      <Chat client={client} theme='team light'>
        <ChannelListContainer />
        <ChannelContainer />
      </Chat>
    </div>
  );
}

export default App;
