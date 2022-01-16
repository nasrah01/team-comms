import React, {useEffect, useState} from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';
import { Invite } from '../assets/Invite';

const ListContainer = ({ children }) => {
  return (
    <UserContent>
      <UserHeader>
        <p>User</p>
        <p>Invite</p>
      </UserHeader>
      {children}
    </UserContent>
  )
}

const UserItem = ({ user, setSelectedUsers }) => {
   const [selected, setSelected] = useState(false);

   const handleSelect = () => {
     if (selected) {
       setSelectedUsers((prevUsers) =>
         prevUsers.filter((prevUser) => prevUser !== user.id)
       );
     } else {
       setSelectedUsers((prevUsers) => [...prevUsers, user.id]);
     }

     setSelected((prevSelected) => !prevSelected);
   };

   return (
     <SelectContainer onClick={handleSelect}>
       <SelectWrapper>
         <Avatar image={user.image} name={user.fullName || user.id} size={32} />
         <p>{user.fullName || user.id}</p>
       </SelectWrapper>
       {selected ? <Invite /> : <UserInviteEmpty></UserInviteEmpty>}
     </SelectContainer>
   );
}

const UserList = ({ setSelectedUsers }) => {
  const { client } = useChatContext();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [listEmpty, setListEmpty] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      if (loading) return;

      setLoading(true);

      try {
        const response = await client.queryUsers(
          { id: { $ne: client.userID } },
          { id: 1 },
          { limit: 8 }
        );

        if (response.users.length) {
          setUsers(response.users);
        } else {
          setListEmpty(true);
        }
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };

    if (client) getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (error) {
    return (
      <ListContainer>
        <UserMessage>
          Error loading, please refresh and try again.
        </UserMessage>
      </ListContainer>
    );
  }

  if (listEmpty) {
    return (
      <ListContainer>
        <UserMessage>No users found.</UserMessage>
      </ListContainer>
    );
  }

  return (
    <ListContainer>
      {loading ? (
        <UserMessage>Loading users...</UserMessage>
      ) : (
        users?.map((user, i) => (
          <UserItem
            index={i}
            key={user.id}
            user={user}
            setSelectedUsers={setSelectedUsers}
          />
        ))
      )}
    </ListContainer>
  );
}

export default UserList

const UserContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;

  p {
    font-size: 14px;
    line-height: 17px;
    color: #858688;
    margin-top: 16px;
  }

  p:first-child {
    width: 60%;
  }

  p:nth-child(2) {
    width: 30%;
  }
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 2rem;
  margin-top: 1rem;
  margin-bottom: 1rem;

  &::hover {
    background: #f7f6f8;
    cursor: pointer;
  }

  p {
    font-size: 14px;
    line-height: 17px;
    color: #2c2c30;
  }
`;

const SelectWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 60%;

  p {
    font-weight: 500;
  }
`;

const UserInviteEmpty = styled.div`
  height: 28px;
  width: 28px;
  background: #f7f6f8;
  border: 1px solid #dedddf;
  border-radius: 14px;
  box-sizing: border-box;
  margin-left: 2px;
`;

const UserMessage = styled.div`
  font-size: 16px;
  color: #2c2c30;
  margin: 20px;
`;