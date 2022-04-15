/* eslint-disable react-native/no-inline-styles */
import dayjs from 'dayjs';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useTailwind} from 'tailwind-rn/dist';
import {GamesQueryType} from '../utils/types';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import CircularProgress from 'react-native-circular-progress-indicator';
import {GamesNavigationProp} from '../screens/Games';
import {color} from '../utils/utils';

dayjs.extend(localizedFormat);
interface GameCardProps {
  navigation: GamesNavigationProp;
  game: GamesQueryType;
}

export const GameCard: React.FC<GameCardProps> = ({game, navigation}) => {
  const {
    cover,
    artworks,
    screenshots,
    first_release_date,
    name,
    platforms,
    aggregated_rating,
  } = game;
  const tailwind = useTailwind();

  const artwork = artworks?.find(art => art);
  const screenshot = screenshots?.find(scr => scr);

  const platformLogos = () => {
    const logos = platforms
      ?.filter(({platform_logo}) => platform_logo?.url)
      .map(({platform_logo}) => platform_logo?.url?.replace?.('.jpg', '.png'));

    return logos?.map(logo => (
      <View
        key={logo}
        style={{
          backgroundColor: 'rgba(255,255,255,0.25)',
          ...tailwind('mr-1 rounded-md p-1'),
        }}>
        <Image
          resizeMode="contain"
          style={tailwind('h-5 [width:undefined] [aspectRatio:1]')}
          source={{uri: logo || ''}}
        />
      </View>
    ));
  };

  const img = cover || artwork || screenshot;

  return (
    <TouchableOpacity
      style={tailwind('mt-2')}
      onPress={() => navigation.navigate('GameDetails', {game, navigation})}>
      <View style={tailwind('flex-row rounded-xl bg-dark py-2')}>
        {img?.url && (
          <Image
            source={{uri: img.url}}
            resizeMode="contain"
            style={tailwind('mx-2 h-24 rounded-md [aspectRatio:0.75]')}
          />
        )}
        <View style={tailwind('flex-1 justify-between')}>
          <View style={tailwind('flex-row items-center justify-between')}>
            <View>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={tailwind('w-52 font-objektiv-mk1-bold text-white')}>
                {name}
              </Text>
              {first_release_date && (
                <Text
                  style={tailwind(
                    'mt-0.5 font-objektiv-mk1-regular text-white',
                  )}>
                  release: {dayjs.unix(first_release_date).format('LL')}
                </Text>
              )}
            </View>
            {aggregated_rating && (
              <View style={tailwind('mr-3')}>
                <CircularProgress
                  value={aggregated_rating}
                  radius={27.5}
                  maxValue={100}
                  activeStrokeColor={color(aggregated_rating)}
                  inActiveStrokeColor={'black'}
                  activeStrokeWidth={6}
                  progressValueColor={color(aggregated_rating)}
                  duration={2000}
                />
              </View>
            )}
          </View>
          <View style={tailwind('flex-row')}>{platformLogos()}</View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
