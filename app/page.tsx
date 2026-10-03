import React from 'react';
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

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050505] text-[#f5f5f5] selection:bg-[#d7192f] selection:text-white">
      <Navbar />
      <Hero />
      <About />
      <AcademicYearbook />
      <Skills />
      <Projects />
      <Experience />
      <Education />
      <Availability />
      <Contact />
      <Footer />
    </main>
  );
}


