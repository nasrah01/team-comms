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
    <div>
      <AiOutlineLogout onClick={logout}/>
    </div>
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

  const filters = {members: {$in: [client.userID]}};

  return (
    <div>
      <SideBar logout={logout}/>
      <div>
        <CompanyHeader />
        <ChannelSearch  setToggleContainer={setToggleContainer}/>
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelTeamFilter}
          List={(listProps) => {
            return (
              <TeamChannelList
                {...listProps}
                type="team"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
              />
            );
          }}
          Preview={(previewProps) => {
            return <TeamChannelPreview {...previewProps} type="team" />;
          }}
        />
        <ChannelList
          filters={filters}
          channelRenderFilterFn={channelMessagingFilter}
          List={(listProps) => {
            return (
              <TeamChannelList
                {...listProps}
                type="messaging"
                isCreating={isCreating}
                setIsCreating={setIsCreating}
                setCreateType={setCreateType}
                setIsEditing={setIsEditing}
              />
            );
          }}
          Preview={(previewProps) => {
            return <TeamChannelPreview {...previewProps} type="messaging" />;
          }}
        />
      </div>
    </div>
  );
}

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
  const [toggleContainer, setToggleContainer] = useState(false);
  return (
    <>
      <ChatContainer>
        <div>
          <ChannelListContent
            setIsCreating={setIsCreating}
            setCreateType={setCreateType}
            setIsEditing={setIsEditing}
          />
        </div>

        <div
          style={{
            display: "none",
            left: toggleContainer ? "0%" : "-89%",
            backgroundColor: "#005fff",
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
        </div>
      </ChatContainer>
    </>
  );
}

export default ChannelListContainer

const ChatContainer = styled.div`
  border: 5px solid red;
`
