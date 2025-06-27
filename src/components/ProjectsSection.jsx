import { ArrowRight, ExternalLink, Github, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

const projects = [
	{
		id: 1,
		title: "TJ-Fitness Gym Management System",
		description:
			"A Fully fucntional Gym Management System with user authentication, membership management, and payment processing.",
		image: "/projects/project1.png",
		tags: ["PHP", "HTML", "Tailwind", "JavaScript"],
		demoUrl: "#",
		githubUrl: "https://github.com/Matchewmau/TJ-fitness.git",
	},
	{
		id: 2,
		title: "PConnect - An Ecommerce platform for Distributors and Retailers",
		description:
			"An e-commerce platform designed to connect distributors and retailers, featuring a modern interface and robust functionality.",
		image: "/projects/project2.png",
		tags: ["Laravel", "Tailwind", "SQLite"],
		demoUrl: "#",
		githubUrl: "https://github.com/ajmayran/PConnect-Laravel.git",
	},
	{
		id: 3,
		title: "GymLens - Gym Equipment Analyzer",
		description:
			"A teachable machine system that uses computer vision to analyze gym equipment usage, providing insights and exercise recommendation.",
		image: "/projects/project3.png",
		tags: ["Python", "OpenCV", "Tkinter", "Teachable Machine"],
		demoUrl: "#",
		githubUrl: "https://github.com/Matchewmau/GymLens.git",
	},
];

// Modal component for displaying images
const ImageModal = ({ isOpen, image, alt, onClose }) => {
	useEffect(() => {
		const handleEscape = (e) => {
			if (e.key === "Escape") onClose();
		};

		if (isOpen) {
			document.body.style.overflow = "hidden";
			document.addEventListener("keydown", handleEscape);
		}

		return () => {
			document.body.style.overflow = "";
			document.removeEventListener("keydown", handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
			onClick={onClose}
		>
			<div
				className="relative max-w-4xl max-h-[90vh] rounded-lg overflow-hidden shadow-2xl"
				onClick={(e) => e.stopPropagation()}
			>
				<button
					onClick={onClose}
					className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background/100 transition-colors duration-200"
					aria-label="Close image"
				>
					<X size={24} className="text-foreground" />
				</button>
				<img
					src={image}
					alt={alt}
					className="max-w-full max-h-[90vh] object-contain"
				/>
			</div>
		</div>,
		document.body
	);
};

export const ProjectsSection = () => {
	const [selectedImage, setSelectedImage] = useState(null);

	return (
		<section id="projects" className="py-24 px-4 relative">
			<div className="container mx-auto max-w-5xl">
				<h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
					{" "}
					Featured <span className="text-primary"> Projects </span>
				</h2>

				<p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
					Each project showcases my ability to design and build complete systems —
					with a focus on functionality, performance, and user-centered design, all
					wrapped in a clean, modern interface.
				</p>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{projects.map((project, key) => (
						<div
							key={key}
							className="group bg-card rounded-lg overflow-hidden shadow-xs card-hover relative"
						>
							<div className="h-48 overflow-hidden">
								<img
									src={project.image}
									alt={project.title}
									onClick={() =>
										setSelectedImage({
											url: project.image,
											alt: project.title,
										})
									}
									className="w-full h-full object-cover transition-all duration-500 
                           group-hover:scale-110 group-hover:translate-y-[-10px] 
                           cursor-pointer"
								/>
							</div>

							<div className="p-6">
								<div className="flex flex-wrap gap-2 mb-4">
									{project.tags.map((tag, idx) => (
										<span
											key={idx}
											className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
										>
											{tag}
										</span>
									))}
								</div>

								<h3 className="text-xl font-semibold mb-1">
									{" "}
									{project.title}
								</h3>
								<p className="text-muted-foreground text-sm mb-4">
									{project.description}
								</p>
								<div className="flex justify-between items-center">
									<div className="flex space-x-3">
										<a
											href={project.demoUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<ExternalLink size={20} />
										</a>
										<a
											href={project.githubUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="text-foreground/80 hover:text-primary transition-colors duration-300"
										>
											<Github size={20} />
										</a>
									</div>
								</div>
							</div>
						</div>
					))}
				</div>

				<div className="text-center mt-12">
					<a
						className="cosmic-button w-fit flex items-center mx-auto gap-2"
						target="_blank"
						rel="noopener noreferrer"
						href="https://github.com/machadop1407"
					>
						Check My Github <ArrowRight size={16} />
					</a>
				</div>
			</div>

			{/* Image Modal */}
			<ImageModal
				isOpen={!!selectedImage}
				image={selectedImage?.url}
				alt={selectedImage?.alt}
				onClose={() => setSelectedImage(null)}
			/>
		</section>
	);
};
