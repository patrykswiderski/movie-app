import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index, media_type }) => {
	const imageURL = useSelector((state) => state.movieflixData.imageURL);

	const mediaType = data.media_type ?? media_type;
	return (
		<Link
			to={"/" + mediaType + "/" + data.id}
			className="w-full min-w-[230px] max-w-[230px] block rounded h-80 overflow-hidden relative hover:scale-105 transition-all"
		>
			{data?.poster_path ? (
				<img
					src={imageURL + data?.poster_path}
					alt="poster"
					className="object-cover"
				/>
			) : (
				<div className="bg-neutral-800 w-full h-full flex justify-center items-center">
					No image found
				</div>
			)}
			<div className="absolute top-3">
				{" "}
				{trending && (
					<div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
						#{index} Trending
					</div>
				)}
			</div>
			<div className="absolute bottom-0 h-16 backdrop-blur-3xl bg-black/60 p-2 w-[102%]">
				<h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
					{data?.title || data?.name}
				</h2>
				<div className="text-sm text-neutral-400 flex justify-between items-center">
					<p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
					<div className="flex gap-1 items-center bg-black text-neutral-200 px-2 py-0.5 text-sm rounded-full">
						<IoStar className="mb-0.5" />
						<p className="font-light">{data?.vote_average?.toFixed(1)}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
