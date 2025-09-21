import React, { useRef, useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import BottomSheet from '@gorhom/bottom-sheet';
import CalendarBottomSheetModal from "@/components/CalendarBottomSheetModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";


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
      <View className="bg-white m-2 p-4 rounded-lg shadow-md">
        <View className="justify-between">
          <Text className="text-xl font-bold"><MaterialCommunityIcons name="note" color="#c0c0c0" size={20} /> Notas</Text>
          <TouchableOpacity>
            <MaterialCommunityIcons name="plus-circle" color="#c0c0c0" size={20}  ></MaterialCommunityIcons>
          </TouchableOpacity>
        </View>
      </View>
      <CalendarBottomSheetModal ref={bottomSheetRef} />
    </View>
  );
}