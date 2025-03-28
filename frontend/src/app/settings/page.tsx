'use client'
import { authCommands } from "@/app/lib/auth"
import pb from "@/app/lib/pocketbase"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Popup } from "@/app/components/Popup"
import {motion} from 'framer-motion'
export default function AccountPage() {
  const router = useRouter()
  const logout = () => {
    authCommands.logout()
    router.push("/login")
  }
  if (!authCommands.isAuthenticated()) {
    router.push('/login')
  }
  const [isChangeNameOpen, setIsChangeNameOpen] = useState(false)

  const changeName = () => {
    setIsChangeNameOpen(true)
  }

  const closeName = () => {
    setIsChangeNameOpen(false)
  }
  
  const deleteAccount = () => {
    const userId = authCommands.getUser()?.id;
    if (userId) {
      pb.collection('users').delete(userId);
      authCommands.logout();
      router.push('/login');
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
                onClick={() => {
                  const userId = authCommands.getUser()?.id;
                  const input = document.querySelector('input[type="text"]') as HTMLInputElement;
                  if (userId && input) {
                    pb.collection('users').update(userId, {
                      name: input.value
                    });
                  }
                  router.push('/settings')
                  closeName()
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
          <div className="flex items-center space-x-3 p-3 bg-[var(--secondary)] rounded-lg">
            <div className="w-12 h-12 rounded-full bg-[var(--accent)] flex items-center justify-center">
              <span className="text-xl font-bold">{authCommands.getUser()?.name?.[0]}</span>
            </div>
            <div>
              <p className="font-semibold">{authCommands.getUser()?.name}</p>
              <p className="text-sm opacity-75">{authCommands.getUser()?.email}</p>
            </div>
          </div>
          <button 
            className="w-full py-3 px-4 bg-[var(--accent)] rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center space-x-2"
            onClick={() => changeName()}
          >
            {/* <FaSignOutAlt size={20} /> */}
            <div className=""/>
            <span>Change Name</span>
          </button>
          <div className="w-full py-3 px-4 bg-[var(--secondary)] rounded-lg font-medium flex items-center justify-between">
            <div className="flex items-center space-x-2 w-full">
              <button
                className={`w-1/2 px-4 py-2 rounded-lg ${
                  authCommands.getUser()?.gender === 'male' 
                    ? 'bg-[var(--accent)]' 
                    : 'bg-[var(--foreground)]'
                }`}
                onClick={() => {
                  const userId = authCommands.getUser()?.id;
                  if (userId) {
                    pb.collection('users').update(userId, {
                      gender: 'male'
                    });
                  }
                  router.push('/settings');
                }}
              >
                Male
              </button>
              <button 
                className={`w-1/2 px-4 py-2 rounded-lg ${
                  authCommands.getUser()?.gender === 'female'
                    ? 'bg-[var(--accent)]'
                    : 'bg-[var(--foreground)]' 
                }`}
                onClick={() => {
                  const userId = authCommands.getUser()?.id;
                  if (userId) {
                    pb.collection('users').update(userId, {
                      gender: 'female'
                    });
                  }
                  router.push('/settings');
                }}
              >
                Female
              </button>
            </div>
          </div>
          <button 
            className="w-full py-3 px-4 bg-[var(--accent)] rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center space-x-2"
            onClick={() => logout()}
          >
            {/* <FaSignOutAlt size={20} /> */}
            <div className=""/>
            <span>Sign Out</span>
          </button>
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
          <button 
            className="w-full py-3 px-4 bg-[var(--accent)] rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center space-x-2"
            onClick={() => logout()}
          >
            {/* <TbFlagCancel size={20} /> */}
            <div className=""/>
              <span>{authCommands.getUser()?.premium ? 'Unsubscribe' : 'Subscribe'}</span>
          </button>
        </div>
      </Section>
      <Section title="Advanced" >
        <button 
          className="w-full py-3 px-4 bg-red-500 rounded-lg font-medium active:scale-95 transition-transform flex items-center justify-center space-x-2"
          onClick={() => deleteAccount()}
        >
          {/* <TbFlagCancel size={20} /> */}
          <div className=""/>
            <span>Delete Account</span>
        </button>
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
}

function Section({title,id, children}: SectionProps) {
  return (
    <section id={id} className="w-full flex flex-col justify-start bg-[var(--foreground)] p-4 hover:brightness-125 rounded-lg shadow-sm">
      <h1 className="text-lg font-bold mb-2">{title}</h1>
      {children}
    </section>
  )
}