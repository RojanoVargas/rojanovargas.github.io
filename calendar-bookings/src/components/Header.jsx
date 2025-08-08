import "./Header.css";
import {
	FaLinkedin,
	FaGithub,
	FaBars,
	FaChevronDown,
	FaCircleQuestion,
	FaUser,
} from "react-icons/fa6";
import { useState } from "react";

const Header = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	return (
		<header className="header">
			<div className="container">
				{/* Logo */}
				<a href="https://roadsurfer.com" className="logo">
					<img
						src="https://roadsurfer.com/wp-content/themes/roadsurfer/_/img/logo/logo.svg"
						alt="Roadsurfer Logo"
					/>
				</a>

				{/* Navigation */}
				<nav
					className={`nav-links ${isMobileMenuOpen ? "nav-links-mobile" : ""}`}
				>
					<a
						href="https://github.com/rojanovargas/rojanovargas.github.io"
						target="_blank"
					>
						<FaGithub />
					</a>
					<a href="https://linkedin.com/in/eloy-rojano-vargas" target="_blank">
						<FaLinkedin />
					</a>
				</nav>

				{/* Icons */}
				<div className="icons">
					<a onClick={() => alert("Absolutely.")}>Should we hire him?</a>
				</div>

				{/* Mobile Toggle */}
				<button
					className="mobile-toggle"
					aria-label="Toggle navigation"
					onClick={toggleMobileMenu}
				>
					<FaBars />
				</button>
			</div>
		</header>
	);
};

export default Header;
