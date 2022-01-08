import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { AiOutlineLogout } from 'react-icons/ai';
import styled from "styled-components";

const cookies = new Cookies();

const CompanyHeader = () => {
  return (
    <div>
      <div className="text-3xl font-bold underline">Header</div>
    </div>
  );
}

const SideBar = ({logout}) => {
  return (
    <SideBarContainer>
      <AiOutlineLogout onClick={logout}/>
    </SideBarContainer>
  )
};

const channelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === "team");
};

const channelMessagingFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};


const ChannelListContent = ({isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer}) => {

  const { client } = useChatContext();

  const logout = () => {
    cookies.remove('token');
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("avatar");
    cookies.remove("email");
    cookies.remove("hashedPassword");

    window.location.reload();
  }

  const filters = { members: { $in: [client.userID] } };

  return (
    <ListContainer>
      <SideBar logout={logout} />
      <ListWrapper>
        <CompanyHeader />
        <ChannelSearch setToggleContainer={setToggleContainer} />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelTeamFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="team"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="team"
            />
          )}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelMessagingFilter}
          List={(listProps) => (
            <TeamChannelList
              {...listProps}
              type="messaging"
              isCreating={isCreating}
              setIsCreating={setIsCreating}
              setCreateType={setCreateType}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
            />
          )}
          Preview={(previewProps) => (
            <TeamChannelPreview
              {...previewProps}
              setIsCreating={setIsCreating}
              setIsEditing={setIsEditing}
              setToggleContainer={setToggleContainer}
              type="messaging"
            />
          )}
        />
      </ListWrapper>
    </ListContainer>
  );
}

const ChannelListContainer = ({
  setCreateType,
  setIsCreating,
  setIsEditing,
}) => {
  const [toggleContainer, setToggleContainer] = useState(false);

  return (
    <>
      <ChatContainer
        style={{
          left: toggleContainer ? "0%" : "-89%",
        }}
      >
        <div
          onClick={() =>
            setToggleContainer((prevToggleContainer) => !prevToggleContainer)
          }
        ></div>
        <ChannelListContent
          setIsCreating={setIsCreating}
          setCreateType={setCreateType}
          setIsEditing={setIsEditing}
          setToggleContainer={setToggleContainer}
        />
      </ChatContainer>
    </>
  );
};

export default ChannelListContainer

const ChatContainer = styled.div`
  border: 5px solid red;
  background: red;
  height: 100vh;
`
const ListContainer = styled.div`
  background: orange;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #005fff;
  width: 240px;
`;
const SideBarContainer = styled.div`
  width: 72px;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #005fff;
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);
`;
