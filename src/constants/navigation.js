import { FaHome } from "react-icons/fa";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
	{
		label: "TV shows",
		href: "/tv",
		icon: <PiTelevisionFill />,
	},
	{
		label: "Movies",
		href: "/movie",
		icon: <BiSolidMoviePlay />,
	},
];

export const mobileNavigation = [
	{
		label: "Home",
		href: "/",
		icon: <FaHome />,
	},
	...navigation,
	{
		label: "Search",
		href: "/search",
		icon: <IoSearchOutline />,
	},
];
