import React from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CalendarBottomSheetProps {
  onPress: () => void;
}

export default function CalendarBottomSheet({ onPress }: CalendarBottomSheetProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="mr-4"
    >
      <MaterialCommunityIcons
        name="calendar-month-outline"
        color="#c0c0c0"
        size={40}
      />
    </TouchableOpacity>
  );
}