import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {createGroupChannelFragment, useSendbirdChat} from '@sendbird/uikit-react-native';
import {useGroupChannel} from '@sendbird/uikit-chat-hooks';

export const GroupChannelFragment = createGroupChannelFragment({Header: () => null});

export const GroupChatBox = (props: any) => {
  const navigation = useNavigation<any>();
  const {sdk} = useSendbirdChat();
  const {channelUrl} = props;
  const {channel} = useGroupChannel(sdk, channelUrl);
  console.log(channel);
  if (!channel) {
    return null;
  }

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        // Navigate to GroupChannelList function.
        navigation.navigate('GroupChannelList');
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
      onPressHeaderRight={() => {
        // Navigate to GroupChannelSettings function.
        navigation.navigate('GroupChannelSettings', {channelUrl});
      }}
    />
  );
};
