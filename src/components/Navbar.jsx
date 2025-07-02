import { cn } from "@/lib/utils";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";

const navItems = [
	{ name: "Home", href: "#hero" },
	{ name: "About", href: "#about" },
	{ name: "Skills", href: "#skills" },
	{ name: "Projects", href: "#projects" },
	{ name: "Services", href: "#services" },
	{ name: "Contact", href: "#contact" },
];

export const Navbar = () => {
	const [isScrolled, setIsScrolled] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [activeSection, setActiveSection] = useState("hero"); // Track active section
	const mobileNavRef = useRef(null);
	const navContentRef = useRef(null);
	const toggleBtnRef = useRef(null);

	useEffect(() => {
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);

			// Track which section is currently in view
			const sectionIds = navItems.map((item) => item.href.replace("#", ""));
			const sections = sectionIds.map((id) => document.getElementById(id));

			// Calculate which section is most in view
			const scrollPosition = window.scrollY + window.innerHeight / 2;

			for (let i = sections.length - 1; i >= 0; i--) {
				const section = sections[i];
				if (section) {
					const sectionTop = section.offsetTop;
					const sectionHeight = section.offsetHeight;

					if (
						scrollPosition >= sectionTop &&
						scrollPosition <= sectionTop + sectionHeight
					) {
						setActiveSection(sectionIds[i]);
						break;
					}
				}
			}
		};

		// Check initial theme on load
		const storedTheme = localStorage.getItem("theme");
		setIsDarkMode(
			storedTheme === "dark" ||
				(!storedTheme &&
					window.matchMedia("(prefers-color-scheme: dark)").matches)
		);

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Handle clicks outside of menu to close it
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (
				isMenuOpen &&
				navContentRef.current &&
				!navContentRef.current.contains(event.target) &&
				toggleBtnRef.current &&
				!toggleBtnRef.current.contains(event.target)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [isMenuOpen]);

	// Lock body scroll when menu is open
	useEffect(() => {
		let scrollPosition = 0;

		if (isMenuOpen) {
			// Save current scroll position before locking
			scrollPosition = window.scrollY;
			document.body.style.position = "fixed";
			document.body.style.top = `-${scrollPosition}px`;
			document.body.style.width = "100%";
		} else {
			// Restore scroll position when unlocking
			const scrollY = document.body.style.top;
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";

			// Only attempt to restore scroll if we have a position saved
			if (scrollY) {
				window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
			}
		}

		return () => {
			document.body.style.position = "";
			document.body.style.top = "";
			document.body.style.width = "";
		};
	}, [isMenuOpen]);

	const toggleTheme = () => {
		if (isDarkMode) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDarkMode(false);
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDarkMode(true);
		}
	};

	return (
		<nav
			className={cn(
				"fixed w-full z-40 transition-all duration-300",
				isScrolled
					? "py-4 bg-background/80 backdrop-blur-md shadow-xs"
					: "py-4"
			)}
		>
			<div className="container flex items-center justify-between">
				{/* Left - Logo */}
				<a
					className="text-xl font-bold text-primary flex items-center"
					href="#hero"
				>
					<span className="relative z-10">
						<span className="text-glow text-foreground"> Mauricio's </span>{" "}
						Portfolio
					</span>
				</a>

				{/* Center - Navigation Items (Desktop) - Made more centered */}
				<div className="hidden lg:flex items-center justify-center flex-grow mx-auto">
					<div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-2 p-1 rounded-lg bg-background/50 backdrop-blur-sm">
						{navItems.map((item) => {
							const sectionId = item.href.replace("#", "");
							const isActive = activeSection === sectionId;
							return (
								<a
									key={sectionId}
									href={item.href}
									className={cn(
										"px-4 py-2 rounded-md transition-all duration-300 text-sm font-medium",
										isActive
											? "bg-primary/90 text-primary-foreground shadow-sm"
											: "text-foreground/80 hover:bg-primary/10 hover:text-primary"
									)}
								>
									{item.name}
								</a>
							);
						})}
					</div>
				</div>

				{/* Right - Theme toggle and mobile menu button */}
				<div className="flex items-center z-10">
					{/* Theme toggle - always visible */}
					<button
						onClick={toggleTheme}
						className="p-2 rounded-full border-primary/20 hover:bg-primary/10 transition-colors duration-300 mr-2"
						aria-label={
							isDarkMode
								? "Switch to Light Mode"
								: "Switch to Dark Mode"
						}
					>
						{isDarkMode ? (
							<Sun className="h-5 w-5 text-yellow-300" />
						) : (
							<Moon className="h-5 w-5 text-blue-900" />
						)}
					</button>

					{/* Mobile menu button - only visible on mobile */}
					<button
						ref={toggleBtnRef}
						onClick={() => setIsMenuOpen((prev) => !prev)}
						className="lg:hidden p-2 text-foreground z-50 relative"
						aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
					>
						{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
					</button>
				</div>
			</div>

			{/* Mobile navigation overlay - separate from the navbar */}
			<div
				ref={mobileNavRef}
				className={cn(
					"fixed inset-0 bg-background/95 backdrop-blur-md z-30",
					"flex items-center justify-center lg:hidden",
					"transition-all duration-300",
					isMenuOpen
						? "opacity-100 pointer-events-auto"
						: "opacity-0 pointer-events-none"
				)}
			>
				{/* Mobile navigation content */}
				<div
					ref={navContentRef}
					className="flex flex-col items-center max-h-[80vh] overflow-y-auto py-8"
				>
					<div className="flex flex-col space-y-3 p-2 bg-background/30 rounded-lg border border-border/50">
						{navItems.map((item, index) => {
							const sectionId = item.href.replace("#", "");
							const isActive = activeSection === sectionId;
							return (
								<a
									key={index}
									href={item.href}
									className={cn(
										"px-6 py-3 rounded-md transition-all duration-300 text-center",
										isActive
											? "bg-primary text-primary-foreground"
											: "bg-background/80 text-foreground/80 hover:bg-primary/10 hover:text-primary"
									)}
									onClick={() => setIsMenuOpen(false)}
									style={{
										transform: isMenuOpen ? "translateY(0)" : "translateY(-20px)",
										opacity: isMenuOpen ? 1 : 0,
										transitionDelay: isMenuOpen ? `${200 + index * 100}ms` : "0ms",
										transitionProperty: "transform, opacity",
										transitionDuration: "500ms",
									}}
								>
									{item.name}
								</a>
							);
						})}
					</div>
				</div>
			</div>
		</nav>
	);
};
