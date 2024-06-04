import React, { useEffect, useState } from "react";
import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import axios from "axios";
import useFetch from "../hooks/useFetch";

const Home = () => {
	const trendingData = useSelector((state) => state.movieflixData.bannerData);

	const { data: nowPlayingData } = useFetch("/movie/now_playing");
	const { data: topRatedData } = useFetch("/movie/top_rated");

	return (
		<div>
			<BannerHome />
			<HorizontalScrollCard
				data={trendingData}
				heading="Trending Now"
				trending={true}
			/>
			<HorizontalScrollCard data={nowPlayingData} heading="Now Playing" />
			<HorizontalScrollCard data={topRatedData} heading="Top Rated" />
		</div>
	);
};

export default Home;
