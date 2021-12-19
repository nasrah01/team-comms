import React from 'react';
import { ChannelList, userChatContext } from 'stream-chat-react';
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

const ChannelListContainer = () => {

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
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList {...listProps} type="team" />;
          }}
          Preview={(previewProps) => {
            return <TeamChannelPreview {...previewProps} type="team" />;
          }}
        />
        <ChannelList
          filters={{}}
          channelRenderFilterFn={() => {}}
          List={(listProps) => {
            return <TeamChannelList {...listProps} type="messaging" />;
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
