import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './';
import styled from 'styled-components';

const ChannelSearch = ({ setToggleContainer }) => {
  const {client, setActiveChannel} = useChatContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [teamChannels, setTeamChannels] = useState([]);
  const [directChannels, setDirectChannels] = useState([]);

  useEffect(() => {
    if(!query) {
      setTeamChannels([]);
      setDirectChannels([]);
    }
  }, [query])

  const getChannels = async (text) => {
    try {

      const channelResponse = client.queryChannels({
        type: 'team', 
        name: { $autocomplete: text }, 
        members: { $in: [client.userID] }
      });

      const userResponse = client.queryUsers({
        id: { $ne: client.userID },
        name: { $autocomplete: text },
      });
      
      const [channels, { users }] = await Promise.all([channelResponse, userResponse]);

      if(channels.length) setTeamChannels(channels);
      if(users.length) setDirectChannels(users);

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

  const setChannel = (channel) => {
    setQuery('');
    setActiveChannel(channel);
  }

  return (
    <SearchContainer>
      <div>search Icon</div>
      <div>
        <input placeholder="" type="text" value={query} onChange={onSearch} />
      </div>
      {query && (
        <ResultsDropdown
          teamChannels={teamChannels}
          directChannels={directChannels}
          loading={loading}
          setChannel={setChannel}
          setQuery={setQuery}
          setToggleContainer={setToggleContainer}
        />
      )}
    </SearchContainer>
  );
}

export default ChannelSearch

const SearchContainer = styled.div`
  border: 5px solid green;
`