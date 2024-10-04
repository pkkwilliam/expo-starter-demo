import {useNavigation, useRoute} from '@react-navigation/native';
import {
  useSendbirdChat,
  createGroupChannelListFragment,
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
} from '@sendbird/uikit-react-native';
import {useGroupChannel} from '@sendbird/uikit-chat-hooks';
import {observer} from 'mobx-react';
import {NavioScreen} from 'rn-navio';
import {useServices} from '@app/services';

export const GroupChannelListFragment = createGroupChannelListFragment();
export const GroupChannelCreateFragment = createGroupChannelCreateFragment();
export const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelListScreen: NavioScreen = observer(({}) => {
  const {navio} = useServices();
  const navigation = useNavigation<any>();
  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
        // Navigate to GroupChannelCreate function.
        // navigation.navigate('GroupChannelCreateScreen', {channelType});
        navio.push('GroupChannelCreateScreen', {channelType});
      }}
      onPressChannel={channel => {
        // Navigate to GroupChannel function.
        navio.push('GroupChannelScreen', {channelUrl: channel.url});
        // navigation.navigate('GroupChannel', {channelUrl: channel.url});
      }}
    />
  );
});

export const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async channel => {
        // Navigate to GroupChannel function.
        navigation.replace('GroupChannelScreen', {channelUrl: channel.url});
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
    />
  );
};

export const GroupChannelScreen: NavioScreen = observer(({}) => {
  const navigation = useNavigation<any>();
  const {params} = useRoute<any>();

  const {sdk} = useSendbirdChat();
  const {channel} = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

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
        navigation.navigate('GroupChannelSettings', {channelUrl: params.channelUrl});
      }}
    />
  );
});
