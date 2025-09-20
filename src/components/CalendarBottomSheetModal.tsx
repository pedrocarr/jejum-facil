import React, { forwardRef, useCallback, useMemo } from "react";
import { View, Text } from "react-native";
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';

interface CalendarBottomSheetModalProps { }

const CalendarBottomSheetModal = forwardRef<BottomSheet, CalendarBottomSheetModalProps>((props, ref) => {
  // Define snap points
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
        <Text className="text-lg font-semibold mb-4">Calendar Options</Text>
        <Text className="text-gray-600">Swipe down to close</Text>

        {/* Add your calendar content here */}
        <View className="mt-4">
          <Text>Your calendar content goes here...</Text>
          <Text className="mt-2 text-sm text-gray-500">
            This bottom sheet is now properly positioned at the bottom of the screen!
          </Text>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
});

CalendarBottomSheetModal.displayName = 'CalendarBottomSheetModal';

export default CalendarBottomSheetModal;