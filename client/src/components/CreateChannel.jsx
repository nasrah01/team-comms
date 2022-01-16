import React, { useState } from "react";
import { useChatContext } from 'stream-chat-react';
import { UserList } from './';
import { CloseCreateChannel } from "../assets/CloseCreateChannel";
import styled from 'styled-components';

const ChannelNameInput = ({ channelName='', setChannelName}) => {

  const handleChange = (e) => {
    e.preventDefault();
    setChannelName(e.target.value)
  }

  return (
    <InputWrapper>
      <p>Name</p>
      <input value={channelName} onChange={handleChange} placeholder="channel-name (no spaces)" />
      <p>Add Members</p>
    </InputWrapper>
  )
};

const CreateChannel = ({ createType, setIsCreating }) => {
  const { client, setActiveChannel } = useChatContext();
  const [selectedUsers, setSelectedUsers] = useState([client.userID || ""]);
  const [channelName, setChannelName] = useState("");

  const createChannel = async (e) => {
    e.preventDefault();

    try {
      const newChannel = await client.channel(createType, channelName, {
        name: channelName,
        members: selectedUsers,
      });

      await newChannel.watch();

      setChannelName("");
      setIsCreating(false);
      setSelectedUsers([client.userID]);
      setActiveChannel(newChannel);
    } catch (error) {
      console.log(error);
    }
  };
 
  return (
    <CreateContainer>
      <HeaderWrapper>
        <p>
          {createType === "team"
            ? "Create a New Channel"
            : "Send a Direct Message"}
        </p>
        <CloseCreateChannel setIsCreating={setIsCreating} />
      </HeaderWrapper>
      {createType === "team" && (
        <ChannelNameInput
          channelName={channelName}
          setChannelName={setChannelName}
        />
      )}
      <UserList setSelectedUsers={setSelectedUsers} />
      <CreateButton onClick={createChannel}>
        <p>{createType === 'team' ? 'Create Channel' : 'Create Message Group'}</p>
      </CreateButton>
    </CreateContainer>
  );
};

export default CreateChannel;


const CreateContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 62px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);
  padding-right: 20px;

  p {
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 18px;
    line-height: 22px;
    color: #2c2c30;
    margin-left: 20px;
  }

  svg {
    cursor: pointer;
  }
`;

const CreateButton = styled.div`
  height: 82px;
  background: #f7f6f8;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom-right-radius: 16px;

  p {
    background: var(--primary-color);
    font-family: Helvetica Neue, sans-serif;
    font-weight: bold;
    font-size: 18px;
    padding: 10px 20px;
    color: #ffffff;
    margin-right: 30px;
    border-radius: 8px;
    cursor: pointer;
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 169px;
  padding-left: 20px;
  box-shadow: 0px 1px 0px rgba(0, 0, 0, 0.1);

  p {
    font-family: Helvetica Neue, sans-serif;
    font-size: 16px;
    line-height: 120%;
    color: #2c2c30;
    margin-top: 30px;
  }

  input {
    font-family: Helvetica Neue, sans-serif;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.5);
    height: 50px;
    width: 540px;
    background: #f7f6f8;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 8px;
    padding-left: 16px;
  }

  input:focus {
    border: 1px solid var(--primary-color);
    outline: none;
  }

  input::placeholder {
    font-weight: 300;
    color: rgba(0, 0, 0, 0.5);
  }
`;