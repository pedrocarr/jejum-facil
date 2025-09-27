import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { Switch } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';
import { useCards } from '@/contexts/CardsContext';

export default function CardsSettings() {
  const { showNotesCard, showWeightCard, setShowNotesCard, setShowWeightCard } = useCards();

  return (
    <View className="flex-1 bg-[#F0F8FF]">
      <ScrollView className="flex-1 px-4 pt-6">
        <View className="bg-white rounded-lg p-4 mb-4 shadow-sm">
          <View className="flex-row justify-between items-center">
            <View className="flex-1">
              <Text className="text-lg font-semibold text-gray-800 mb-1">
                Notas
              </Text>
              <Text className="text-sm text-gray-600">
                Exibir o cartão para adicionar e visualizar suas anotações diárias
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
                Peso
              </Text>
              <Text className="text-sm text-gray-600">
                Exibir o cartão para registrar e acompanhar seu peso
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
            💡 <Text className="font-semibold">Dica:</Text> Você pode ativar ou desativar os cartões conforme sua necessidade. As configurações são salvas automaticamente.
          </Text>
        </View>
      </ScrollView>
      <StatusBar style="light" />
    </View>
  );
}