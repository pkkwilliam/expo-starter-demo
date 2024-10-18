import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {useRoute} from '@react-navigation/native';
import {GroupChatBox} from '@app/components/chat/GroupChatBox';
import {ApplicationSafeView} from '@app/components/ApplicationSafeView';

export const GroupChat: NavioScreen = observer(({}) => {
  const {params = {}} = useRoute<any>();
  const {channelUrl} = params;
  return (
    <ApplicationSafeView useSafeAreaTop>
      <GroupChatBox channelUrl={channelUrl} />
    </ApplicationSafeView>
  );
});

GroupChat.options = {
  headerShown: false,
};
