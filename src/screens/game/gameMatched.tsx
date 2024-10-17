import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Text, View} from 'react-native-ui-lib';
import {GroupChatBox} from '@app/components/chat/GroupChatBox';

const channelUrl: string =
  'sendbird_group_channel_376192352_6b910b86cc8ac5c1d15ec221ed05c45c6a274ad7';

export const GameMatched: NavioScreen = observer(({}) => {
  const {params} = useRoute<any>();
  const {game} = params;
  const {id} = game;

  return (
    <View flex useSafeArea>
      <GroupChatBox channelUrl={channelUrl} />
    </View>
  );
});

GameMatched.options = {
  headerShown: false,
};
