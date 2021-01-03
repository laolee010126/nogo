import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

//**screens */
import MainScreen from '../screens/MainScreen';
import NewGameScreen from '../screens/NewGameScreen';
import HelpScreen from '../screens/HelpScreen';
import HistoryScreen from '../screens/HistoryScreen';
import ExitScreen from '../screens/ExitScreen';
import RuleScreen from '../screens/RuleScreen';
import FeaturesScreen from '../screens/FeaturesScreen';
import PausedGameScreen from '../screens/PausedGameScreen';
import EndedGameScreen from '../screens/EndedGameScreen';

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="NewGameScreen" component={NewGameScreen} />
        <Stack.Screen name="HelpScreen" component={HelpScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="ExitScreen" component={ExitScreen} />
        <Stack.Screen name="RuleScreen" component={RuleScreen} />
        <Stack.Screen name="FeaturesScreen" component={FeaturesScreen} />
        <Stack.Screen name="PausedGameScreen" component={PausedGameScreen} />
        <Stack.Screen name="EndedGameScreen" component={EndedGameScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
