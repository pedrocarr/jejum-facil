import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface PlansConxtextType {
  selectedPlan: {
    id: string;
    title: string;
    fastingDescription: string;
  } | null;
  setSelectedPlan: (plan: { id: string; title: string; fastingDescription: string } | null) => void;
  isLoading: boolean;
}

const PlansContext = createContext<PlansConxtextType | undefined>(undefined);

const STORAGE_KEY = 'selected_fasting_plan';

interface PlansProviderProps {
  children: ReactNode;
}

export function PlansProvider({ children }: PlansProviderProps) {
  const [selectedPlan, setSelectedPlanState] = useState<{
    id: string;
    title: string;
    fastingDescription: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSelectedPlan();
  }, []);

  const loadSelectedPlan = async () => {
    try {
      const planData = await AsyncStorage.getItem(STORAGE_KEY);
      if (planData) {
        setSelectedPlanState(JSON.parse(planData));
      }
    } catch (error) {
      console.error('Error loading selected plan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setSelectedPlan = async (plan: { id: string; title: string; fastingDescription: string } | null) => {
    try {
      setSelectedPlanState(plan);
      if (plan) {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(plan));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error('Error saving selected plan:', error);
    }
  };

  const value: PlansConxtextType = {
    selectedPlan,
    setSelectedPlan,
    isLoading
  }

  return (
    <PlansContext.Provider value={value}>
      {children}
    </PlansContext.Provider>
  );
}

export function usePlans(): PlansConxtextType {
  const context = useContext(PlansContext);
  if (context === undefined) {
    throw new Error('usePlans must be used within a PlansProvider');
  }
  return context;
}