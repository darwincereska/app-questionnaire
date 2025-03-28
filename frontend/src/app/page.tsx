'use client'
import { motion } from "framer-motion"
import { authCommands } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { FaBottleWater, FaGlassWater, FaPlus } from "react-icons/fa6";
import { FaWineBottle } from "react-icons/fa";
export default function Home() {
  const router = useRouter()
  if (!authCommands.isAuthenticated()) {
    router.push('/login')
  }
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
      <main className="flex flex-col gap-4">
        <Section color='bg-blue-400'>
          <div className="flex flex-row justify-evenly">
            <IntakeButton icon={<FaGlassWater size='28' />} />
            <IntakeButton icon={<FaBottleWater size='28' />} />
            <IntakeButton icon={<FaWineBottle size='28' />} />
            <IntakeButton icon={<FaPlus size='28' />} />
          </div>
        </Section>
        <Section title="Progress">
          <div>
          </div>
        </Section>
      </main>
      </motion.div>
    </>
  )
}

interface SectionProps {
  id?: string;
  title?: string;
  children?: React.ReactNode;
  color?: string;
}

function Section({title, id, children, color = 'bg-[var(--foreground)]'}: SectionProps) {
  return (
    <section id={id} className={`w-full flex flex-col justify-start ${color} p-4 hover:brightness-125 rounded-lg shadow-sm`}>
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      {children}
    </section>
  )
}

interface IntakeButtonProps {
  icon: React.ReactNode;
}

function IntakeButton({icon}: IntakeButtonProps) {
  return (
    <div className="p-4 rounded-2xl active:scale-95 transition-transform duration-1000 brightness-95 bg-blue-500 shadow-sm">
      {icon}
    </div>
  )
}