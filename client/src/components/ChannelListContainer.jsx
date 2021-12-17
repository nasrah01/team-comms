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
  return <div>
          <AiOutlineLogout />
        </div>
};

const ChannelListContainer = () => {
  return (
    <div>
      <SideBar />
      <CompanyHeader />
      <ChannelSearch />
    </div>
  )
}

export default ChannelListContainer
