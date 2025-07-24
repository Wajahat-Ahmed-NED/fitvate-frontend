import { useState, useCallback } from 'react';
import { ExerciseDay, Exercise } from '../types';

export const useExerciseDay = () => {
  const [exerciseDays, setExerciseDays] = useState<ExerciseDay[]>([]);

  const addExerciseToDay = useCallback((dayId: string, exercise: Exercise) => {
    setExerciseDays(prev => prev?.map(day => {
      if (day.id === dayId) {
        const updatedExercises = [...day.exercises, exercise];
        return {
          ...day,
          exercises: updatedExercises,
          isRestDay: false, // Mark as not a rest day when exercises are added
          completionPercentage: 0, // Reset completion percentage
        };
      }
      return day;
    }));
  }, []);

  const toggleRestDay = useCallback((dayId: string) => {
    setExerciseDays(prev => prev?.map(day => {
      if (day.id === dayId) {
        const isRestDay = !day.isRestDay;
        return {
          ...day,
          isRestDay,
          exercises: isRestDay ? [] : day.exercises, // Clear exercises if marking as rest day
          completionPercentage: isRestDay ? 0 : day.completionPercentage,
        };
      }
      return day;
    }));
  }, []);

  const updateCompletionPercentage = useCallback((dayId: string, percentage: number) => {
    setExerciseDays(prev => prev?.map(day => {
      if (day.id === dayId) {
        return {
          ...day,
          completionPercentage: Math.max(0, Math.min(100, percentage)),
        };
      }
      return day;
    }));
  }, []);

  const createExerciseDay = useCallback((date: string): ExerciseDay => {
    return {
      id: `day_${Date.now()}`,
      date,
      isRestDay: false,
      exercises: [],
      completionPercentage: 0, // Default value as required
    };
  }, []);

  return {
    exerciseDays,
    addExerciseToDay,
    toggleRestDay,
    updateCompletionPercentage,
    createExerciseDay,
  };
};