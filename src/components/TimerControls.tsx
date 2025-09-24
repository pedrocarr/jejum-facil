import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TIMER_COLORS } from '@/types/constants';

export type TimerControlsProps = {
  isStarted: boolean;
  isPaused?: boolean;
  onStart: () => void;
  onStop: () => void;
  onPause?: () => void;
  onResume?: () => void;
  showPauseResume?: boolean;
  startLabel?: string;
  stopLabel?: string;
  pauseLabel?: string;
  resumeLabel?: string;
  disabled?: boolean;
};

const TimerControls: React.FC<TimerControlsProps> = ({
  isStarted,
  isPaused = false,
  onStart,
  onStop,
  onPause,
  onResume,
  showPauseResume = false,
  startLabel = "Iniciar Jejum",
  stopLabel = "Parar jejum",
  pauseLabel = "Pausar",
  resumeLabel = "Continuar",
  disabled = false,
}) => {
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const renderMainButton = () => {
    if (!isStarted) {
      return (
        <AnimatedTouchable
          onPress={onStart}
          disabled={disabled}
          className={`m-4 p-4 rounded-full ${disabled ? 'bg-gray-400' : 'bg-[#663399]'}`}
          style={{
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="flex-row items-center">
            <MaterialCommunityIcons
              name="play"
              color="white"
              size={24}
              style={{ marginRight: 8 }}
            />
            <Text className="text-white font-bold text-xl">{startLabel}</Text>
          </View>
        </AnimatedTouchable>
      );
    }

    return (
      <AnimatedTouchable
        onPress={onStop}
        disabled={disabled}
        className={`m-4 p-4 rounded-full ${disabled ? 'bg-gray-400' : 'bg-red-500'}`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name="stop"
            color="white"
            size={24}
            style={{ marginRight: 8 }}
          />
          <Text className="text-white font-bold text-xl">{stopLabel}</Text>
        </View>
      </AnimatedTouchable>
    );
  };

  const renderPauseResumeButton = () => {
    if (!showPauseResume || !isStarted) return null;

    const isCurrentlyPaused = isPaused;
    const buttonColor = isCurrentlyPaused ? TIMER_COLORS.SUCCESS : TIMER_COLORS.WARNING;
    const iconName = isCurrentlyPaused ? 'play' : 'pause';
    const label = isCurrentlyPaused ? resumeLabel : pauseLabel;
    const onPress = isCurrentlyPaused ? onResume : onPause;

    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        className={`mx-2 px-6 py-3 rounded-full border-2 ${
          disabled ? 'border-gray-400 bg-gray-100' : 'border-gray-300 bg-white'
        }`}
        style={{
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
      >
        <View className="flex-row items-center">
          <MaterialCommunityIcons
            name={iconName}
            color={disabled ? '#9CA3AF' : buttonColor}
            size={20}
            style={{ marginRight: 6 }}
          />
          <Text
            className={`font-semibold text-base ${
              disabled ? 'text-gray-400' : 'text-gray-700'
            }`}
          >
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="items-center">
      {renderMainButton()}

      {showPauseResume && isStarted && (
        <View className="flex-row justify-center mt-2">
          {renderPauseResumeButton()}
        </View>
      )}

      {/* Status indicator */}
      {isStarted && (
        <View className="mt-4 px-3 py-1 bg-green-100 rounded-full">
          <View className="flex-row items-center">
            <View
              className={`w-2 h-2 rounded-full mr-2 ${
                isPaused ? 'bg-yellow-500' : 'bg-green-500'
              }`}
            />
            <Text className="text-sm text-green-700 font-medium">
              {isPaused ? 'Pausado' : 'Em andamento'}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default TimerControls;