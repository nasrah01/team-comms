import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { AiOutlineLogout, AiOutlineTeam } from "react-icons/ai";
import styled from "styled-components";

const cookies = new Cookies();

const CompanyHeader = () => {
  return (
    <HeaderContainer>
      <p>Team Chat</p>
    </HeaderContainer>
  );
}

const SideBar = ({logout}) => {
  return (
    <SideBarContainer>
      <HeaderIcon>
        <AiOutlineTeam size={32}/>
      </HeaderIcon>
      <LogoutIcon>
        <AiOutlineLogout onClick={logout} size={32}/>
      </LogoutIcon>
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
    cookies.remove("avatarURL");
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
  );
};

export default ChannelListContainer

const ChatContainer = styled.div`
  display: flex;
  width: 30%;
`
const ListContainer = styled.div`
  display: flex;
  width: 100%;
`

const ListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #0554f2;
  width: 80%;
`;

const SideBarContainer = styled.div`
  width: 20%;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)),
    #0554f2;
  box-shadow: 1px 0px 0px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: #fff;
  padding-top: 1rem;

  div {
    padding: 1rem 0;
  }
`;

const HeaderIcon = styled.div`
  cursor: pointer;
`

const LogoutIcon = styled.div`
cursor: pointer;
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  height: 65px;
  color: #fff;
  font-size: clamp(1.5rem, 2vw, 3rem);
  font-family: cursive;
  padding-left: .75rem;
`;
