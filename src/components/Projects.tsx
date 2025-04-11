import ProjectList from './ProjectList';

// Define the Project type here if not using a central types file
// This should match the structure returned by prisma and expected by ProjectList
type Project = {
  id: string;
  title: string;
  description: string;
  image: string | null; // Prisma might return null for optional fields
  technologies: string[];
  githubUrl: string;
  liveUrl?: string | null;
  featured?: boolean;
  // Add other fields as defined in your prisma schema and needed by ProjectList
  order?: number;
  createdAt?: Date;
  updatedAt?: Date;
};

type ProjectsProps = {
  projects: Project[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <>
      <div className="text-center mb-12 md:mb-16">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
          Featured Projects
        </h2>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          A selection of my work. Filter by category to see more.
        </p>
      </div>
      
      {/* Pass the fetched projects to the client component */}
      <ProjectList projects={projects} />
    </>
  );
} 