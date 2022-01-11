import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { ResultsDropdown } from './';
import { AiOutlineSearch } from 'react-icons/ai';
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
      <SearchWrapper>
      <div>
        <AiOutlineSearch size={16}/>
      </div>
      <input placeholder='Search' type="text" value={query} onChange={onSearch} />
      </SearchWrapper>
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
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 16px;
  border-top: 1px solid #00000033;
`;

const SearchWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  margin-bottom: 8px;
  border: 1px solid transparent;
  color: white;

  input {
    background: none;
    border: none;
    color: #fff;
    font-family: Helvetica Neue, sans-serif;
    font-size: 16px;
    outline: none;

    ::placeholder {
      color: rgba(255, 255, 255, 0.66);
    }
  }
`;