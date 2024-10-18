import React, {useEffect, useState} from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Button, Card, Colors, TabController, Text, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {Game} from '@app/utils/types/game';
import {TeamType} from '@app/utils/types/TeamType';
import {useServices} from '@app/services';
import {GameProgress} from '@app/utils/types/gameProgress';
import {setRoot} from '@app/utils/NavioUtil';
import {useStores} from '@app/stores';

export const QuickGame: NavioScreen = observer(({}) => {
  const teamTypes = [
    {key: TeamType.ONE_VS_ONE, label: '1 vs 1'},
    {key: TeamType.THREE_VS_THREE, label: '3 vs 3', labelColor: Colors.grey50, ignore: true},
    {key: TeamType.FOUR_VS_FOUR, label: '4 vs 4', labelColor: Colors.grey50, ignore: true},
    {key: TeamType.FIVE_VS_FIVE, label: '5 vs 5', labelColor: Colors.grey50, ignore: true},
  ];

  const TabPages = teamTypes.map(({key, label}, index) => {
    return (
      <TabController.TabPage index={index}>{<PageContent teamType={key} />}</TabController.TabPage>
    );
  });

  return (
    <View flex useSafeArea>
      <TabController items={teamTypes}>
        <TabController.TabBar enableShadows />
        <View flex>{TabPages}</View>
      </TabController>
      <QuickMatchCode />
    </View>
  );
});

const PageContent = (props: {teamType: TeamType}) => {
  const [games, setGames] = useState<Game[]>([]);
  const GameCardList = games.map(game => <GameCard game={game} />);

  const getGames = async () => {
    setGames(MOCK_GAMES);
  };

  useEffect(() => {
    getGames();
  }, [props.teamType]);

  return (
    <ScrollView contentInsetAdjustmentBehavior="always">
      <View padding-20>{GameCardList}</View>
    </ScrollView>
  );
};

const GameCard = (props: {game: Game}) => {
  const {navio} = useServices();
  const {gameStore} = useStores();
  const {game} = props;
  const onClickJoinGame = () => {
    gameStore.set('game', game);
    setRoot('GameMatchedStack', navio);
  };

  return (
    <Card flex row padding-20 marginB-20>
      <View row centerV>
        <View>
          <Text text80BO>{game.id}</Text>
        </View>
        <View>
          <Button label={'Join'} size={Button.sizes.small} onPress={onClickJoinGame} />
        </View>
      </View>
    </Card>
  );
};

const QuickMatchCode = (props: any) => {
  return (
    <View center row>
      <Text>Your Quick Match Code</Text>
      <Text marginL-10 text40BO>
        1234
      </Text>
    </View>
  );
};

