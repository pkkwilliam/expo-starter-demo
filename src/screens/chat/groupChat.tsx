import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {useRoute} from '@react-navigation/native';
import {GroupChatBox} from '@app/components/chat/GroupChatBox';

export const GroupChat: NavioScreen = observer(({}) => {
  const {params} = useRoute<any>();
  const {channelUrl} = params;

  return <GroupChatBox channelUrl={channelUrl} />;
});

GroupChat.options = {
  headerShown: false,
};
