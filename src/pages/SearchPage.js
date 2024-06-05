import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Card from "../components/Card";
import _ from "lodash";

const SearchPage = () => {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [page, setPage] = useState(1);
	const navigate = useNavigate();

	const query = location?.search?.slice(3);

	const fetchData = async () => {
		try {
			const response = await axios.get("/search/multi", {
				params: {
					query: query,
					page: page,
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

	useEffect(() => {
		if (query) {
			setPage(1);
			setData([]);
			fetchData();
		}
	}, [location?.search]);

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPage((prev) => prev + 1);
		}
	};

	useEffect(() => {
		if (query) {
			fetchData();
		}
	}, [page]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);

	const debouncedNavigate = useCallback(
		_.debounce((value) => {
			navigate(`/search?q=${value}`);
		}, 750),
		[navigate]
	);

	const handleInputChange = (e) => {
		debouncedNavigate(e.target.value);
	};

	return (
		<div className="py-16 h-screen">
			<div className="lg:hidden my-2 mx-2 sticky top-[65px] z-30">
				<input
					type="text"
					placeholder="Search here..."
					onChange={handleInputChange}
					className="px-4 py-2 w-full text-lg bg-neutral-100 text-neutral-900 rounded-full outline-none border-none"
				/>
			</div>

			<div className="container mx-auto">
				<h3 className="capitalize text-lg lg:text-3xl font-semibold my-3 px-3">
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
