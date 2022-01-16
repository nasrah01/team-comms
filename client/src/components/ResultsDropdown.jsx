import React from "react";
import { Avatar, useChatContext } from "stream-chat-react";
import styled from 'styled-components';

const channelByUser = async ({
  client,
  setActiveChannel,
  channel,
  setChannel,
}) => {
  const filters = {
    type: "messaging",
    member_count: 2,
    members: { $eq: [client.user.id, client.userID] },
  };

  const [existingChannel] = await client.queryChannels(filters);

  if (existingChannel) return setActiveChannel(existingChannel);

  const newChannel = client.channel("messaging", {
    members: [channel.id, client.userID],
  });

  setChannel(newChannel);

  return setActiveChannel(newChannel);
};

const SearchResult = ({
  channel,
  focusedId,
  type,
  setChannel,
  setToggleContainer,
}) => {
  const { client, setActiveChannel } = useChatContext();

  if (type === "channel") {
    return (
      <ChannelWrapper
        onClick={() => {
          setChannel(channel);
          if (setToggleContainer) {
            setToggleContainer((prevState) => !prevState);
          }
        }}
        className={
          focusedId === channel.id
            ? "search__result-focused"
            : "search__result"
        }
      >
        <Hashtag>#</Hashtag>
        <Text>{channel.data.name}</Text>
      </ChannelWrapper>
    );
  }

  return (
    <UserWrapper
      onClick={async () => {
        channelByUser({ client, setActiveChannel, channel, setChannel });
        if (setToggleContainer) {
          setToggleContainer((prevState) => !prevState);
        }
      }}
      className={
        focusedId === channel.id
          ? "search__result-focused"
          : "search__result"
      }
    >
      <User>
        <Avatar
          image={channel.image || undefined}
          name={channel.name}
          size={24}
        />
        <Text>{channel.name}</Text>
      </User>
    </UserWrapper>
  );
};

const ResultsDropdown = ({
  teamChannels,
  directChannels,
  focusedId,
  loading,
  setChannel,
  setToggleContainer,
}) => {
  return (
    <ResultsContainer>
      <p>Channels</p>
      {loading && !teamChannels.length && (
        <p>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !teamChannels.length ? (
        <p>
          <i>No channels found</i>
        </p>
      ) : (
        teamChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="channel"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
      <p>Users</p>
      {loading && !directChannels.length && (
        <p>
          <i>Loading...</i>
        </p>
      )}
      {!loading && !directChannels.length ? (
        <p>
          <i>No direct messages found</i>
        </p>
      ) : (
        directChannels?.map((channel, i) => (
          <SearchResult
            channel={channel}
            focusedId={focusedId}
            key={i}
            setChannel={setChannel}
            type="user"
            setToggleContainer={setToggleContainer}
          />
        ))
      )}
    </ResultsContainer>
  );
};

export default ResultsDropdown;

const ResultsContainer = styled.div`
  position: absolute;
  height: fit-content;
  width: 30rem;
  background: #fff;
  border: 1px solid #e9e9ea;
  box-sizing: border-box;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.06);
  border-radius: 8px;
  z-index: 10;
  left: 23rem;
  top: 1.6rem;
  padding: 1rem;

  p {
    width: fit-content;
    display: flex;
    align-items: center;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 120%;
    color: #858688;
    margin-left: 12px;
  }

  i {
    font-weight: normal;
    margin-left: 12px;
  }
`;

const ChannelWrapper = styled.div`
  .search__results {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
  }

  .search__results-focus {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
  }
`;

const UserWrapper = styled.div`
  .search__results {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
  }

  .search__results-focus {
    width: 100%;
    height: 48px;
    display: flex;
    align-items: center;
  }
`;

const Hashtag = styled.div`
  height: 24px;
  width: 28px;
  background: #005fff;
  border-radius: 24px;
  margin: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Helvetica Neue, sans-serif;
  font-weight: bold;
  font-size: 14px;
  line-height: 120%;
  color: #ffffff;
`;

const Text = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: 14px;
  line-height: 120%;
  color: #2c2c30;
`;

const User = styled.div`
  display: flex;
  align-items: center;
  margin-left: 12px;
`;