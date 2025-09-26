import React, { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Switch, Appbar } from 'react-native-paper';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function CardsSettings() {
  const [showNotesCard, setShowNotesCard] = useState(true);
  const [showWeightCard, setShowWeightCard] = useState(true);

  const handleGoBack = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-[#F0F8FF]">
      <Appbar.Header style={{ backgroundColor: '#663399' }}>
        <Appbar.BackAction onPress={handleGoBack} />
        <Appbar.Content title="Configurações dos Cards" titleStyle={{ color: 'white' }} />
      </Appbar.Header>

      <ScrollView className="flex-1 px-4 pt-6">
        <Text className="text-2xl font-bold text-[#663399] mb-6">
          Configurações dos Cards
        </Text>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-1">
                Card de Anotações
              </Text>
              <Text className="text-sm text-gray-600">
                Exibir o card para adicionar e visualizar suas anotações diárias
              </Text>
            </View>
            <Switch
              value={showNotesCard}
              onValueChange={setShowNotesCard}
              thumbColor={showNotesCard ? '#663399' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#663399' }}
            />
          </View>
        </View>

        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-1">
                Card de Peso
              </Text>
              <Text className="text-sm text-gray-600">
                Exibir o card para registrar e acompanhar seu peso
              </Text>
            </View>
            <Switch
              value={showWeightCard}
              onValueChange={setShowWeightCard}
              thumbColor={showWeightCard ? '#663399' : '#f4f3f4'}
              trackColor={{ false: '#767577', true: '#663399' }}
            />
          </View>
        </View>

        <View className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
          <Text className="text-sm text-yellow-800">
            💡 <Text className="font-semibold">Dica:</Text> Você pode ativar ou desativar os cards conforme sua necessidade. As configurações são salvas automaticamente.
          </Text>
        </View>
      </ScrollView>

      <StatusBar style="light" />
    </View>
  );
}