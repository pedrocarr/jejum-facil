import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity, Text } from 'react-native'
import { Portal, Dialog, Button } from 'react-native-paper';




const WeightCard = () => {
  const [dialogVisible, setDialogVisible] = useState(false);

  const dismissEndFasting = () => {
    setDialogVisible(false);
  }

  const confirmEndFasting = () => {
    // Logic to end fasting goes here
    setDialogVisible(false);
  }

  return (
    <>
      <View className="bg-white m-4 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">
            <MaterialCommunityIcons name="weight-kilogram" color="#c0c0c0" size={20} /> Peso
          </Text>
          <TouchableOpacity onPress={() => setDialogVisible(true)}>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={30} />
          </TouchableOpacity>
        </View>
      </View>
        <Portal>
        <Dialog visible={dialogVisible} onDismiss={dismissEndFasting}>
          <Dialog.Title>
            <Text className='text-center text-bold text-xl'>Registrar Peso</Text>
          </Dialog.Title>
          <Dialog.Content>
            <Text className="text-xl">
              Tem certeza que deseja terminar o jejum atual?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissEndFasting}>Não</Button>
            <Button style={{width: 80}} onPress={confirmEndFasting} mode="contained">
              Sim
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
)
}
export default WeightCard;
