import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {useRoute} from '@react-navigation/native';
import {Button, Card, Colors, Dialog, Text, View} from 'react-native-ui-lib';
import {GroupChatBox} from '@app/components/chat/GroupChatBox';
import {Game} from '@app/utils/types/game';
import {ApplicationSafeView} from '@app/components/ApplicationSafeView';
import {Team} from '@app/utils/types/Team';
import {Image} from 'expo-image';
import {GameProgress} from '@app/utils/types/gameProgress';
import {push, resetToHomeTab, setRoot} from '@app/utils/NavioUtil';
import {useServices} from '@app/services';
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
          <QuitButton gameProgress={gameProgress} />
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
  const {gameProgress} = props.game;
  if (gameProgress === GameProgress.MATCHING) {
    return <MatchedController />;
  } else if (gameProgress === GameProgress.STARTED) {
    return <StartedController />;
  } else if (gameProgress === GameProgress.ENTER_SCORE) {
    return <EnterScoreController />;
  }
};

const EnterScoreController = () => {
  return (
    <View>
      <Text>Enter Score Controller</Text>
      <Button label={'Enter Score'} />
    </View>
  );
};

const MatchedController = () => {
  return (
    <View>
      <Text>Matched Controller</Text>
      <Button label={'Start'} />
    </View>
  );
};

const StartedController = () => {
  return (
    <View>
      <Text>Started Controller</Text>
      <Button label={'Game Finished'} />
    </View>
  );
};

const QuitButton = (props: {gameProgress: GameProgress}) => {
  const {navio} = useServices();
  const [showDialog, setShowDialog] = React.useState(false);
  const onPressQuit = () => {
    setShowDialog(true);
  };
  const onConfirmQuit = () => {
    setShowDialog(false);
    setTimeout(() => {
      resetToHomeTab(navio);
    }, 800);
  };

  const {gameProgress} = props;

  const content =
    gameProgress === GameProgress.STARTED
      ? 'Are you sure you want to quit? this will consider you lose the game and reduce part of the credit.'
      : 'Are you sure you want to quit?';
  return (
    <>
      <ConfirmationDialog
        content={content}
        cancelText={'Cancel'}
        okText={'Yes'}
        onClickCancel={() => {
          setShowDialog(false);
        }}
        onClickOk={onConfirmQuit}
        title={'Quit'}
        visible={showDialog}
      />
      <Button label={'Quit'} size={'small'} link linkColor={Colors.red10} onPress={onPressQuit} />
    </>
  );
};

const ConfirmationDialog = (props: {
  content: string;
  cancelText: string;
  okText: string;
  onClickCancel: any;
  onClickOk: any;
  title: string;
  visible: boolean;
}) => {
  return (
    <Dialog visible={props.visible} panDirection={'right'} onDismiss={props.onClickCancel}>
      <Card padding-15>
        <Text text50BO>{props.title}</Text>
        <Text text80 marginT-10>
          {props.content}
        </Text>
        <View row style={{justifyContent: 'space-around'}} marginT-20>
          <Button label={props.okText} onPress={props.onClickOk} link />
          <Button
            label={props.cancelText}
            onPress={props.onClickCancel}
            link
            linkColor={Colors.grey30}
          />
        </View>
      </Card>
    </Dialog>
  );
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
