import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {useServices} from '@app/services';
import {GroupChannelListFragment} from '@app/screens/playground/sendbird-group-chat';

export const Chat: NavioScreen = observer((props: any) => {
  const {navio} = useServices();
  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
        // Navigate to GroupChannelCreate function.
        // navigation.navigate('GroupChannelCreateScreen', {channelType});

        navio.push('GroupChannelCreateScreen', {channelType});
      }}
      onPressChannel={channel => {
        navio.N.navigate('GroupChat', {screen: 'GroupChat', params: {channelUrl: channel.url}});
      }}
    />
  );
});

Chat.options = () => ({
  headerShown: false,
});
