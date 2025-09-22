import React, { useRef, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import NotesComponent from "@/components/NotesComponent";


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
    <View className="flex-1 bg-[#F0F8FF]">
      <NotesComponent onPress={() => {}} />
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </View>
  );
}