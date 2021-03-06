import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';

interface GameListContentLoaderProps {}

export const GameListContentLoader: React.FC<
  GameListContentLoaderProps
> = ({}) => {
  const tailwind = useTailwind();
  return (
    <View style={tailwind('mt-2 rounded-xl bg-dark px-2')}>
      <ContentLoader
        viewBox="0 0 380 70"
        speed={1}
        height={70}
        width={'100%'}
        backgroundColor={'#333'}
        foregroundColor={'#999'}>
        <Circle cx="30" cy="30" r="30" />
        <Rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
        <Rect x="80" y="40" rx="3" ry="3" width="250" height="10" />
      </ContentLoader>
    </View>
  );
};
