import React from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import Card from "../components/Card";

const Home = () => {
	const trendingData = useSelector((state) => state.movieflixData.bannerData);

	return (
		<div>
			<BannerHome />
			<div className="container mx-auto px-3 my-10">
				<h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
					Trending Show
				</h2>
				<div
					className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-8
        "
				>
					{trendingData.map((data, index) => {
						return (
							<Card
								key={data.id}
								data={data}
								index={index + 1}
								trending={true}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Home;
