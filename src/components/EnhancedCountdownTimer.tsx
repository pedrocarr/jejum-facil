import React, { useState, useMemo } from 'react';
import { View, Text } from 'react-native';
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer';
import Svg, { Defs, LinearGradient, Stop } from 'react-native-svg';
import { formatTime } from '@/utils/fasting';
import { getProgressGradient, getCelebrationAnimation } from '@/utils/animations';
import { TIMER_COLORS, TIMER_MILESTONES } from '@/types/constants';

interface EnhancedCountdownTimerProps {
  duration: number;
  isPlaying: boolean;
  onComplete?: () => void;
  onMilestone?: (milestone: number) => void;
  size?: number;
  strokeWidth?: number;
  showMilestones?: boolean;
}

const EnhancedCountdownTimer: React.FC<EnhancedCountdownTimerProps> = ({
  duration,
  isPlaying,
  onComplete,
  onMilestone,
  size = 280,
  strokeWidth = 18,
  showMilestones = true,
}) => {
  const [currentMilestone, setCurrentMilestone] = useState<number | null>(null);
  const [celebrationAnimation, setCelebrationAnimation] = useState<any>(null);

  const gradientId = `gradient-${Math.random().toString(36).substr(2, 9)}`;

  // Generate colors based on time progression
  const timerColors = useMemo(() => {
    const colors = [];
    const times = [];

    // Create smooth color transitions
    for (let i = 0; i <= 1; i += 0.2) {
      const gradient = getProgressGradient(i);
      colors.push(gradient[0]);
      times.push(duration * (1 - i));
    }

    return { colors, times };
  }, [duration]);

  const handleTimeUpdate = (remainingTime: number) => {
    const elapsed = duration - remainingTime;
    const progress = elapsed / duration;

    // Check for milestones
    Object.entries(TIMER_MILESTONES).forEach(([key, value]) => {
      if (progress >= value && currentMilestone !== value) {
        setCurrentMilestone(value);
        onMilestone?.(value);

        // Trigger celebration animation
        const animation = getCelebrationAnimation(value);
        setCelebrationAnimation(animation);

        // Clear animation after duration
        setTimeout(() => setCelebrationAnimation(null), 1000);
      }
    });
  };

  const renderGradientDefs = () => (
    <Svg height="0" width="0">
      <Defs>
        <LinearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <Stop offset="0%" stopColor={TIMER_COLORS.GRADIENT_START} />
          <Stop offset="50%" stopColor={TIMER_COLORS.GRADIENT_MID} />
          <Stop offset="100%" stopColor={TIMER_COLORS.GRADIENT_END} />
        </LinearGradient>
      </Defs>
    </Svg>
  );

  return (
    <View className="items-center justify-center">
      {renderGradientDefs()}

      <View
        style={{
          transform: celebrationAnimation ? [
            { scale: celebrationAnimation.scale },
            { rotate: celebrationAnimation.rotation }
          ] : []
        }}
      >
        <CountdownCircleTimer
          isPlaying={isPlaying}
          duration={duration}
          colors={timerColors.colors}
          colorsTime={timerColors.times}
          strokeWidth={strokeWidth}
          size={size}
          trailColor={TIMER_COLORS.BACKGROUND}
          onComplete={() => {
            onComplete?.();
            return { shouldRepeat: false };
          }}
        >
          {({ remainingTime, elapsedTime }) => {
            handleTimeUpdate(remainingTime);

            const progress = elapsedTime / duration;

            return (
              <View className="items-center justify-center">
                <Text
                  className="text-5xl font-bold text-[#663399]"
                  style={{
                    color: celebrationAnimation?.color || TIMER_COLORS.PRIMARY
                  }}
                >
                  {formatTime(remainingTime)}
                </Text>

                <Text className="text-base text-gray-600 mt-1">
                  restante
                </Text>

                {progress > 0 && (
                  <Text className="text-sm text-gray-500 mt-1">
                    {Math.round(progress * 100)}% concluído
                  </Text>
                )}

                {showMilestones && currentMilestone && (
                  <View className="mt-2 px-3 py-1 bg-purple-100 rounded-full">
                    <Text className="text-xs text-purple-700 font-semibold">
                      {currentMilestone === TIMER_MILESTONES.QUARTER && "1/4 completo! 🎉"}
                      {currentMilestone === TIMER_MILESTONES.HALF && "Meio caminho! 🔥"}
                      {currentMilestone === TIMER_MILESTONES.THREE_QUARTER && "Quase lá! 💪"}
                      {currentMilestone === TIMER_MILESTONES.COMPLETE && "Parabéns! ✨"}
                    </Text>
                  </View>
                )}
              </View>
            );
          }}
        </CountdownCircleTimer>
      </View>
    </View>
  );
};

export default EnhancedCountdownTimer;