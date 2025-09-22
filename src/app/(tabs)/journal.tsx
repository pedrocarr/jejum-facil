import React, { useRef, useCallback } from "react";
import { Text, ScrollView, View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import NotesCard from "@/components/NotesCard";
import WeightCard from "@/components/WeightCard";


export default function Journal() {
  const bottomSheetRef = useRef<BottomSheet>(null);

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
      <View>
        <Text className="">Hello</Text>
      </View>
      <NotesCard />
      <WeightCard />
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </ScrollView>
  );
}