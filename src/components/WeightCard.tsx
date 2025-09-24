import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { Portal, Dialog, Button, Divider, TextInput } from 'react-native-paper';




const WeightCard = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [weight, setWeight] = useState<number | null>(null);

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
            <MaterialCommunityIcons name="weight-kilogram" color="black" size={20} /> Peso
          </Text>
          <TouchableOpacity onPress={() => setDialogVisible(true)}>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={30} />
          </TouchableOpacity>
        </View>
          {weight === null ? (
            <>
            <Text className="text-gray-500 text-center m-2">Nenhum peso registrado</Text>
            <Divider style={styles.divider}></Divider>
            </>
          ) : (
            <>
            <Text className="text-2xl text-center m-2">{weight} kg</Text>
            <Divider style={styles.divider}></Divider>
            </>
          )}
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={dismissEndFasting}>
          <Dialog.Title style={styles.dialogTitle}>
            Registrar Peso
          </Dialog.Title>
          <Dialog.Content>
            <TextInput className="text-xl"
              label="Peso (kg)"
              keyboardType="numeric"
              value={weight !== null ? weight.toString() : ''}
              onChangeText={text => {
                setWeight(text ? parseFloat(text) : null);
              }}
              placeholder="Ex: 70.5"
              mode="outlined"
              style={{ backgroundColor: 'white' }}>
            </TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={dismissEndFasting}>Não</Button>
            <Button style={styles.confirmButton} onPress={confirmEndFasting} mode="contained">
              Sim
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
