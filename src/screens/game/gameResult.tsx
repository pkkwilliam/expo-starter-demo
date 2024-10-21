import React from 'react';
import {NavioScreen} from 'rn-navio';
import {observer} from 'mobx-react';
import {Button, Text, View} from 'react-native-ui-lib';
import {ScrollView} from 'react-native';
import {resetToHomeTab} from '@app/utils/NavioUtil';
import {useStores} from '@app/stores';
import {navio} from '@app/navio';

export const GameResult: NavioScreen = observer(({}) => {
  const {gameStore} = useStores();
  const game = gameStore.game;

  if (!game) {
    return null;
  }

  const onPressGoBackHome = () => {
    resetToHomeTab(navio);
  };

  // const {id} = params.game;
  return (
    <View flex>
      <ScrollView contentInsetAdjustmentBehavior="always">
        <Text>Game Result</Text>
        <Text>{`Has Props? ${game.id}`}</Text>
        <Button label={'Home'} onPress={onPressGoBackHome} />
      </ScrollView>
    </View>
  );
});
