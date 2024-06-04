import BannerHome from "../components/BannerHome";
import { useSelector } from "react-redux";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import useFetch from "../hooks/useFetch";

const Home = () => {
	const trendingData = useSelector((state) => state.movieflixData.bannerData);

	const { data: nowPlayingData } = useFetch("/movie/now_playing");
	const { data: topRatedData } = useFetch("/movie/top_rated");
	const { data: popularTvData } = useFetch("/tv/popular");
	const { data: onTheAirData } = useFetch("/tv/on_the_air");

	return (
		<div>
			<BannerHome />
			<HorizontalScrollCard
				data={trendingData}
				heading="Trending Now"
				trending={true}
			/>
			<HorizontalScrollCard data={nowPlayingData} heading="Now Playing" />
			<HorizontalScrollCard data={topRatedData} heading="Top Rated Movies" />
			<HorizontalScrollCard data={popularTvData} heading="Popular TV Shows" />
			<HorizontalScrollCard data={onTheAirData} heading="On The Air TV Shows" />
		</div>
	);
};

export default Home;
