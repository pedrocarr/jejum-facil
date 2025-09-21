import React, { useRef, useCallback } from "react";
import { Text, View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";


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
      <Text className="text-xl font-bold p-4">Journal Page</Text>
      <Text className="px-4 text-gray-600">
        Tap the calendar icon in the header to open the bottom sheet.
      </Text>
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </View>
  );
}