import React, {useEffect, useState} from 'react';
import { Avatar, useChatChannel } from 'stream-chat-react';
import { FcInvite } from 'react-icons/fc';

const ListContainer = ({ children }) => {
  return (
    <div>
      <div>
        <p>User</p>
        <p>Invite</p>
      </div>
    </div>
  )
}

const UserList = () => {
  return (
    <div>
      user list
    </div>
  )
}

export default UserList
