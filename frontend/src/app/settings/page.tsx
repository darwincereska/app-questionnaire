'use client'
import { authCommands } from "@/app/lib/auth"
// import { Haptics, ImpactStyle } from '@capacitor/haptics';
import pb from "@/app/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { ProfileCard } from "@/app/components/ProfileCard"
import { Popup } from "@/app/components/Popup"
import { Section } from "@/app/components/Section"
import { goalCommands } from "@/app/lib/goal"
import {motion} from 'framer-motion'
import { ActionButton } from "@/app/components/ActionButton"
import { GenderSelector } from "@/app/components/GenderSelector"
export default function AccountPage() {
  const router = useRouter()
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false)
  const logout = () => {
    authCommands.logout()
    goalCommands.clear()
    return router.replace("/login")
  }
  if (!authCommands.isAuthenticated()) {
    return router.replace('/login')
  }


  const changeName = () => {
    setIsChangeNameOpen(true)
  }

  const closeName = () => {
    setIsChangeNameOpen(false)
  }

  const deleteAccount = async () => {
    const userId = authCommands.getUser()?.id;
    if (userId) {
      await pb.collection('users').delete(userId);
      authCommands.logout();
      return router.replace('/login');
    }
  }

  return (
    <>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {isChangeNameOpen && (
        <Popup>
            <h2 className="text-xl font-bold mb-4">Change Name</h2>
            <input
              type="text"
              placeholder="Enter new name"
              className="w-full p-2 mb-4 bg-[var(--secondary)] rounded-lg" 
              defaultValue={authCommands.getUser()?.name}
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={closeName}
                className="px-4 py-2 bg-[var(--secondary)] rounded-lg"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-[var(--accent)] rounded-lg"
                onClick={async () => {
                  const userId = authCommands.getUser()?.id;
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (userId && input) {
                    await pb.collection('users').update(userId, {
                      name: input.value
                    });
                    closeName();
                    return router.refresh();
                  }
                }}
              >
                Save
              </button>
            </div>
        </Popup>
      )}
      <main className="flex flex-col gap-4">
      <Section title="Profile" id="details">
        <div className="flex flex-col space-y-4 w-full">
          <ProfileCard name={authCommands.getUser()?.name}  email={authCommands.getUser()?.email}/>
          <ActionButton variant="primary" onClick={() => changeName()}>
            <span>Change Name</span>
          </ActionButton>
          <GenderSelector 
            selectedGender={authCommands.getUser()?.gender}
            onGenderChange={async (gender) => {
              const userId = authCommands.getUser()?.id;
              if (userId) {
                await pb.collection('users').update(userId, {
                  gender: gender,
                  goal: gender === 'male' ? 3.7 : 2.7,
                });
                return router.refresh();
              }
            }}
          />
          <ActionButton variant="primary" onClick={() => logout()}>
            <span>Sign Out</span>
          </ActionButton>
        </div>
      </Section>
      <Section title="Subscription">
        <div className="flex flex-col gap-4">
          <div className="flex items-center space-x-3 p-3 bg-[var(--secondary)] rounded-lg">
            <div>
              <p className="font-semibold">Current Plan:</p>
                <p className="text-sm opacity-75">{authCommands.getUser()?.premium ? 'Premium' : 'Free'}</p>
            </div>
          </div>
          <ActionButton variant="primary" onClick={() => logout()}>
            <span>{ authCommands.getUser()?.premium ? 'Unsubscribe' : 'Subscribe' }</span>
          </ActionButton>
        </div>
      </Section>
      <Section title="Advanced" >
        <ActionButton onClick={() => deleteAccount()} variant="danger">
          <span>Delete Account</span>
        </ActionButton>
      </Section>
      </main>
    </motion.div>
    </>
  )
}
