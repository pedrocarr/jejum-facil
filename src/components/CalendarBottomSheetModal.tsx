import React, { forwardRef, useCallback, useMemo } from "react";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Calendar, LocaleConfig } from 'react-native-calendars';

interface CalendarBottomSheetModalProps { }

LocaleConfig.locales['br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ],
  monthNamesShort: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  dayNames: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
  dayNamesShort: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
  today: "Hoje"
};

LocaleConfig.defaultLocale = 'br';

const CalendarBottomSheetModal = forwardRef<BottomSheet, CalendarBottomSheetModalProps>((props, ref) => {
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  return (
    <BottomSheet
      ref={ref}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={true}
      backgroundStyle={{ backgroundColor: '#ffffff' }}
      handleIndicatorStyle={{ backgroundColor: '#c0c0c0' }}
    >
      <BottomSheetView className="flex-1 p-4">
        <Calendar
          className="height-[350px]"
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