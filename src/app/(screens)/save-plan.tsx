import React, { useState, useEffect } from 'react';
import { View, ScrollView, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Text, Button, Card, Divider } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FastingSession } from '@/types/fasting';
import { formatTime, formatDuration, getSessionProgress } from '@/utils/fasting';
import { useFastingSessions } from '@/hooks/useFastingSessions';

export default function SavePlan() {
  const [session, setSession] = useState<FastingSession | null>(null);
  const [rating, setRating] = useState<number | null>(null);
  const [notes, setNotes] = useState<string>('');
  const [saving, setSaving] = useState(false);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { saveSession } = useFastingSessions();

  useEffect(() => {
    if (params.sessionData) {
      try {
        const sessionData = JSON.parse(params.sessionData as string) as FastingSession;
        setSession(sessionData);
        setNotes(sessionData.notes || '');
        setRating(sessionData.rating || null);
      } catch (error) {
        console.error('Error parsing session data:', error);
        Alert.alert('Erro', 'Dados da sessão inválidos');
        router.back();
      }
    }
  }, [params.sessionData, router]);

  const handleSave = async () => {
    if (!session) return;

    try {
      setSaving(true);

      const updatedSession: FastingSession = {
        ...session,
        rating,
        notes: notes.trim() || undefined,
        updatedAt: Date.now(),
      };

      await saveSession(updatedSession);

      Alert.alert(
        'Sucesso!',
        'Sua sessão de jejum foi salva com sucesso!',
        [
          {
            text: 'OK',
            onPress: () => router.replace('/(tabs)/fasting'),
          },
        ]
      );
    } catch (error) {
      console.error('Error saving session:', error);
      Alert.alert('Erro', 'Não foi possível salvar a sessão');
    } finally {
      setSaving(false);
    }
  };

  const handleDiscard = () => {
    Alert.alert(
      'Descartar Sessão',
      'Tem certeza que deseja descartar esta sessão? Esta ação não pode ser desfeita.',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Descartar',
          style: 'destructive',
          onPress: () => router.replace('/(tabs)/fasting'),
        },
      ]
    );
  };

  const renderStars = () => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isSelected = rating !== null && starNumber <= rating;

      return (
        <MaterialCommunityIcons
          key={starNumber}
          name={isSelected ? 'star' : 'star-outline'}
          size={32}
          color={isSelected ? '#FFD700' : '#CCCCCC'}
          style={{ marginHorizontal: 4 }}
          onPress={() => setRating(starNumber)}
        />
      );
    });
  };

  if (!session) {
    return (
      <View className="flex-1 justify-center items-center bg-[#F0F8FF]">
        <Text className="text-lg">Carregando...</Text>
      </View>
    );
  }

  const progress = getSessionProgress(session);
  const sessionDate = new Date(session.createdAt).toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <ScrollView className="flex-1 bg-[#F0F8FF]">
      <View className="p-4">
        {/* Header */}
        <View className="items-center mb-6">
          <MaterialCommunityIcons
            name="check-circle"
            size={64}
            color="#4CAF50"
            style={{ marginBottom: 16 }}
          />
          <Text className="text-2xl font-bold text-center">
            Jejum Concluído!
          </Text>
          <Text className="text-base text-gray-600 text-center mt-2">
            Parabéns por completar sua sessão de jejum
          </Text>
        </View>

        {/* Session Summary Card */}
        <Card className="mb-4">
          <Card.Content>
            <Text className="text-lg font-bold mb-3">Resumo da Sessão</Text>

            <View className="space-y-3">
              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-600">Plano:</Text>
                <Text className="text-base font-semibold">{session.planTitle}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-600">Duração:</Text>
                <Text className="text-base font-semibold">{formatDuration(session.duration)}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-600">Tempo exato:</Text>
                <Text className="text-base font-semibold">{formatTime(session.duration)}</Text>
              </View>

              <View className="flex-row justify-between items-center">
                <Text className="text-base text-gray-600">Data:</Text>
                <Text className="text-base font-semibold">{sessionDate}</Text>
              </View>

              {!session.isFlexible && (
                <View className="flex-row justify-between items-center">
                  <Text className="text-base text-gray-600">Progresso:</Text>
                  <Text className="text-base font-semibold">{Math.round(progress)}%</Text>
                </View>
              )}
            </View>

            {/* Progress Bar */}
            {!session.isFlexible && (
              <View className="mt-4">
                <View className="w-full h-2 bg-gray-200 rounded-full">
                  <View
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  />
                </View>
              </View>
            )}
          </Card.Content>
        </Card>

        {/* Rating Card */}
        <Card className="mb-4">
          <Card.Content>
            <Text className="text-lg font-bold mb-3">Como foi sua experiência?</Text>
            <Text className="text-sm text-gray-600 mb-4">
              Avalie como você se sentiu durante esta sessão
            </Text>

            <View className="flex-row justify-center">
              {renderStars()}
            </View>

            {rating && (
              <Text className="text-center text-sm text-gray-600 mt-2">
                {rating === 1 && 'Muito difícil'}
                {rating === 2 && 'Difícil'}
                {rating === 3 && 'Moderado'}
                {rating === 4 && 'Bom'}
                {rating === 5 && 'Excelente'}
              </Text>
            )}
          </Card.Content>
        </Card>

        {/* Notes Card */}
        <Card className="mb-6">
          <Card.Content>
            <Text className="text-lg font-bold mb-3">Notas (Opcional)</Text>
            <Text className="text-sm text-gray-600 mb-4">
              Adicione observações sobre como você se sentiu
            </Text>

            {/* Simple text display for now - could be enhanced with TextInput */}
            <View className="border border-gray-300 rounded-lg p-3 min-h-[80px] bg-white">
              <Text className="text-base text-gray-700">
                {notes || 'Nenhuma nota adicionada...'}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Action Buttons */}
        <View className="space-y-3">
          <Button
            mode="contained"
            onPress={handleSave}
            loading={saving}
            disabled={saving}
            className="py-1"
          >
            {saving ? 'Salvando...' : 'Salvar Sessão'}
          </Button>

          <Button
            mode="outlined"
            onPress={handleDiscard}
            disabled={saving}
            className="py-1"
          >
            Descartar
          </Button>

          <Button
            mode="text"
            onPress={() => router.push('/(tabs)/dashboard')}
            disabled={saving}
            className="py-1"
          >
            Ver Estatísticas
          </Button>
        </View>
      </View>
    </ScrollView>
  );
}