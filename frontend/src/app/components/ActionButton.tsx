import { Haptics, ImpactStyle } from "@capacitor/haptics";
interface ActionButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'danger';
}

export function ActionButton({onClick, children, variant}: ActionButtonProps) {
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  return (
    <button 
        className={`w-full py-3 px-4 rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center space-x-2 ${
          variant === 'danger' ? 'bg-red-500' : 'bg-[var(--accent)]'
        }`}
        onClick={async () => {
          await hapticsImpactMedium();
          onClick();
        }}
      >
        <div className=""/>
        <span>{children}</span>
      </button>
  )
}