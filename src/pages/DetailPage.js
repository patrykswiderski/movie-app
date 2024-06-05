import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import moment from "moment";
import Divider from "../components/Divider";
import JobFilter from "../components/JobFilter";
import CastList from "../components/CastList";
import HorizontalScrollCard from "../components/HorizontalScrollCard";
import VideoPlay from "../components/VideoPlay";

const DetailPage = () => {
	const params = useParams();
	const imageURL = useSelector((state) => state?.movieflixData?.imageURL);
	const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
	const { data: castData } = useFetchDetails(
		`/${params?.explore}/${params?.id}/credits`
	);
	const { data: similarData } = useFetchDetails(
		`/${params?.explore}/${params?.id}/similar`
	);
	const { data: recommendedData } = useFetchDetails(
		`/${params?.explore}/${params?.id}/recommendations`
	);

	const [playVideo, setPlayVideo] = useState(false);
	const [playVideoId, setPlayVideoId] = useState("");

	const duration = Number(data?.runtime / 60)
		.toFixed(1)
		.split(".");

	console.log("data", data);
	console.log("cast", castData);

	const handlePlayVideo = (data) => {
		setPlayVideoId(data?.id);
		setPlayVideo(true);
	};

	return (
		<div className="h-full">
			<div className="w-full h-[300px] relative hidden lg:block">
				<div className="w-full h-full">
					{data?.backdrop_path !== null ? (
						<img
							src={imageURL + data?.backdrop_path}
							alt="movie backdrop image"
							className="h-full w-full object-cover"
						/>
					) : null}
				</div>

				<div className="absolute bg-gradient-to-t from-neutral-900/90 to-transparent w-full h-full top-0"></div>
			</div>

			<div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
				<div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit min-w-60">
					{data?.poster_path !== null ? (
						<img
							src={imageURL + data?.poster_path}
							alt="movie poster"
							className="h-96 w-72 object-cover rounded"
						/>
					) : (
						<div className="h-96 w-72 bg-black rounded-lg flex items-center justify-center text-white">
							Sorry, no image
						</div>
					)}
					<button
						onClick={() => handlePlayVideo(data)}
						className="mt-3 w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-700 to-orange-500 hover:scale-105 transition-all"
					>
						Play Now
					</button>
				</div>

				<div>
					<h2 className="text-xl font-bold text-white">
						{data?.title || data?.name}
					</h2>
					<p className="text-neutral-300">{data?.tagline}</p>
					<div className="text-neutral-400 flex items-center gap-4">
						<div className="flex items-center gap-1">
							<IoStar className="text-yellow-500 text-lg mb-1" />
							<p>{Number(data?.vote_average).toFixed(1)}</p>
						</div>
						<span>{"\u00B7"}</span>
						<p>Voters: {Number(data?.vote_count).toFixed(0)}</p>
						<span>{"\u00B7"}</span>
						{data?.runtime ? (
							<p>
								Duration: {duration[0]}h {duration[1]}m
							</p>
						) : null}
					</div>

					<div className="text-neutral-400 text-sm pt-2 flex flex-wrap items-center gap-3">
						{data?.genres?.length > 0
							? data.genres.map((genre, index) => {
									return (
										<div
											className="bg-transparent px-2 py-1 text-sm rounded-full border border-neutral-300 whitespace-nowrap"
											key={genre.id + index}
										>
											{genre.name !== "" || genre.name !== ";"
												? genre.name
												: null}{" "}
										</div>
									);
							  })
							: null}
					</div>
					<p className="text-neutral-300 py-2 lg:w-[50vw]">{data?.overview}</p>

					<Divider />

					<div className="flex items-center font-bold gap-2">
						<p>
							Status:
							<span className="text-neutral-400 font-normal">
								{"\u0020" + data?.status}
							</span>
						</p>
						{data?.status === "Released" ? (
							<span className="text-neutral-400 font-normal">{"\u00B7"}</span>
						) : null}
						{data?.status === "Released" ? (
							<p>
								Date:
								<span className="text-neutral-400 font-normal">
									{"\u0020" + moment(data?.release_date).format("MMMM Do YYYY")}
								</span>
							</p>
						) : null}
					</div>

					<Divider />

					<JobFilter jobName="Director" castData={castData} label="Director" />
					<Divider />
					<JobFilter
						jobName={"Writer"}
						jobNameSecond={"Screenplay"}
						castData={castData}
						label="Writers"
					/>
					<Divider />
					<CastList castData={castData} />
				</div>
			</div>
			<HorizontalScrollCard
				data={similarData?.results}
				heading={
					params.explore === "tv"
						? `Similar ${params.explore.toUpperCase()} shows`
						: `Similar ${params.explore}s`
				}
				media_type={params.explore}
			/>
			<HorizontalScrollCard
				data={recommendedData?.results}
				heading={
					params.explore === "tv"
						? `Recommended ${params.explore.toUpperCase()} shows`
						: `Recommended ${params.explore}s`
				}
				media_type={params.explore}
			/>
			{playVideo && (
				<VideoPlay videoId={playVideoId} close={() => setPlayVideo(false)} />
			)}
		</div>
	);
};

export default DetailPage;
