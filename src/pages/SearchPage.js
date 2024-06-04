import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";

const SearchPage = () => {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const fetchData = async () => {
		try {
			const response = await axios.get("/search/multi", {
				params: {
					query: location?.search?.slice(3),
					page: page,
				},
			});
			setData((prev) => {
				return [...prev, ...response?.data?.results];
			});
		} catch (error) {
			console.log("error", error);
		}
	};

	useEffect(() => {
		setPage(1);
		setData([]);
		fetchData();
	}, [location?.search]);

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		fetchData();
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="py-16">
			<div className="lg:hidden my-2 mx-1 sticky top-[65px] z-30">
				<input
					type="text"
					placeholder="Search here..."
					onChange={(e) => navigate(`/search?q=${e.target.value}`)}
					className="px-4 py-1 w-full text-lg bg-neutral-100 text-neutral-900 rounded-full outline-none border-none"
				/>
			</div>

			<div className="container mx-auto">
				<h3 className="capitalize text-lg lg:text-3xl font-semibold my-3">
					Search Results
				</h3>

				<div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
					{data.map((searchData, index) => {
						return (
							<Card
								data={searchData}
								key={searchData.id + "search" + index}
								media_type={searchData.media_type}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
