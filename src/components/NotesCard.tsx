import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { View, TouchableOpacity, Text, StyleSheet, TextInput, FlatList } from 'react-native'
import { Portal, Dialog, Button } from 'react-native-paper'
import DateTimePickerModal from 'react-native-modal-datetime-picker'

type Note = {
  id: number;
  text: string;
  date: Date;
}

const NotesCard = () => {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [editingNoteId, setEditingNoteId] = useState<number | null>(null);

  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
  };

  const onChangeText = (inputText: string) => {
    setText(inputText);
  };

  const formatDate = (date: Date) => {
    const today = new Date();
    const isToday =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const time = date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    });

    if (isToday) {
      return `Hoje, ${time}`;
    } else {
      const fullDate = date.toLocaleDateString("pt-BR");
      return `${fullDate}, ${time}`;
    }
  };

  const openNewNoteDialog = () => {
    setEditingNoteId(null);
    setText('');
    setSelectedDate(new Date());
    setDialogVisible(true);
  };

  const openEditNoteDialog = (note: Note) => {
    setEditingNoteId(note.id);
    setText(note.text);
    setSelectedDate(note.date);
    setDialogVisible(true);
  };

  const handleSave = () => {
    if (text.trim().length === 0) {
      setDialogVisible(false);
      return;
    }

    if (editingNoteId !== null) {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === editingNoteId ? { ...note, text, date: selectedDate } : note
        )
      );
    } else {
      const newNote: Note = {
        id: Date.now(),
        text,
        date: selectedDate,
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setDialogVisible(false);
    setText('');
    setSelectedDate(new Date());
    setEditingNoteId(null);
  };

  const handleCancel = () => {
    setDialogVisible(false);
    setText('');
    setSelectedDate(new Date());
    setEditingNoteId(null);
  };

  const renderNote = ({ item }: { item: Note }) => (
    <View style={styles.noteItem}>
      <View style={{ flex: 1 }}>
        <Text style={styles.noteDate}>{formatDate(item.date)}</Text>
        <Text style={styles.noteText}>{item.text}</Text>
      </View>
      <TouchableOpacity onPress={() => openEditNoteDialog(item)}>
        <MaterialCommunityIcons name="pencil" color="#4b5563" size={24} />
      </TouchableOpacity>
    </View>
  );

  return (
    <>
      <View className="bg-white m-4 p-4 rounded-lg shadow-md">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">
            <MaterialCommunityIcons name="note" color="#c0c0c0" size={20} /> Notas
          </Text>
          <TouchableOpacity onPress={openNewNoteDialog}>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={30} />
          </TouchableOpacity>
        </View>

        {notes.length === 0 ? (
          <View className="items-center m-4">
            <View className="bg-slate-100 p-4 m-2 w-[50%] rounded-lg shadow-md items-center">
              <TouchableOpacity onPress={openNewNoteDialog}>
                <MaterialCommunityIcons name="note" color="#c0c0c0" size={30} />
              </TouchableOpacity>
              <Text className='mt-2'>Adicionar Notas</Text>
            </View>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderNote}
            contentContainerStyle={{ marginTop: 16 }}
          />
        )}
      </View>

      <Portal>
        <Dialog visible={dialogVisible} onDismiss={handleCancel}>
          <Dialog.Title style={styles.dialogTitle}>
            {editingNoteId ? 'Editar Nota' : 'Nova Nota'}
          </Dialog.Title>
          <Dialog.Content>
            <View className="flex-row justify-center mb-4">
              <TouchableOpacity onPress={showDatePicker} className='flex-row items-center px-4 py-2'>
                <Text className='mr-2'>{formatDate(selectedDate)}</Text>
                <MaterialCommunityIcons name="clock-edit" color="#c0c0c0" size={30} />
              </TouchableOpacity>
            </View>
            <TextInput
              editable
              multiline
              numberOfLines={10}
              placeholder='Adicionar notas sobre como você está se sentindo...'
              style={styles.textInput}
              onChangeText={onChangeText}
              value={text}
            />
          </Dialog.Content>
          <Dialog.Actions>
            {editingNoteId && (
              <Button
                onPress={() => {
                  setNotes((prev) => prev.filter((note) => note.id !== editingNoteId));
                  handleCancel();
                  }
                }
                style={{ marginRight: 'auto' }}
              >
                Excluir
              </Button>
            )}
            <Button onPress={handleCancel}>Cancelar</Button>
            <Button style={styles.saveButton} onPress={handleSave} mode="contained">
              Salvar
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="pt_BR"
        is24Hour
        maximumDate={new Date()}
      />
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
  noteItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  noteText: {
    fontSize: 14,
    marginTop: 4,
  },
});

export default NotesCard;
