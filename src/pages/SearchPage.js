import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import _ from "lodash";
import Card from "../components/Card";

const SearchPage = () => {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const query = location?.search?.slice(3);

	const fetchData = async (searchQuery, searchPage) => {
		try {
			const response = await axios.get("/search/multi", {
				params: {
					query: searchQuery,
					page: searchPage,
				},
			});
			setData((prev) => {
				const combinedData = [...prev, ...response?.data?.results];
				const uniqueData = combinedData.filter(
					(value, index, self) =>
						index === self.findIndex((t) => t.id === value.id)
				);
				return uniqueData;
			});
		} catch (error) {
			console.log("error", error);
		}
	};

	const debouncedFetchData = useCallback(
		_.debounce(
			(searchQuery, searchPage) => fetchData(searchQuery, searchPage),
			500
		),
		[]
	);

	useEffect(() => {
		if (query) {
			setPage(1);
			setData([]);
			debouncedFetchData(query, 1);
		}
	}, [location?.search]);

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		if (query && page > 1) {
			debouncedFetchData(query, page);
		}
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="py-16 h-screen">
			<div className="lg:hidden my-2 mx-2 sticky top-[65px] z-30">
				<input
					type="text"
					placeholder="Search here..."
					onChange={(e) => navigate(`/search?q=${e.target.value}`)}
					className="px-4 py-2 w-full text-lg bg-neutral-100 text-neutral-900 rounded-full outline-none border-none"
					aria-label="Search input"
				/>
			</div>

			<div className="container mx-auto">
				<h3
					className="capitalize text-lg lg:text-3xl font-semibold my-3 px-3"
					tabIndex="0"
					aria-live="polite"
				>
					Search Results
				</h3>

				<div className="grid grid-cols-[repeat(auto-fit,230px)] gap-6 justify-center lg:justify-start">
					{data.map((searchData, index) => {
						return (
							<Card
								data={searchData}
								key={searchData.id + "search" + index}
								media_type={searchData.media_type}
								aria-label={`Result ${index + 1}: ${
									searchData.title || searchData.name
								}`}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default SearchPage;
