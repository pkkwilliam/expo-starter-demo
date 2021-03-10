import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';

import { useServices } from '../../services';

import MainScreen from './main';
import SettingsScreen from './settings';

const MainNavigator: React.FC<NavigatorProps> = ({
}) => {
  const { t } = useServices();

  const MainStack = createStackNavigator();
  const Main = () => (
    <MainStack.Navigator>
      <MainStack.Screen
        name={'MainScreen'}
        component={MainScreen}
        options={{
          title: t.do('main.title'),
        }}
      />
    </MainStack.Navigator>
  )

  const SettingsStack = createStackNavigator();
  const Settings = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen
        name={'SettingsScreen'}
        component={SettingsScreen}
        options={{
          title: t.do('settings.title'),
        }}
      />
    </SettingsStack.Navigator>
  )

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const iconName = (() => {
            switch (route.name) {
              case 'Main':
                return focused
                  ? 'file-tray-full'
                  : 'file-tray-full-outline';
              case 'Settings':
                return focused
                  ? 'cog'
                  : 'cog-outline';
            }
          })();

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen
        name={'Main'}
        component={Main}
        options={{ title: t.do('main.title') }}
      />
      <Tab.Screen
        name={'Settings'}
        component={Settings}
        options={{ title: t.do('settings.title') }}
      />
    </Tab.Navigator>
  )
};

export default MainNavigator;