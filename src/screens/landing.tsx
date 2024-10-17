import React, {useCallback, useEffect} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Text, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {COLORS} from '@app/styles/color-schema';
// import {navio} from '@app/navio';
import {Image} from 'expo-image';
import {BButton} from '@app/components/button';
import {useServices} from '@app/services';
import {useConnection} from '@sendbird/uikit-react-native';

const NICKNAME = 'YOLO90';
const USER_ID = 'sendbird_desk_agent_id_2f7d9a15-a1e6-467c-9708-7e11a032e6ef';
const TOKEN = 'b007636ae8454eb6808529b5ed072be380ff120a';

export const Landing: NavioScreen = observer(({}) => {
  const {connect} = useConnection();

  const triggerSendbirdConnect = useCallback(() => {
    connect(USER_ID, {nickname: NICKNAME, accessToken: TOKEN})
      .then(_user => {
        console.log('Sendbird Connected');
        console.log(_user);
      })
      .catch(_err => {
        console.error('Sendbird connect error');
        console.error(_err);
      });
  }, [connect]);

  useEffect(() => {
    triggerSendbirdConnect();
  }, [triggerSendbirdConnect]);

  // const navigation = navio.useN();
  return (
    <View flex>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <UserProfileBanner />
        <QuickGameButton />
        <MyTeamButton />
        <LeaderboardButton />
      </ScrollView>
    </View>
  );
});

export const LeaderboardButton = (props: any) => {
  const {navio} = useServices();
  const onClickMyTeam = () => {
    navio.push('Leaderboard', {type: 'push'});
  };
  return (
    <View>
      <BButton label={'Leaderboard'} onPress={onClickMyTeam} />
    </View>
  );
};

export const QuickGameButton = (props: any) => {
  const {navio} = useServices();
  const onClickMyTeam = () => {
    navio.push('QuickGame', {type: 'push'});
  };
  return (
    <View>
      <BButton label={'Quick Game'} onPress={onClickMyTeam} />
    </View>
  );
};

export const MyTeamButton = (props: any) => {
  const {navio} = useServices();
  const onClickMyTeam = () => {
    navio.push('MyTeam', {type: 'push'});
  };
  return (
    <View>
      <BButton label={'My Team'} onPress={onClickMyTeam} />
    </View>
  );
};

export const UserProfileBanner = (props: any) => {
  return (
    <View
      flex
      backgroundColor={COLORS.primary}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 15,
      }}
    >
      <View>
        <ApplicationText secondary>Hi, William Pun</ApplicationText>
        <ApplicationText secondary>what will you do today?</ApplicationText>
      </View>
      <View>
        <Image
          source={
            'https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/en/full/BUS_20240928_BUS_241322_lebron-james-30-1.webp'
          }
          style={{width: 50, height: 50, borderRadius: 100}}
        />
      </View>
    </View>
  );
};

export const ApplicationText = (props: any) => {
  const textColor = props.secondary ? COLORS.textSecondary : COLORS.textPrimary;
  return <Text color={textColor}>{props.children}</Text>;
};

Landing.options = () => ({
  headerShown: false,
});
