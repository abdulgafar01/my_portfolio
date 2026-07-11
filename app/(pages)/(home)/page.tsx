
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import ScrollText from '@/components/ScrollRevealParagraph'


const page = () => {
  return (
    // <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-white px-5 sm:px-10 dark:bg-black-100">
    //   <div className="w-full max-w-7xl">
    //     <Hero />
    //     <Grid />
    //     <FeaturedProjects />
    //     <ScrollText />
    //   </div>
    // </main>

    // <main className="relative  flex flex-col items-center justify-center bg-white dark:bg-black-100">

    //   <div className="overflow-hidden  mx-auto max-w-7xl px-5 sm:px-10">
    //     <Hero />
    //     <Grid />
    //     <FeaturedProjects />
    //   </div>

    //   <ScrollText />

    //   <div className="mx-auto max-w-7xl px-5 sm:px-10">
    //     {/* next sections */}
    //   </div>
    // </main>

    <main className="bg-white dark:bg-black-100">

      <Hero />
      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        <Grid />
        <FeaturedProjects />
      </div>

      <ScrollText />

      <div className="mx-auto max-w-7xl px-5 sm:px-10">
        {/* next sections */}
      </div>
    </main>
  )
}

export default page