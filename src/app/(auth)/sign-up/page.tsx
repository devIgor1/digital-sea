"use client"

import { Icons } from "@/components/Icons"
import { buttonVariants } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const Page = () => {
  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-32 w-32" />
            <h1 className="text-2xl font-bold">Create an account</h1>
            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={}>
              <div className="grid gap-2">
                <div className="grid gap-1 py-2"></div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Page
