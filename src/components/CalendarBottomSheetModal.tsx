import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';


interface CalendarBottomSheetModalProps { }

const CalendarBottomSheetModal = forwardRef<BottomSheet, CalendarBottomSheetModalProps>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={-1} // Start closed
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#ffffff' }}
      handleIndicatorStyle={{ backgroundColor: '#c0c0c0' }}
    >
      <BottomSheetView className="flex-1 p-4">
        <Calendar
          className="height-[350px]"
          initialDate="2025-09-01"
          onDayPress={day => {
            console.log('selected day', day);
          }}
        />
      </BottomSheetView>
    </BottomSheet>
  );
});

CalendarBottomSheetModal.displayName = 'CalendarBottomSheetModal';

export default CalendarBottomSheetModal;