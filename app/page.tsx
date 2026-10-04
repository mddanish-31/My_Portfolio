import React from 'react';
import { getCMSContent } from '@/lib/cms/data-access';
import { Navbar } from '@/components/layout/Navbar';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { AcademicYearbook } from '@/components/sections/AcademicYearbook';
import { Skills } from '@/components/sections/Skills';
import { Projects } from '@/components/sections/Projects';
import { Experience } from '@/components/sections/Experience';
import { Education } from '@/components/sections/Education';
import { Availability } from '@/components/sections/Availability';
import { Contact } from '@/components/sections/Contact';
import { Footer } from '@/components/sections/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const cms = await getCMSContent();

  const isSectionEnabled = (id: string) => {
    const sec = cms.sections?.find((s) => s.id === id);
    return sec ? sec.enabled : true;
  };

  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#d7192f] selection:text-white">
      <Navbar content={cms.navigation} settings={cms.settings} />
      {isSectionEnabled('home') && <Hero content={cms.hero} />}
      {isSectionEnabled('about') && <About content={cms.about} />}
      {isSectionEnabled('academic') && <AcademicYearbook content={cms.academic} />}
      {isSectionEnabled('skills') && <Skills content={cms.skills} />}
      {isSectionEnabled('projects') && <Projects content={cms.projects} />}
      {isSectionEnabled('experience') && <Experience content={cms.experience} />}
      {isSectionEnabled('education') && <Education content={cms.education} />}
      {isSectionEnabled('availability') && <Availability content={cms.availability} />}
      {isSectionEnabled('contact') && <Contact content={cms.contact} />}
      {isSectionEnabled('footer') && <Footer content={cms.footer} settings={cms.settings} />}
    </main>
  );
}


