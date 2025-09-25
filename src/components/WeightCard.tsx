import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState, useEffect } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Portal, Dialog, Button, Divider, TextInput } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage'

type WeightEntry = {
  id: number;
  weight: number;
  date: Date;
}

const WEIGHT_STORAGE_KEY = '@weight_entries';

const WeightCard = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [weightEntries, setWeightEntries] = useState<WeightEntry[]>([]);
  const [currentWeight, setCurrentWeight] = useState<string>('');

  useEffect(() => {
    loadWeightEntries();
  }, []);

  const loadWeightEntries = async () => {
    try {
      const storedEntries = await AsyncStorage.getItem(WEIGHT_STORAGE_KEY);
      if (storedEntries) {
        const parsedEntries = JSON.parse(storedEntries).map((entry: any) => ({
          ...entry,
          date: new Date(entry.date)
        }));
        setWeightEntries(parsedEntries);
      }
    } catch (error) {
      console.error('Erro ao carregar pesos:', error);
    }
  };

  const saveWeightEntries = async (entries: WeightEntry[]) => {
    try {
      await AsyncStorage.setItem(WEIGHT_STORAGE_KEY, JSON.stringify(entries));
    } catch (error) {
      console.error('Erro ao salvar peso:', error);
    }
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    if (isToday) {
      return 'Hoje';
    } else {
      return date.toLocaleDateString('pt-BR');
    }
  };

  const getLatestWeight = () => {
    if (weightEntries.length === 0) return null;
    return weightEntries.sort((a, b) => b.date.getTime() - a.date.getTime())[0];
  };

  const latestEntry = getLatestWeight();

  const dismissDialog = () => {
    setDialogVisible(false);
    setCurrentWeight('');
  };

  const confirmSaveWeight = async () => {
    const weightValue = parseFloat(currentWeight);
    if (isNaN(weightValue) || weightValue <= 0) {
      dismissDialog();
      return;
    }

    const newEntry: WeightEntry = {
      id: Date.now(),
      weight: weightValue,
      date: new Date()
    };

    const updatedEntries = [newEntry, ...weightEntries];
    setWeightEntries(updatedEntries);
    await saveWeightEntries(updatedEntries);
    dismissDialog();
  };

  return (
    <>
      <View className="bg-white m-4 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">
            <MaterialCommunityIcons name="weight-kilogram" color="black" size={20} /> Peso
          </Text>
          <TouchableOpacity onPress={() => setDialogVisible(true)}>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={30} />
          </TouchableOpacity>
        </View>
          {latestEntry === null ? (
            <>
            <Text className="text-gray-500 text-center m-2">Nenhum peso registrado</Text>
            <Divider style={styles.divider}></Divider>
            </>
          ) : (
            <>
            <Text className="text-2xl text-center m-2">{latestEntry.weight} kg</Text>
            <Text className="text-sm text-gray-500 text-center mb-2">{formatDate(latestEntry.date)}</Text>
            <Divider style={styles.divider}></Divider>
            </>
          )}
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={dismissDialog}>
          <Dialog.Title style={styles.dialogTitle}>
            Registrar Peso
          </Dialog.Title>
          <Dialog.Content>
            <TextInput className="text-xl"
              label="Peso (kg)"
              keyboardType="numeric"
              value={currentWeight}
              onChangeText={setCurrentWeight}
              placeholder="Ex: 70.5"
              mode="outlined"
              style={{ backgroundColor: 'white' }}>
            </TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissDialog}>Cancelar</Button>
            <Button style={styles.confirmButton} onPress={confirmSaveWeight} mode="contained">
              Salvar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  dialogTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  confirmButton: {
    width: 80,
  },
  divider: {
    borderWidth: 2,
    borderColor: '#e0e0e0',
  }
});



export default WeightCard;
