
import { FeaturedProjects } from '@/components/FeaturedProjects'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'


const page = () => {
  return (
    <main className="relative mx-auto flex flex-col items-center justify-center overflow-hidden bg-white px-5 sm:px-10 dark:bg-black-100">
      <div className="w-full max-w-7xl">
        <Hero />
        <Grid />
        <FeaturedProjects />
      </div>
    </main>
  )
}

export default page