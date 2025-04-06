interface ProfileCardProps {
  name: string;
  email: string;
}

export function ProfileCard({name, email}: ProfileCardProps) {
  return (
    <div className="flex items-center space-x-3 p-3 bg-[var(--secondary)] rounded-lg">
      <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
        <span className="text-xl font-bold">{name[0]}</span>
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm opacity-75">{email}</p>
      </div>
    </div>
  )
}