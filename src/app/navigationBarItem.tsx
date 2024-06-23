'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { Route } from 'next'
import { UrlObject } from 'url'

export default function NavigationBarItem<T extends string>({
  label,
  href,
}: {
  label: string
  href: Route<T> | UrlObject
}) {
  const pathname = usePathname()

  return (
    <Link
      href={href}
      className={`rounded-md my-auto px-3 py-2 ${
        pathname === href ? 'bg-gray-600' : 'text-gray-200 hover:text-white hover:bg-gray-500'
      } `}
    >
      {label}
    </Link>
  )
}
