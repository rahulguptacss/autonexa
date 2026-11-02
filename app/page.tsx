import React from 'react';
import type { Metadata } from 'next';
import Header from '../components/sections/Header/page';
import Hero from '../components/sections/Hero/page';
import About from '../components/sections/About/page';
import Projects from '../components/sections/Projects/page';
import ProductsSolutions from '../components/sections/ProductsSolutions/page';
import Quality from '../components/sections/Quality/page';
import WhyChooseUs from '../components/sections/WhyChooseUs/page';
import Clients from '../components/sections/Clients/page';
import Contact from '../components/sections/Contact/page';
import Footer from '../components/sections/Footer/page';
import BackToTop from '../components/ui/BackToTop';
import { common, pages, sections, type PageComponent } from '../components/types';

const pageData = pages.home;

export const metadata: Metadata = {
  title: pageData.metadata.title,
  description: pageData.metadata.description,
};

export default function Home() {
  const sectionMap: Record<string, React.ReactNode> = {
    Hero: <Hero data={sections.hero} />,
    About: <About data={sections.about} />,
    Projects: <Projects data={sections.projects} variant="grid" />,
    ManufacturingCapabilities: <Projects data={sections.projects} variant="grid" />,
    ProductsSolutions: <ProductsSolutions data={sections.products_solutions || sections.solutions} variant="split" />,
    Solutions: <ProductsSolutions data={sections.products_solutions || sections.solutions} variant="split" />,
    Quality: sections.quality ? <Quality data={sections.quality} /> : null,
    WhyChooseUs: sections.why_choose_us ? <WhyChooseUs data={sections.why_choose_us} /> : null,
    Clients: sections.clients ? <Clients data={sections.clients} /> : null,
    Partners: sections.clients ? <Clients data={sections.clients} /> : null,
    Contact: <Contact data={sections.contact} />,
  };

  return (
    <div className="flex min-h-screen flex-col bg-white font-sans">
      <Header data={common.Header} />
      <main className="w-full flex-1">
        {pageData.components.map((block: PageComponent) => (
          <React.Fragment key={block.key}>{sectionMap[block.component] ?? null}</React.Fragment>
        ))}
      </main>
      <Footer data={common.Footer} />
      <BackToTop data={common.BackToTop} />
    </div>
  );
}
