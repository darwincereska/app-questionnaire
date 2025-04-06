import { Haptics, ImpactStyle } from "@capacitor/haptics";
interface GenderSelectorProps {
  selectedGender: string;
  onGenderChange: (gender: 'male' | 'female') => void;
}

export function GenderSelector({selectedGender, onGenderChange}: GenderSelectorProps) {
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  return (
    <div className="w-full py-3 px-4 bg-[var(--secondary)] transition-all duration-300 rounded-lg font-medium flex items-center justify-between">
        <div className="flex items-center space-x-2 w-full">
          <button
            className={`w-1/2 px-4 py-2 rounded-lg ${
              selectedGender === 'male' ? 'bg-[var(--accent)]' : 'bg-[var(--foreground)]'
            }`}
            onClick={async () => {
              onGenderChange('male');
              await hapticsImpactMedium();
            }}
          >
            Male
          </button>
          <button 
            className={`w-1/2 px-4 py-2 rounded-lg ${
              selectedGender === 'female' ? 'bg-[var(--accent)]' : 'bg-[var(--foreground)]'
            }`}
            onClick={() => onGenderChange('female')}
          >
            Female
          </button>
        </div>
      </div>
  )
}