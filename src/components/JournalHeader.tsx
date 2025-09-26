import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { router } from 'expo-router';

export default function JournalHeader() {
  const getCurrentDay = () => {
    const today = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    };
    return today.toLocaleDateString('pt-BR', options);
  };

  const handleSettingsPress = () => {
    router.push('/cards-settings');
  };

  return (
    <View className="flex-row justify-between items-center px-4 py-3 bg-[#F0F8FF] border-b border-gray-200">
      <Text className="text-lg font-semibold text-[#663399] capitalize">
        {getCurrentDay()}
      </Text>
      <IconButton
        icon="cog"
        size={24}
        iconColor="#663399"
        onPress={handleSettingsPress}
        className="m-0"
      />
    </View>
  );
}