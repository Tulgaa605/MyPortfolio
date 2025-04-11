import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Link from 'next/link';
import prisma from '@/lib/prisma';
import AnimatedSection from '@/components/AnimatedSection';

// Define the Project type needed for the Projects component
type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string | null;
  featured?: boolean;
  order?: number;
  createdAt?: Date; 
  updatedAt?: Date;
};
async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' },
    });
    return projects as Project[];
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return []; 
  }
}

export default async function Home() {
  const projects = await getProjects();

  return (
    <>
      <section id="hero" className="relative z-10 flex flex-col items-center justify-center text-center py-24 md:py-32">
        <div className="relative max-w-4xl mx-auto px-4">
          <h1 className="mb-4 text-5xl md:text-7xl font-extrabold tracking-tight text-white">
            Hi, I&apos;m Munkhtulga
          </h1>
          <h2 className="mb-8 text-2xl md:text-4xl font-semibold text-indigo-200">
            Full Stack Developer
          </h2>
          <p className="mb-12 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
            Crafting seamless digital experiences from front-end elegance to back-end robustness. Let&apos;s build something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
             <Link 
               href="/#projects"
               className="inline-flex items-center justify-center px-8 py-3 border border-white text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
             >
               View My Projects
             </Link>
             <Link 
               href="/#contact"
               className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-100 transition duration-300 ease-in-out shadow-lg transform hover:-translate-y-1"
             >
               Get In Touch
             </Link>
          </div>
          <div className="flex justify-center space-x-10">
            <a href="https://github.com/Tulgaa605" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://www.instagram.com/tsasan_hun_/" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.05 1.066.06 1.405.06 4.122s-.01 3.056-.06 4.122c-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772c-.556.555-1.112.9-1.772 1.153-.637.247-1.363.415-2.428.465-1.066.05-1.405.06-4.122.06s-3.056-.01-4.122-.06c-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12s.01-3.056.06-4.122c.05-1.065.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.378 2.52c.637-.248 1.363-.415 2.428-.465C8.866 2.013 9.205 2 12 2zm0 1.8c-2.68 0-3.009.01-4.064.059-1.008.046-1.604.207-2.128.414-.55.215-1.004.52-1.448.963a3.1 3.1 0 00-.964 1.448c-.207.524-.368 1.12-.414 2.128C2.96 9.009 2.95 9.32 2.95 12s.01 2.991.059 4.064c.046 1.008.207 1.604.414 2.128.215.55.52 1.004.964 1.448.444.443.897.748 1.448.964.524.207 1.12.368 2.128.414C9.009 21.04 9.32 21.05 12 21.05s2.991-.01 4.064-.059c1.008-.046 1.604-.207 2.128-.414.55-.216 1.004-.52 1.448-.964.443-.444.748-.897.964-1.448.207-.524.368-1.12.414-2.128.049-1.073.059-1.384.059-4.064s-.01-2.991-.059-4.064c-.046-1.008-.207-1.604-.414-2.128a3.1 3.1 0 00-.964-1.448c-.444-.443-.898-.748-1.448-.963-.524-.208-1.12-.369-2.128-.415C15.009 3.81 14.68 3.8 12 3.8zm0 4.495A3.705 3.705 0 1012 15.7a3.705 3.705 0 000-7.405zm0 6.113a2.408 2.408 0 110-4.816 2.408 2.408 0 010 4.816zM16.95 6.584a1.155 1.155 0 100 2.31 1.155 1.155 0 000-2.31z" clipRule="evenodd" /></svg>
            </a>
            <a href="https://www.facebook.com/munhtulga.enhbayr" target="_blank" rel="noopener noreferrer" className="text-gray-200 hover:text-white transition-colors duration-300 transform hover:scale-110">
              <svg className="w-9 h-9" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33V21.878A10.004 10.004 0 0022 12z" clipRule="evenodd" /></svg>
            </a>
          </div>
        </div>
      </section>

      <AnimatedSection
        id="about"
        className="relative z-10 py-16 md:py-20"
      >
        <div className="container mx-auto px-4">
          <About />
        </div>
      </AnimatedSection>
      <AnimatedSection
        id="skills"
        className="relative z-10 py-16 md:py-20"
        delay={0.1}
      >
        <div className="container mx-auto px-4">
          <Skills />
        </div>
      </AnimatedSection>
      <AnimatedSection
        id="projects"
        className="relative z-10 py-16 md:py-20"
        delay={0.2}
      >
        <div className="container mx-auto px-4">
          <Projects projects={projects} />
        </div>
      </AnimatedSection>
      <AnimatedSection
        id="contact"
        className="relative z-10 py-16 md:py-20"
        delay={0.3}
      >
        <div className="container mx-auto px-4">
          <Contact />
        </div>
      </AnimatedSection>
    </>
  );
}
