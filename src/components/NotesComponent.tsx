import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput } from 'react-native'
import { Calendar } from 'react-native-calendars';
import { Portal, Dialog, Button } from 'react-native-paper';

type NotesComponentProps = {
  onPress: () => void;
}

const NotesComponent = (props: NotesComponentProps) => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [date, setDate] = useState('');
  return (
    <>
      <View className="bg-white m-6 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between">
          <Text className="text-xl font-bold"><MaterialCommunityIcons name="note" color="#c0c0c0" size={20} /> Notas</Text>
          <TouchableOpacity onPress={() => setDialogVisible(true)}>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={30}></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
        <View className="items-center m-4">
          <View className="bg-slate-100 p-4 m-2 w-[50%] rounded-lg shadow-md items-center">
            <TouchableOpacity onPress={() => setDialogVisible(true)}>
              <MaterialCommunityIcons name="note" color="#c0c0c0" size={30}></MaterialCommunityIcons>
            </TouchableOpacity>
            <Text className='mt-2'>Adicionar Notas</Text>
          </View>
        </View>
      </View>
      <Portal>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <Dialog.Title style={styles.dialogTitle}>Notas</Dialog.Title>
          <Dialog.Content>
            <View className="items-center mb-4">
              <TouchableOpacity onPress={() => { }}>
                <Text className='mr-2'>{date}</Text>
                <MaterialCommunityIcons name="clock-edit" color="#c0c0c0" size={30}></MaterialCommunityIcons>
              </TouchableOpacity>
            </View>
            <TextInput
              multiline
              placeholder='Adicionar notas sobre como você está se sentindo...'
              style={styles.textInput}>
            </TextInput>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setDialogVisible(false)}>Cancelar</Button>
            <Button style={styles.saveButton} onPress={() => console.log("Salvar")} mode="contained">
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
  saveButton: {
    width: 80,
  },
  textInput: {
    padding: 10,
    borderColor: '#000',
    borderWidth: 1,
    margin: 12,
    borderRadius: 5,
    textAlignVertical: 'top',
    height: 100,
  },
});

export default NotesComponent