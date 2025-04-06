'use client'
import Link from "next/link"
import { FaChartPie, FaGear, FaGlassWater } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { usePathname } from 'next/navigation';
import { authCommands } from "@/app/lib/auth";
import { Haptics, ImpactStyle } from "@capacitor/haptics";

export function NavigationBar() {
  const pathname = usePathname();
  return(
    <div className="bg-[var(--secondary)] shadow-sm p-2 pb-6 h-auto fixed bottom-0 flex flex-row justify-evenly items-center w-full">
      <Button image={<FaGlassWater size="24"/>} url="/" text="Home" isActive={pathname === '/'} />
      <Button image={<FaChartPie size='24' />} text="Reports" url="/stats" isActive={pathname === '/stats'} />
      <Button image={authCommands.isAuthenticated() ? <FaGear size='24' /> : <FaUser size='24' />} text={authCommands.isAuthenticated() ? "Settings" : "Login"} url={authCommands.isAuthenticated() ? "/settings" : "/login"} isActive={pathname === '/login' || pathname === '/settings'} />
    </div>
  )
}

interface Props  {
  image: React.ReactElement;
  url: string;
  text: string;
  isActive: boolean;
}

function Button({image, url, text, isActive}: Props) {
  const hapticsImpactMedium = async () => {
    await Haptics.impact({ style: ImpactStyle.Medium });
  };
  return (
    <Link onClick={async () => await hapticsImpactMedium()} href={url} className={`text-white text-center flex flex-col items-center ${isActive ? 'opacity-100' : 'opacity-50'}`}>
      {image}
      <span className="text-sm text-center brightness-90">{text}</span>
    </Link>
  )
}