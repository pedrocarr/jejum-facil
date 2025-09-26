import React, { useRef, useCallback } from "react";
import { ScrollView, View, Text } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import NotesCard from "@/components/NotesCard";
import WeightCard from "@/components/WeightCard";
import { StatusBar } from 'expo-status-bar';
import HorizontalCalendarComponent from "@/components/HorizontalCalendarComponent";


export default function Journal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [selectedDate, setSelectedDate] = React.useState(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  React.useEffect(() => {
    (global as any).openCalendarBottomSheet = openBottomSheet;

    return () => {
      delete (global as any).openCalendarBottomSheet;
    };
  }, [openBottomSheet]);

  return (
    <ScrollView className="flex-1 bg-[#F0F8FF] gap-2"
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View className="flex-1 items-center justify-center bg-">
        <HorizontalCalendarComponent onSelectDate={setSelectedDate} selected={selectedDate} />
        <StatusBar style="auto" />
      </View>
      <NotesCard />
      <WeightCard />
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </ScrollView>
  );
}