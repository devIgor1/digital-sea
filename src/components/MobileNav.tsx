"use client"

import { PRODUCT_CATEGORIES } from "@/config"
import { LogInIcon, Menu, UserCircle2, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) document.body.classList.add("overflow-hidden")
    else document.body.classList.remove("overflow-hidden")
  }, [isOpen])

  if (!isOpen)
    return (
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="lg:hidden relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
      >
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>
    )

  return (
    <div>
      <div className="relative z-40 md:hidden">
        <div className="fixed inset-0 bg-black bg-opacity-25" />
      </div>

      <div className="fixed overflow-y-scroll overscroll-y-none inset-0 z-40 flex">
        <div className="w-4/5">
          <div className="relative flex w-full max-w-sm flex-col overflow-y-auto bg-white pb-12 shadow-xl">
            <div className="flex px-4 pb-2 pt-5">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-2">
              <ul>
                {PRODUCT_CATEGORIES.map((category) => (
                  <li
                    key={category.label}
                    className="space-y-10 px-4 pb-8 pt-10"
                  >
                    <div className="border-b border-gray-200">
                      <div className="-mb-px flex">
                        <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                          {category.label}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                      {category.featured.map((item) => (
                        <div key={item.name} className="group relative text-sm">
                          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                            <Image
                              fill
                              src={item.imageSrc}
                              alt="product category image"
                              className="object-cover object-center"
                            />
                          </div>
                          <Link
                            href={item.href}
                            className="mt-6 block font-medium text-gray-900"
                          >
                            {item.name}
                          </Link>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-gray-200 px-4 py-6 flex items-center justify-between">
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-in")}
                  href="/sign-in"
                  className="-m-2 p-2 font-medium text-gray-900 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                >
                  Sign in
                  <LogInIcon className="text-gray-700" />
                </Link>
              </div>
              <div className="flow-root">
                <Link
                  onClick={() => closeOnCurrent("/sign-up")}
                  href="/sign-up"
                  className="-m-2 p-2 font-medium text-gray-900 hover:bg-gray-200 rounded-lg flex items-center gap-2"
                >
                  Sign up
                  <UserCircle2 className="text-gray-700" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MobileNav
