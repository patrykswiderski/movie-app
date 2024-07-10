import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { IoPlayCircleSharp } from "react-icons/io5";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import VideoPlay from "./VideoPlay";

const BannerHome = () => {
	const params = useParams();
	const bannerData = useSelector((state) => state.movieflixData.bannerData);
	const imageURL = useSelector((state) => state.movieflixData.imageURL);
	const [currentImage, setCurrentImage] = useState(0);
	const [playVideo, setPlayVideo] = useState(false);
	const [playVideoData, setPlayVideoData] = useState({});

	const handleNext = useCallback(() => {
		if (currentImage < bannerData.length - 1) {
			setCurrentImage((prev) => prev + 1);
		} else {
			setCurrentImage(0);
		}
	}, [currentImage, bannerData.length]);

	const handlePrev = () => {
		if (currentImage > 0) {
			setCurrentImage((prev) => prev - 1);
		}
	};

	const handlePlayVideo = (data) => {
		setPlayVideoData(data);
		setPlayVideo(true);
	};

	useEffect(() => {
		let interval;
		if (!playVideo) {
			interval = setInterval(() => {
				handleNext();
			}, 4000);
		}

		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [playVideo, handleNext]);

	return (
		<section className="w-full h-full" aria-label="Banner section">
			<div className="flex min-h-full max-h-[95vh] overflow-hidden">
				{bannerData.map((data, index) => (
					<div
						key={data.id + "bannerHome" + index}
						className="min-w-full min-h-[450px] lg:min-h-full overflow-hidden relative group transition-all"
						style={{ transform: `translateX(${currentImage * -100}%)` }}
					>
						<div className="w-full h-full">
							<img
								src={imageURL + data.backdrop_path}
								alt={`${data?.title ?? data?.name} banner`}
								className="h-full w-full object-cover"
							/>
						</div>

						{/*** button next and prev image***/}
						<div className="absolute top-0 w-full h-full hidden group-hover:lg:flex items-center justify-between px-4">
							<button
								className="bg-white/70 text-black z-10 p-1 rounded-full text-xl"
								onClick={handlePrev}
								aria-label="Previous slide"
							>
								<FaAngleLeft />
							</button>
							<button
								className="bg-white/70 text-black z-10 p-1 rounded-full text-xl"
								onClick={handleNext}
								aria-label="Next slide"
							>
								<FaAngleRight />
							</button>
						</div>

						<div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

						<div className="container mx-auto">
							<div className="w-full absolute bottom-0 max-w-md px-3">
								<Link
									to={"/" + data.media_type + "/" + data.id}
									className="font-bold text-2xl lg:text-4xl text-white drop-shadow-3xl"
								>
									{data?.title ?? data?.name}
								</Link>
								<p className="text-ellipsis line-clamp-3 my-2">
									{data?.overview}
								</p>
								<div className="flex items-center gap-4">
									<p>Rating: {Number(data.vote_average).toFixed(1)}</p>
									<span>|</span>
									<p>View: {Number(data.popularity).toFixed(0)}</p>
								</div>
								<button
									onClick={() => handlePlayVideo(data)}
									className="flex items-center gap-2 bg-white hover:bg-gradient-to-l from-red-700 to-orange-500 px-3 py-2 text-black font-bold rounded mt-4 shadow-md transition-all hover:scale-105"
									aria-label={`Play ${data?.title ?? data?.name} trailer`}
								>
									Play Now <IoPlayCircleSharp className="text-2xl" />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>

			{playVideo && (
				<VideoPlay
					data={playVideoData}
					close={() => setPlayVideo(false)}
					media_type={playVideoData.media_type}
				/>
			)}
		</section>
	);
};

export default BannerHome;
