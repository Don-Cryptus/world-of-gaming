import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {GameDetails} from '../screens/GameDetails';
import {Games} from '../screens/Games';
import {Test} from '../screens/Test';

export type RootStackParamList = {
  Games: undefined;
  GameDetails: {id: number};
};

const Stack = createNativeStackNavigator();

interface AppNavProps {}

export const AppNav: React.FC<AppNavProps> = ({}) => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Games" component={Games} />
      <Stack.Screen name="GameDetails" component={GameDetails} />
    </Stack.Navigator>
  );
};
