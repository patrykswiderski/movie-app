import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";

const ExplorePage = () => {
	const params = useParams();
	const [pageNo, setPageNo] = useState(1);
	const [data, setData] = useState([]);
	const [totalPage, setTotalPage] = useState(0);

	const fetchData = async () => {
		try {
			const response = await axios.get(`/discover/${params.explore}`, {
				params: {
					page: pageNo,
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
			setTotalPage(response?.data?.total_pages);
		} catch (error) {
			console.log("error", error);
		}
	};

	const handleScroll = () => {
		if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
			setPageNo((prev) => prev + 1);
		}
	};

	useEffect(() => {
		fetchData();
	}, [pageNo, params.explore]);

	useEffect(() => {
		setPageNo(1);
		setData([]);
		fetchData();
	}, [params.explore]);

	useEffect(() => {
		window.addEventListener("scroll", handleScroll);
	}, []);

	return (
		<div className="py-16">
			<div className="container mx-auto">
				<h3 className="capitalize text-lg lg:text-3xl font-semibold px-3 my-3">
					Popular {params.explore}
					{params.explore === "tv" ? " Shows" : "s"}
				</h3>

				<div className="grid grid-cols-[repeat(auto-fit,230px)] gap-5 justify-center lg:justify-start">
					{data.map((exploreData, index) => {
						return (
							<Card
								data={exploreData}
								key={exploreData.id + "exploreSection" + index}
								media_type={params.explore}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ExplorePage;
