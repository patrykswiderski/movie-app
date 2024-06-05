import React from "react";
import { useParams } from "react-router-dom";
import useFetchDetails from "../hooks/useFetchDetail";
import { useSelector } from "react-redux";
import { IoStar } from "react-icons/io5";
import moment from "moment";
import Divider from "../components/Divider";
import JobFilter from "../components/JobFilter";
import CastList from "../components/CastList";

const DetailPage = () => {
	const params = useParams();
	const imageURL = useSelector((state) => state.movieflixData.imageURL);
	const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
	const { data: castData } = useFetchDetails(
		`/${params?.explore}/${params?.id}/credits`
	);

	const duration = Number(data?.runtime / 60)
		.toFixed(1)
		.split(".");

	console.log("data", data);
	console.log("cast", castData);

	return (
		<div className="h-min-screen h-max-full">
			<div className="w-full h-[300px] relative hidden lg:block">
				<div className="w-full h-full">
					<img
						src={imageURL + data?.backdrop_path}
						alt="movie backdrop image"
						className="h-full w-full object-cover"
					/>
				</div>

				<div className="absolute bg-gradient-to-t from-neutral-900/90 to-transparent w-full h-full top-0"></div>
			</div>

			<div className="container mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-5 lg:gap-10 ">
				<div className=" relative mx-auto lg:-mt-28 lg:mx-0 w-fit">
					<img
						src={imageURL + data?.poster_path}
						alt="movie poster"
						className="h-96 w-72 object-cover rounded"
					/>
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

					<div className="text-neutral-400 text-sm pt-2 flex items-center gap-3">
						{data?.genres.map((genre, index) => {
							return (
								<div
									className="bg-transparent px-2 py-1 text-sm rounded-full border border-neutral-400"
									key={genre + index}
								>
									{genre.name !== "" || genre.name !== ";" ? genre.name : null}
								</div>
							);
						})}
					</div>
					<p className="text-neutral-300 py-2 lg:w-[50vw]">{data?.overview}</p>

					<Divider />

					<div className="flex items-center text-neutral-400 gap-2">
						<p>Status: {data?.status}</p>
						{data?.status === "Released" ? <span>{"\u00B7"}</span> : null}
						{data?.status === "Released" ? (
							<p>
								Release date:{" "}
								{moment(data?.release_date).format("MMMM Do YYYY")}
							</p>
						) : null}
					</div>

					<JobFilter jobName="Director" castData={castData} label="Director" />

					<JobFilter jobName="Writer" castData={castData} label="Writers" />

					<CastList castData={castData} />
				</div>
			</div>
		</div>
	);
};

export default DetailPage;
