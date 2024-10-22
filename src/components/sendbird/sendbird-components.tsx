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
import useSendbirdService from '@app/components/sendbird/hook/sendbird-service';

export const GroupChannelListFragment = createGroupChannelListFragment();
export const GroupChannelCreateFragment = createGroupChannelCreateFragment();
export const GroupChannelFragment = createGroupChannelFragment();

export const SendbirdGroupChannelListScreen: NavioScreen = observer(({}) => {
  const {navio} = useServices();
  const navigation = useNavigation<any>();
  const {isConnected} = useSendbirdService();
  return (
    <GroupChannelListFragment
      onPressCreateChannel={channelType => {
    // Navigate to GroupChannelCreate function.
    // navigation.navigate('GroupChannelCreateScreen', {channelType});
    navio.push('SendbirdGroupChannelCreateScreen', {channelType});
  }}
  onPressChannel={channel => {
    // Navigate to GroupChannel function.
    navio.push('SendbirdGroupChannelScreen', {channelUrl: channel.url});
    // navigation.navigate('GroupChannel', {channelUrl: channel.url});
  }}
  />
);
});
SendbirdGroupChannelListScreen.options = {
  headerShown: false
}

export const SendbirdGroupChannelCreateScreen = () => {
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

export const SendbirdGroupChannelScreen: NavioScreen = observer(({}) => {
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
SendbirdGroupChannelScreen.options = {
  headerShown: false
}