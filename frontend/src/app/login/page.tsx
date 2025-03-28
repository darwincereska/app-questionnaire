'use client'
import { motion } from "framer-motion"
import { useState } from "react"
import { authCommands } from "@/app/lib/auth"
import { useRouter } from "next/navigation"
import pb from "@/app/lib/pocketbase"

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      if (isLogin) {
        await authCommands.login(email, password)
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match')
          return
        }
        await pb.collection('users').create({
          email,
          password,
          passwordConfirm: confirmPassword,
          name: name
        })
      }
      router.push('/settings')
    } catch (err: unknown) {
      console.error(err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center min-h-screen p-4"
    >
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center mb-8">
          {isLogin ? 'Login' : 'Register'}
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded bg-[var(--foreground)] focus:outline-none"
        />
        
        {!isLogin && (
          <input
            type="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 rounded bg-[var(--foreground)] focus:outline-none"
          />
        )}

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded bg-[var(--foreground)] focus:outline-none"
        />

        {!isLogin && (
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 rounded bg-[var(--foreground)] focus:outline-none"
          />
        )}

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          className="w-full p-3 rounded bg-[var(--accent)] hover:bg-blue-700 transition"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>

        <p className="text-center text-sm">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-400 hover:underline"
          >
            {isLogin ? 'Register' : 'Login'}
          </button>
        </p>
      </form>
    </motion.div>
  )
}