interface SectionProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  color?: string;
}

export function Section({title, id, children, color = 'bg-[var(--foreground)]'}: SectionProps) {
  return (
    <section id={id} className={`w-full flex flex-col justify-start ${color} p-4 hover:brightness-125 rounded-lg shadow-sm`}>
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      {children}
    </section>
  )
}