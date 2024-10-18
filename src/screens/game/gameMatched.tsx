import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {CommonActions, useNavigation, useRoute} from '@react-navigation/native';
import {Button, Text, View} from 'react-native-ui-lib';
import {GroupChatBox} from '@app/components/chat/GroupChatBox';
import {Game} from '@app/utils/types/game';
import {ApplicationSafeView} from '@app/components/ApplicationSafeView';
import {Team} from '@app/utils/types/Team';
import {Image} from 'expo-image';
import {GameProgress} from '@app/utils/types/gameProgress';
import {goBack, push, setRoot} from '@app/utils/NavioUtil';
import {useServices} from '@app/services';
import {Alert} from 'react-native';
import {useStores} from '@app/stores';

const channelUrl: string =
  'sendbird_group_channel_376192352_6b910b86cc8ac5c1d15ec221ed05c45c6a274ad7';

export const GameMatched: NavioScreen = observer(({}) => {
  const {gameStore} = useStores();
  const game = gameStore.game;
  if (!game) {
    return null;
  }
  console.log('useRoute', useRoute());
  console.log('game', game);

  const {awayTeamDto, gameProgress, homeTeamDto} = game;

  return (
    <ApplicationSafeView useSafeAreaTop>
      <View flex>
        <Text center grey30>
          -------- Game Detail --------
        </Text>
        <View paddingH-20>
          <Text green20>{gameProgress}</Text>
          <Text text80>Home Team</Text>
          <TeamBanner team={homeTeamDto} />
          <Text text80>Away Team</Text>
          <TeamBanner team={awayTeamDto} />
          <Controller game={game} />
        </View>
        <Text center grey30 margin-10>
          -------- Chat --------
        </Text>
        <GroupChatBox channelUrl={channelUrl} />
      </View>
    </ApplicationSafeView>
  );
});

const Controller = (props: {game: Game}) => {
  const {navio} = useServices();
  const {gameProgress} = props.game;
  const onPressUtilPush = () => {
    push('GameResultStack', 'GameResult', {hee: 'go'}, navio);
  };
  const onPressPush = () => {
    navio.push('GameResult', {hee: 'go'});
  };
  const onPressResetRoot = () => {
    setRoot('GameResultStack', navio);
  };
  if (gameProgress === GameProgress.MATCHING) {
    return (
      <View style={{flexDirection: 'row'}}>
        <Button label={'Ready To Start'} />
        <Button label={'Start'} disabled />
      </View>
    );
  } else if (gameProgress === GameProgress.STARTED) {
    return (
      <View style={{flexDirection: 'row'}}>
        {/*<Button label={'Finshed and Enter Score'} />*/}
        <Button label={'Util Push'} onPress={onPressUtilPush} />
        <Button label={'Push'} onPress={onPressPush} />
        <Button label={'Reset Root'} onPress={onPressResetRoot} />
      </View>
    );
  }
};

const TeamBanner = (props: {team: Team}) => {
  const {team} = props;
  if (!team) {
    return null;
  }
  const {id, name, teamMembers} = team;
  const UserAvatars = teamMembers.map(teamMember => {
    return <TeamMember userProfile={teamMember} />;
  });
  return (
    <View style={{alignItems: 'flex-start'}}>
      <Text text80BO>{id}</Text>
      <View style={{flexDirection: 'row'}}>{UserAvatars}</View>
    </View>
  );
};

const TeamMember = (props: {userProfile: UserProfile}) => {
  const {imageUrl, nickname} = props.userProfile;
  const trimmedNickname =
    nickname.length < 8 ? nickname : `...${nickname.substring(nickname.length - 8)}`;
  return (
    <View centerH marginR-8>
      <Image source={imageUrl} style={{width: 50, height: 50, borderRadius: 100}} />
      <Text text80>{trimmedNickname}</Text>
    </View>
  );
};

GameMatched.options = {
  headerShown: false,
};
