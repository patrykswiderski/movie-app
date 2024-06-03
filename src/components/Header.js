import React, { useEffect, useState } from "react";
import Logo from "../assets/logo_l.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import UserIcon from "../assets/user_icon.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../constants/navigation";

const Header = () => {
	const [searchInput, setSearchInput] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (searchInput) {
			navigate(`/search?q=${searchInput}`);
		}
	}, [searchInput]);

	const handleSubmit = (e) => {
		e.preventDefault();
	};

	return (
		<header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-40">
			<div className="container mx-auto px-3 flex items-center h-full">
				<Link to="/">
					<img src={Logo} alt="logo" width={120} />
				</Link>

				<nav className="hidden lg:flex items-center gap-2 ml-5">
					{navigation.map((nav, index) => {
						return (
							<div key={index}>
								<NavLink
									key={nav.label}
									to={nav.href}
									className={({ isActive }) =>
										`px-2 hover:text-neutral-50 ${isActive && " text-white"}`
									}
								>
									{nav.label}
								</NavLink>
							</div>
						);
					})}
				</nav>

				<div className="ml-auto flex items-center gap-4">
					<form className="flex items-center gap-2" onSubmit={handleSubmit}>
						<input
							type="text"
							placeholder="Search here..."
							className="bg-transparent px-4 py-1 outline-none border-none hidden lg:block"
							onChange={(e) => setSearchInput(e.target.value)}
							value={searchInput}
						/>
						<button className="text-2xl text-white">
							<IoSearchOutline />
						</button>
					</form>

					<div className="w-9 h-9 overflow-hidden cursor-pointer active:scale-50 transition-all">
						<img src={UserIcon} alt="logo" width="100%" />
					</div>
				</div>
			</div>
		</header>
	);
};

export default Header;
