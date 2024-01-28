import Image from "next/image"

const ThankYouPage = () => {
  return (
    <main className="relative lg:min-h-full">
      <div className="h-80 overflow-hidden lg:absolute lg:h-full lg:w-1/2 lg:pr-4 xl:pr-12">
        <Image
          fill
          className="h-full w-full object-cover object-center"
          alt="thank you for your order"
        />
      </div>
      <div>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-32 xl:gap-x-24"></div>
      </div>
    </main>
  )
}

export default ThankYouPage
