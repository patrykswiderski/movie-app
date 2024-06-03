import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { IoStar } from "react-icons/io5";
import { Link } from "react-router-dom";

const Card = ({ data, trending, index }) => {
	const imageURL = useSelector((state) => state.movieflixData.imageURL);

	return (
		<Link
			to={"/" + data.media_type + "/" + data.id}
			className="w-full min-w-[230px] max-w-[230px] rounded h-80 overflow-hidden relative"
		>
			<img
				src={imageURL + data?.poster_path}
				alt="poster"
				className="object-cover"
			/>
			<div className="absolute top-3">
				{" "}
				{trending && (
					<div className="py-1 px-4 backdrop-blur-3xl rounded-r-full bg-black/60 overflow-hidden">
						#{index} Trending
					</div>
				)}
			</div>
			<div className="absolute bottom-0 h-16 backdrop-blur-3xl w-full bg-black/60 p-2">
				<h2 className="text-ellipsis line-clamp-1 text-lg font-semibold">
					{data?.title || data?.name}
				</h2>
				<div className="text-sm text-neutral-400 flex justify-between items-center">
					<p>{moment(data?.release_date).format("MMMM Do YYYY")}</p>
					<div className="flex gap-1 items-baseline bg-black text-neutral-200 px-1 text-sm rounded-full">
						<IoStar />
						<p>{data.vote_average.toFixed(1)}</p>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default Card;
