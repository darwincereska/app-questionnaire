import { authCommands } from "@/app/lib/auth";

export const goalCommands = {
  add: async (liters: string) => {
    const currentNumber = localStorage.getItem('LitersConsumed') || '0';
    const parsedLiters = parseFloat(liters);
    if (isNaN(parsedLiters)) return;
    const newTotal = parseFloat(currentNumber) + parsedLiters;
    localStorage.setItem('LitersConsumed', newTotal.toString());
  },

  target: async () => {
    try {
      const userData = authCommands.getUser();
      const userGoal = (userData?.goal || 0); // Convert milliliters to liters
      return userGoal;
    } catch (error) {
      console.error('Error getting target:', error);
      return 0;
    }
  },

  sync: async () => {

  },

  calculateProgress: async () => {
    let progress = localStorage.getItem('LitersConsumed');
    if (!progress) {
      localStorage.setItem('LitersConsumed', '0');
      progress = '0';
    }
    const target = await goalCommands.target();
    if (target === 0) return 0;
    return Math.floor((parseFloat(progress) / target) * 100);
  },

  showLiters: async () => {
    const current = localStorage.getItem('LitersConsumed')
    return current ? parseFloat(parseFloat(current).toFixed(2)) : 0
  },

  clear: async () => {
    localStorage.setItem('LitersConsumed', '0')
  },
}