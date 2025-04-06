'use client'
import { motion } from "framer-motion"
import { authCommands } from "@/app/lib/auth";
import { useRouter } from "next/navigation";
import { Section } from "@/app/components/Section";
import { FaBottleWater, FaGlassWater, FaPlus } from "react-icons/fa6";
import { Popup } from "@/app/components/Popup";
import { FaWineBottle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { goalCommands } from '@/app/lib/goal'
import { Haptics, ImpactStyle } from "@capacitor/haptics";
export default function Home() {
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [litersConsumed, setLitersConsumed] = useState(0)
  const [goal, setGoal] = useState(0)
  
  useEffect(() => {
    const fetchData = async () => {
      setLitersConsumed(await goalCommands.showLiters() || 0)
      setProgress(await goalCommands.calculateProgress())
      setGoal(await goalCommands.target())
    }
    fetchData()
  }, [])
  
  const updateProgress = async () => {
    setLitersConsumed(await goalCommands.showLiters() || 0)
    setProgress(await goalCommands.calculateProgress())
    setGoal(await goalCommands.target())
    await hapticsImpactMedium()
  }
  
  if (!authCommands.isAuthenticated()) {
    // window.location.href = '/login'
    return router.replace('/login')
  }
  // goalCommands.add('1')
  // goalCommands.clear()
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
      <main className="flex flex-col gap-4">
        <Section title="Daily Goal"> 
          <div className="text-left mb-2 text-gray-400 font-bold flex flex-col gap-2 text-sm">
            <span>Status: {progress >= 100 ? "Completed" : "Not Completed" }</span>
            <span>{ litersConsumed }L of { goal }L</span>
          </div>
          <div className="relative mb-4 w-full h-8 bg-[var(--secondary)] rounded-full overflow-hidden">
            <div 
              className="absolute h-full bg-[var(--blue)] transition-all"
              style={{ width: `${progress}%` }}
            />
            <div className="absolute w-full h-full flex items-center justify-center">
                <span className="text-sm font-bold">{ progress }%</span>
            </div>
          </div>
          <div className="flex flex-row justify-evenly">
            <IntakeButton icon={<FaGlassWater size='28' />} liters={0.24} onUpdate={updateProgress}/>
            <IntakeButton icon={<FaBottleWater size='28' />} liters={0.5} onUpdate={updateProgress}/>
            <IntakeButton icon={<FaWineBottle size='28' />} liters={1} onUpdate={updateProgress}/>
            <IntakeButton icon={<FaPlus size='28' />} onUpdate={updateProgress} />
          </div>
        </Section>
        <Section title="Hydration Fact">
        </Section>
      </main>
      </motion.div>
    </>
  )
}

interface IntakeButtonProps {
  icon: React.ReactNode;
  liters?: number;
  onUpdate: () => Promise<void>;
}

function IntakeButton({icon, liters, onUpdate}: IntakeButtonProps) {
  const [isIntakePopupOpen, setIntakePopup] = useState(false)
  const [customValue, setCustomValue] = useState(liters || 0)
  // const router = useRouter()
  const handleConfirm = async () => {
    // Handle the confirmed value
    console.log(`Confirmed: ${customValue} liters`) 
    setIntakePopup(false)
    if (customValue != 0) {
      await goalCommands.add(customValue.toString())
    } else {
      await goalCommands.add((liters ?? 0).toString())
    }
    
    await onUpdate()
  }

  return (
    <>
      <div 
        className="p-6 rounded-2xl active:scale-95 transition-all bg-[var(--blue)] shadow-sm cursor-pointer"
        onClick={() => setIntakePopup(true)}
      >
        {icon}
      </div>

      {isIntakePopupOpen && (
        <Popup>
          <div className="flex flex-col gap-4 p-4">
            <h2 className="text-lg font-bold">Set Water Intake</h2>

            {liters ? (
              <div className="text-center text-xl">{liters} liters</div>
            ) : (
              <input
                type="number"
                value={customValue}
                onChange={(e) => setCustomValue(Number(e.target.value))}
                className="bg-[var(--secondary)] p-2 rounded-lg"
                min={0}
                step={0.1}
              />
            )}

            <div className="flex gap-2 justify-end">
              <button 
                className="px-4 py-2 bg-[var(--secondary)] rounded"
                onClick={() => setIntakePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-[var(--accent)] text-white rounded"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </Popup>
      )}
    </>
  )
}