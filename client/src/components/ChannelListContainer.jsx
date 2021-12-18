import React from 'react';
import { ChannelList, userChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './'
import { AiOutlineLogout } from 'react-icons/ai'

const CompanyHeader = () => {
  return (
    <div>
      <div>Header</div>
    </div>
  )
}

const SideBar = () => {
  return (
  <div>
          <AiOutlineLogout />
        </div>
  )
};

const ChannelListContainer = () => {
  return (
    <div>
      <SideBar />
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
