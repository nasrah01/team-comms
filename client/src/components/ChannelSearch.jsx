import React, { useState } from 'react';
//import { getChannel, useChatContext } from 'stream-chat-react';

const ChannelSearch = () => {

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const getChannels = async (text) => {
    try {
      //to set up
    } catch (error) {
      setQuery('')
    }
  }

  const onSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setQuery(e.target.value);
    getChannels(e.target.value);
  }

  return (
    <div>
      <div>
        search Icon
      </div>
      <input placeholder='' type= 'text' value={query} onChange={onSearch} />
    </div>
  )
}

export default ChannelSearch
