import React from 'react';
import { ChannelList } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import { AiOutlineLogout } from 'react-icons/ai'

const cookies = new Cookies();

const CompanyHeader = () => {
  return (
    <div>
      <div>Header</div>
    </div>
  )
}

const SideBar = ({logout}) => {
  return (
    <div>
      <AiOutlineLogout onClick={logout}/>
    </div>
  )
};

const channelTeamFilter = (channels) => {
  return channels.filter((channel) => channel.type === 'team');
}

const channelMessageFilter = (channels) => {
  return channels.filter((channel) => channel.type === "messaging");
};

const ChannelListContainer = ({isCreating, setIsCreating, setCreateType, setIsEditing}) => {

  const logout = () => {
    cookies.remove('token');
    cookies.remove("username");
    cookies.remove("fullName");
    cookies.remove("userId");
    cookies.remove("email");
    cookies.remove("hashedPassword");

    window.location.reload();
  }

  return (
    <div>
      <SideBar logout={logout}/>
      <div>
        <CompanyHeader />
        <ChannelSearch />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {channelTeamFilter()}}
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
          filters={{}}
          channelRenderFilterFn={() => {channelMessageFilter()}}
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

export default ChannelListContainer
