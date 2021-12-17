import React from 'react'
import Cookies from 'universal-cookie';
import { Chat } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import { ChannelListContainer, ChannelContainer } from './components';

const apiKey = "8x9sft46tkdq";
const client = StreamChat.getInstance(apiKey);

function App() {
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
