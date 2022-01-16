import React from "react";
import { useChatContext } from "stream-chat-react";
import styled from 'styled-components'

const EmptyState = () => {
  const { channel, client } = useChatContext();
  const members = Object.values(channel?.state?.members).filter(
    ({ user }) => user.id !== client.userID
  );

  const getUserText = () => {
    if (members.length === 1) {
      return (
        <EmptyUser>{`@${
          members[0].user.name || members[0].user.id
        }`}</EmptyUser>
      );
    }

    if (members.length === 2) {
      return (
        <EmptyUser>{`@${
          members[0].user.name || members[0].user.id
        } and @${members[1].user.name || members[1].user.id}`}</EmptyUser>
      );
    }

    let memberString = "";

    members.forEach((member, i) => {
      if (i !== members.length - 1) {
        memberString = `${memberString}@${
          member.user.name || member.user.id
        }, `;
      } else {
        memberString = `${memberString} and @${
          member.user.name || member.user.id
        }`;
      }
    });

    return (
      <EmptyUser>
        {memberString || "the Universe"}
      </EmptyUser>
    );
  };

  return (
    <EmptyContainer>
      <EmptyFirst>
        This is the beginning of your chat history
        {channel.type === "team" ? " in " : " with "}
        {channel.type === "team"
          ? `#${channel.data.name || channel.data.id}`
          : getUserText()}
      </EmptyFirst>
      <EmptySecond>
        Send messages, attachments, links, emojis, and more.
      </EmptySecond>
    </EmptyContainer>
  );
};

export default EmptyState

const EmptyContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: flex-end;
  margin-left: 20px;
  margin-right: 20px;
  padding-bottom: 20px;
`

const EmptyFirst = styled.div`
  font-weight: bold;
  font-size: 16px;
  line-height: 1.2;
  color: #2c2c30;
  margin-bottom: .5rem;
`;

const EmptySecond = styled.div`
  font-size: 14px;
  margin: 0;
  color: #858688;
`;

const EmptyUser = styled.div`
  color: #005fff;
`;