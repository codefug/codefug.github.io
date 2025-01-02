'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NAVIGATION_ITEMS } from '@/constants/navigation'
import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import Switch from './switch'

export default function Header() {
  const [isChecked, setIsChecked] = useState(false)
  const { setTheme, theme } = useTheme()
  const pathName = `/${usePathname().split('/')[1]}`
  useEffect(() => {
    if (theme === 'dark') setIsChecked(true)
    else setIsChecked(false)
  }, [theme])

  return (
    <header className="fixed left-0 right-0 top-0 bg-background shadow-lg dark:shadow-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between p-4">
        <Link
          href="/"
          passHref
          className="flex items-center gap-2 hover:opacity-95 hover:drop-shadow-lg"
        >
          <Image
            src="/images/main-logo.png"
            alt="logo"
            height={0}
            width={0}
            className="h-7 w-full"
            sizes="28px"
            priority
          />
          <div className="hidden whitespace-nowrap text-lg font-bold text-black dark:text-white md:block">
            Codefug Blog
          </div>
        </Link>
        <section className="flex items-center gap-4 text-sm font-semibold md:text-base">
          <Link
            href={NAVIGATION_ITEMS.portfolio.href}
            passHref
            className={cn(
              `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
              pathName === NAVIGATION_ITEMS.portfolio.href
                ? 'text-black dark:text-white'
                : ''
            )}
          >
            {NAVIGATION_ITEMS.portfolio.label}
          </Link>
          <Link
            href={NAVIGATION_ITEMS.categories.href}
            passHref
            className={cn(
              `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
              pathName === NAVIGATION_ITEMS.categories.href
                ? 'text-black dark:text-white'
                : ''
            )}
          >
            {NAVIGATION_ITEMS.categories.label}
          </Link>
          <Link
            href={NAVIGATION_ITEMS.about.href}
            passHref
            className={cn(
              `text-gray-400 hover:text-black hover:underline hover:drop-shadow-lg hover:dark:text-white`,
              pathName === NAVIGATION_ITEMS.about.href
                ? 'text-black dark:text-white'
                : ''
            )}
          >
            {NAVIGATION_ITEMS.about.label}
          </Link>
          <Switch
            checked={isChecked}
            onCheckedChange={() =>
              theme === 'light' ? setTheme('dark') : setTheme('light')
            }
          />
        </section>
      </div>
    </header>
  )
}
