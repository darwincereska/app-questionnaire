export function Popup({children}: {children: React.ReactNode}) {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-50 flex items-center justify-center backdrop-blur-sm">
      <div className="bg-[var(--foreground)] p-6 rounded-lg w-[300px] shadow-lg">
        {children}
      </div>
    </div>
  );
}