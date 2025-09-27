import React, { useRef, useCallback, useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import NotesCard from "@/components/NotesCard";
import WeightCard from "@/components/WeightCard";
import JournalHeader from "@/components/JournalHeader";
import { useLocalSearchParams, useRouter } from "expo-router";


export default function Journal() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showNotesCard, setShowNotesCard] = useState(true);
  const [showWeightCard, setShowWeightCard] = useState(true);
  const params = useLocalSearchParams();
  const router = useRouter();

  const openBottomSheet = useCallback(() => {
    bottomSheetRef.current?.expand();
  }, []);

  React.useEffect(() => {
    (global as any).openCalendarBottomSheet = openBottomSheet;

    return () => {
      delete (global as any).openCalendarBottomSheet;
    };
  }, [openBottomSheet]);

    useEffect(() => {
      if (params.toggleNoteCard) {
        try {
          const planData = JSON.parse(params.toggleNoteCard as string);
          console.log("🚀 ~ Journal ~ planData:", planData)
          setShowNotesCard(planData);
        } catch (error) {
          console.error('Error parsing selected plan:', error);
        }
      }
    }, [params.toggleNoteCard, router]);

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