import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface CardsContextType {
  showNotesCard: boolean;
  showWeightCard: boolean;
  setShowNotesCard: (value: boolean) => void;
  setShowWeightCard: (value: boolean) => void;
  isLoading: boolean;
}

const CardsContext = createContext<CardsContextType | undefined>(undefined);

const STORAGE_KEYS = {
  NOTES_CARD: 'cards_settings_notes',
  WEIGHT_CARD: 'cards_settings_weight',
};

interface CardsProviderProps {
  children: ReactNode;
}

export function CardsProvider({ children }: CardsProviderProps) {
  const [showNotesCard, setShowNotesCardState] = useState(true);
  const [showWeightCard, setShowWeightCardState] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // Load settings from AsyncStorage on mount
  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const [notesCardSetting, weightCardSetting] = await Promise.all([
        AsyncStorage.getItem(STORAGE_KEYS.NOTES_CARD),
        AsyncStorage.getItem(STORAGE_KEYS.WEIGHT_CARD),
      ]);

      if (notesCardSetting !== null) {
        setShowNotesCardState(JSON.parse(notesCardSetting));
      }

      if (weightCardSetting !== null) {
        setShowWeightCardState(JSON.parse(weightCardSetting));
      }
    } catch (error) {
      console.error('Error loading card settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setShowNotesCard = async (value: boolean) => {
    try {
      setShowNotesCardState(value);
      await AsyncStorage.setItem(STORAGE_KEYS.NOTES_CARD, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving notes card setting:', error);
    }
  };

  const setShowWeightCard = async (value: boolean) => {
    try {
      setShowWeightCardState(value);
      await AsyncStorage.setItem(STORAGE_KEYS.WEIGHT_CARD, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving weight card setting:', error);
    }
  };

  const value: CardsContextType = {
    showNotesCard,
    showWeightCard,
    setShowNotesCard,
    setShowWeightCard,
    isLoading,
  };

  return (
    <CardsContext.Provider value={value}>
      {children}
    </CardsContext.Provider>
  );
}

export function useCards(): CardsContextType {
  const context = useContext(CardsContext);
  if (context === undefined) {
    throw new Error('useCards must be used within a CardsProvider');
  }
  return context;
}