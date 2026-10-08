
import { MyApproach } from '@/components/MyApproach'
import SelectedWork from '@/components/selected-work'
import Grid from '@/components/Grid'
import Hero from '@/components/Hero'
import ScrollText from '@/components/ScrollRevealParagraph'
import Strip from '@/components/strip'
import Container from '@/components/layout/Container'
import ProjectHighlights from '@/components/ProjectHighlights'


const page = () => {
  return (

    <main className="bg-white dark:bg-black-100">
      <Hero />
      <Strip />

      <SelectedWork />
      <Container>
        {/* <Grid /> */}
        <ProjectHighlights/>
      </Container>
      <MyApproach />


      <ScrollText />


    </main>
  )
}

export default page