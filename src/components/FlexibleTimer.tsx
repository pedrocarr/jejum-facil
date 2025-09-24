import React, { useEffect, useState, useMemo } from 'react';
import { View, Text, Animated } from 'react-native';
import { formatTime, formatDuration } from '@/utils/fasting';
import { TIMER_COLORS, ANIMATION_DURATIONS } from '@/types/constants';
import { getProgressGradient, getCelebrationAnimation } from '@/utils/animations';

interface FlexibleTimerProps {
  startTime: number;
  onMilestone?: (milestone: number, duration: number) => void;
  size?: number;
  showMilestones?: boolean;
}

const FlexibleTimer: React.FC<FlexibleTimerProps> = ({
  startTime,
  onMilestone,
  size = 280,
  showMilestones = true,
}) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const [lastMilestone, setLastMilestone] = useState(0);
  const [celebrationAnimation, setCelebrationAnimation] = useState<any>(null);

  // Animated values for pulsing effect
  const scaleAnim = useMemo(() => new Animated.Value(1), []);
  const opacityAnim = useMemo(() => new Animated.Value(0.7), []);

  // Define milestones in seconds (1h, 2h, 4h, 8h, 12h, 16h, 20h, 24h)
  const milestones = [3600, 7200, 14400, 28800, 43200, 57600, 72000, 86400];

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  useEffect(() => {
    // Check for milestones
    const currentMilestone = milestones.findLast(milestone => elapsedTime >= milestone);

    if (currentMilestone && currentMilestone > lastMilestone) {
      setLastMilestone(currentMilestone);
      onMilestone?.(currentMilestone, elapsedTime);

      // Trigger celebration
      const animation = getCelebrationAnimation(currentMilestone / 86400); // Normalize to 0-1
      setCelebrationAnimation(animation);

      // Clear animation after duration
      setTimeout(() => setCelebrationAnimation(null), 2000);
    }
  }, [elapsedTime, lastMilestone, milestones, onMilestone]);

  useEffect(() => {
    // Continuous pulsing animation
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1.05,
            duration: ANIMATION_DURATIONS.SLOW,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 1,
            duration: ANIMATION_DURATIONS.SLOW,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: ANIMATION_DURATIONS.SLOW,
            useNativeDriver: true,
          }),
          Animated.timing(opacityAnim, {
            toValue: 0.7,
            duration: ANIMATION_DURATIONS.SLOW,
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    pulseAnimation.start();

    return () => pulseAnimation.stop();
  }, [scaleAnim, opacityAnim]);

  const getMilestoneMessage = (milestone: number): string => {
    const hours = milestone / 3600;
    switch (hours) {
      case 1: return "1 hora completa! 🎯";
      case 2: return "2 horas! Você consegue! 💪";
      case 4: return "4 horas! Incrível! 🔥";
      case 8: return "8 horas! Fantástico! ⭐";
      case 12: return "12 horas! Meio dia! 🌟";
      case 16: return "16 horas! Excelente! 🏆";
      case 20: return "20 horas! Impressionante! 👑";
      case 24: return "24 horas! Um dia inteiro! 🎉";
      default: return `${hours}h completas! 🎊`;
    }
  };

  const currentGradient = useMemo(() => {
    const hours = elapsedTime / 3600;
    if (hours >= 24) return ['#FFD700', '#FFA500']; // Gold
    if (hours >= 16) return ['#9C27B0', '#E91E63']; // Purple to Pink
    if (hours >= 12) return ['#FF5722', '#FF9800']; // Deep Orange
    if (hours >= 8) return ['#4CAF50', '#8BC34A']; // Green
    if (hours >= 4) return ['#2196F3', '#03DAC6']; // Blue
    if (hours >= 2) return ['#FF9800', '#FFC107']; // Orange
    if (hours >= 1) return ['#9C27B0', '#673AB7']; // Purple
    return ['#00BCD4', '#4DD0E1']; // Cyan
  }, [elapsedTime]);

  return (
    <View className="items-center justify-center p-8">
      <Animated.View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: TIMER_COLORS.BACKGROUND,
            borderWidth: 8,
            borderColor: currentGradient[0],
            transform: [
              { scale: celebrationAnimation ? celebrationAnimation.scale : scaleAnim },
              ...(celebrationAnimation ? [{ rotate: celebrationAnimation.rotation }] : [])
            ],
            opacity: opacityAnim,
          },
        ]}
      >
        <View className="items-center">
          <Text
            className="text-6xl font-bold mb-2"
            style={{
              color: celebrationAnimation?.color || currentGradient[0]
            }}
          >
            {formatTime(elapsedTime)}
          </Text>

          <Text className="text-lg text-gray-600">
            Tempo de jejum
          </Text>

          <View className="mt-2 px-4 py-1 bg-blue-100 rounded-full">
            <Text className="text-sm text-blue-700 font-medium">
              {formatDuration(elapsedTime)}
            </Text>
          </View>

          {showMilestones && celebrationAnimation && lastMilestone > 0 && (
            <View className="mt-3 px-4 py-2 bg-yellow-100 rounded-full">
              <Text className="text-sm text-yellow-800 font-semibold text-center">
                {getMilestoneMessage(lastMilestone)}
              </Text>
            </View>
          )}
        </View>
      </Animated.View>

      {/* Progress indicators */}
      <View className="flex-row mt-6 space-x-2">
        {milestones.slice(0, 4).map((milestone, index) => (
          <View
            key={milestone}
            className={`w-3 h-3 rounded-full ${
              elapsedTime >= milestone
                ? 'bg-green-500'
                : elapsedTime >= milestone * 0.8
                ? 'bg-yellow-500'
                : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      <Text className="text-xs text-gray-500 mt-2">
        1h • 2h • 4h • 8h
      </Text>
    </View>
  );
};

export default FlexibleTimer;