const MOCK_GAMES: Game[] = [
  {
    id: '670efc8805b4aa1cf58a1c9d',
    awayTeamScore: 0,
    createTime: null,
    countId: null,
    endTime: null,
    homeTeamScore: 0,
    gameType: 'QUICK_GAME',
    gameProgress: GameProgress.MATCHING,
    scoreCalculateType: null,
    teamType: 'ONE_VS_ONE',
    updateTime: null,
    awayTeamDto: null,
    court: null,
    homeTeamDto: {
      id: '66f75c862c4ea34a54b6b151',
      captainId: '66f75c862c4ea34a54b6b150',
      name: 'Name1',
      rating: 0,
      season: 1,
      teamStatus: 'ACTIVE',
      teamType: 'ONE_VS_ONE',
      teamMemberIds: ['66f75c862c4ea34a54b6b150'],
      teamMembers: [
        {
          createTime: '2024-09-28T01:31:50.323Z',
          countryCode: '853',
          email: null,
          imageUrl:
            'https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/en/full/BUS_20240928_BUS_241322_lebron-james-30-1.webp',
          grantedRoles: ['ROLE_USER'],
          gender: null,
          name: null,
          nickname: '一起打籃球',
          smsNumber: '63530392',
          status: 'ACTIVE',
          updateTime: '2024-10-15T23:37:58.268Z',
          username: '',
          sid: '66f75c862c4ea34a54b6b150',
          enabled: true,
          accountNonExpired: true,
          accountNonLocked: true,
          authorities: ['ROLE_USER'],
          credentialsNonExpired: true,
        },
        {
          createTime: '2024-09-28T01:31:50.323Z',
          countryCode: '853',
          email: null,
          imageUrl:
            'https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/en/full/BUS_20240928_BUS_241322_lebron-james-30-1.webp',
          grantedRoles: ['ROLE_USER'],
          gender: null,
          name: null,
          nickname: 'Nickname123123123123',
          smsNumber: '63530392',
          status: 'ACTIVE',
          updateTime: '2024-10-15T23:37:58.268Z',
          username: '',
          sid: '66f75c862c4ea34a54b6b150',
          enabled: true,
          accountNonExpired: true,
          accountNonLocked: true,
          authorities: ['ROLE_USER'],
          credentialsNonExpired: true,
        },
      ],
    },
  },
  {
    id: '670efc8805b4aa1cf58a1c9d',
    awayTeamScore: 0,
    createTime: null,
    countId: null,
    endTime: null,
    homeTeamScore: 0,
    gameType: 'QUICK_GAME',
    gameProgress: GameProgress.STARTED,
    scoreCalculateType: null,
    teamType: 'ONE_VS_ONE',
    updateTime: null,
    awayTeamDto: {
      id: '66f75c862c4ea34a54b6b151',
      captainId: '66f75c862c4ea34a54b6b150',
      name: null,
      rating: 0,
      season: 1,
      teamStatus: 'ACTIVE',
      teamType: 'ONE_VS_ONE',
      teamMemberIds: ['66f75c862c4ea34a54b6b150'],
      teamMembers: [
        {
          createTime: '2024-09-28T01:31:50.323Z',
          countryCode: '853',
          email: null,
          imageUrl:
            'https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/en/full/BUS_20240928_BUS_241322_lebron-james-30-1.webp',
          grantedRoles: ['ROLE_USER'],
          gender: null,
          name: 'Name1',
          nickname: 'Nickname123123123123',

          smsNumber: '63530392',
          status: 'ACTIVE',
          updateTime: '2024-10-15T23:37:58.268Z',
          username: '',
          sid: '66f75c862c4ea34a54b6b150',
          enabled: true,
          accountNonExpired: true,
          accountNonLocked: true,
          authorities: ['ROLE_USER'],
          credentialsNonExpired: true,
        },
      ],
    },
    court: null,
    homeTeamDto: {
      id: '66f75c862c4ea34a54b6b151',
      captainId: '66f75c862c4ea34a54b6b150',
      name: 'Name1',
      rating: 0,
      season: 1,
      teamStatus: 'ACTIVE',
      teamType: 'ONE_VS_ONE',
      teamMemberIds: ['66f75c862c4ea34a54b6b150'],
      teamMembers: [
        {
          createTime: '2024-09-28T01:31:50.323Z',
          countryCode: '853',
          email: null,
          imageUrl:
            'https://ds-images.bolavip.com/news/image/740/416/?src=https://images.bolavip.com/webp/en/full/BUS_20240928_BUS_241322_lebron-james-30-1.webp',
          grantedRoles: ['ROLE_USER'],
          gender: null,
          name: null,
          nickname: 'Nickname123123123123',
          smsNumber: '63530392',
          status: 'ACTIVE',
          updateTime: '2024-10-15T23:37:58.268Z',
          username: '',
          sid: '66f75c862c4ea34a54b6b150',
          enabled: true,
          accountNonExpired: true,
          accountNonLocked: true,
          authorities: ['ROLE_USER'],
          credentialsNonExpired: true,
        },
      ],
    },
  },
];
