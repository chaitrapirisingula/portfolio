import { useState, useEffect } from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { IoArrowBack } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import projects from "./projects.json";

const randomBorder = () => {
  const patterns = [
    "border-dashed border-red-400",
    "border-double border-blue-400",
    "border-dotted border-green-400",
    "border-double border-red-400",
    "border-dotted border-blue-400",
    "border-dashed border-green-400",
    "border-dotted border-red-400",
    "border-dashed border-blue-400",
    "border-double border-green-400",
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

export default function App() {
  const [expanded, setExpanded] = useState(null);
  const [borderStyle, setBorderStyle] = useState("");
  const [text, setText] = useState(" ");
  const [selectedTags, setSelectedTags] = useState([]);
  const phrase = "hello, i'm chaitra :)";

  // Extract all unique tags from projects
  const allTags = [
    ...new Set(projects.flatMap((project) => project.tags || [])),
  ];

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setText(phrase.slice(0, i));
      i++;
      if (i > phrase.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handleProjectClick = (projectId) => {
    if (expanded === null) {
      setExpanded(projectId);
      setBorderStyle(randomBorder());
    }
  };

  const handleBackClick = (e) => {
    e.stopPropagation();
    setExpanded(null);
  };

  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  // Filter projects based on selected tags
  const filteredProjects = projects.filter((project) => {
    if (selectedTags.length === 0) return true;
    return selectedTags.every(
      (tag) => project.tags && project.tags.includes(tag)
    );
  });

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col items-center justify-center py-10 px-2">
        <h1 className="text-3xl font-bold text-gray-800 text-center my-4 transition-opacity duration-1000 opacity-100">
          {text}
        </h1>
        <div className="flex flex-row items-center justify-center gap-8 my-2">
          <a
            href="https://github.com/chaitrapirisingula"
            className="flex items-center gap-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IoLogoGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/chaitra-pirisingula"
            className="flex items-center gap-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
          <a
            href="mailto:chaitrapirisingula@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:underline"
          >
            <IoMdMail className="w-6 h-6" />
          </a>
        </div>

        {expanded === null ? (
          <>
            {/* Tag filtering section */}
            <div className="w-full max-w-5xl px-4 mb-6 mt-2">
              <div className="flex flex-col space-y-4">
                <div className="flex flex-wrap gap-2 items-center justify-center">
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${
                        selectedTags.includes(tag)
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>

                <div className="flex items-center justify-center">
                  {selectedTags.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-500 hover:text-blue-700 flex items-center"
                    >
                      clear filters
                      <IoClose className="ml-1 w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* Projects container with fixed height */}
            <div className="w-full max-w-5xl px-4">
              <div className="relative min-h-72">
                {filteredProjects.length > 0 ? (
                  <div className="grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-6">
                    {filteredProjects.map((project) => (
                      <div
                        key={project.id}
                        className={`relative w-full aspect-square flex items-center justify-center p-6 shadow-lg cursor-pointer border-4 ${randomBorder()} transition-all duration-300 hover:scale-105`}
                        onClick={() => handleProjectClick(project.id)}
                      >
                        <div className="absolute inset-0 flex flex-col items-center text-center justify-center p-4">
                          <h2 className="lg:text-xl font-bold">
                            {project.title}
                          </h2>
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-12 mt-4"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-lg text-gray-500">no matches</p>
                    <button
                      onClick={clearFilters}
                      className="mt-4 px-4 py-2 text-blue-500 hover:text-blue-600 transition-colors"
                    >
                      clear filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </>
        ) : (
          // Expanded view of single project
          <div className="w-full max-w-5xl py-12 px-4">
            {projects
              .filter((project) => project.id === expanded)
              .map((project) => (
                <div
                  key={project.id}
                  className={`relative w-full min-h-96 flex flex-col p-8 shadow-lg border-4 ${borderStyle} transition-all duration-600 animate-fadeIn`}
                >
                  <button
                    onClick={handleBackClick}
                    className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <IoArrowBack className="w-6 h-6" />
                  </button>

                  <div className="flex flex-col md:flex-row gap-8 items-start mt-8">
                    <div className="md:w-1/3 flex justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full max-w-48 object-contain"
                      />
                    </div>

                    <div className="md:w-2/3">
                      <h2 className="text-3xl font-bold">{project.title}</h2>
                      {project.link && (
                        <a
                          href={project.link}
                          className="flex break-all items-center gap-2 py-2 text-blue-500 rounded hover:text-blue-600 hover:underline transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.link}
                        </a>
                      )}
                      <div className="flex flex-col gap-2 mb-6 mt-2">
                        {project.description.split("\n").map((line, index) => (
                          <p className="text-lg text-gray-700" key={index}>
                            {line}
                          </p>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags &&
                          project.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                            >
                              {tag}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
