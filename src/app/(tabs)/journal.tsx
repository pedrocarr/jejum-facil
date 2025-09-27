import React, { useRef, useCallback } from "react";
import { ScrollView, View, Text } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import NotesCard from "@/components/NotesCard";
import WeightCard from "@/components/WeightCard";
import JournalHeader from "@/components/JournalHeader";
import { useCards } from "@/contexts/CardsContext";


export default function Journal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { showNotesCard, showWeightCard } = useCards();

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
    <View className="flex-1 bg-[#F0F8FF]">
      <JournalHeader />
      <ScrollView className="flex-1 gap-2"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {showNotesCard && <NotesCard />}
        {showWeightCard && <WeightCard />}
      </ScrollView>
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </View>
  );
}