import {navio as defaultNavio} from '@app/navio';

export const goBack = (navio?: any) => {
  getNavio(navio).goBack();
};

export const push = (stackName: string, screenName: string, params: any, navio?: any) => {
  getNavio(navio).N.navigate(stackName, {screen: screenName, params});
};

export const resetToMainTab = (navio?: any) => {
  setRoot('AppTabs', navio);
};

export const setRoot = (stackName: string, navio?: any) => {
  getNavio(navio).N.resetRoot({
    index: 0,
    routes: [{name: stackName}],
  });
};

const getNavio = (navio?: any) => {
  return navio ?? defaultNavio;
};
