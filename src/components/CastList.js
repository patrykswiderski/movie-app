import React, { useState } from "react";
import { useSelector } from "react-redux";

const CastList = ({ castData }) => {
	const [showAll, setShowAll] = useState(false);
	const [hoveredCastId, setHoveredCastId] = useState(null);
	const imageURL = useSelector((state) => state.movieflixData.imageURL);

	const handleToggleShowAll = () => {
		setShowAll(!showAll);
	};

	const handleMouseEnter = (castId) => {
		setHoveredCastId(castId);
	};

	const handleMouseLeave = () => {
		setHoveredCastId(null);
	};

	const visibleCast = showAll ? castData?.cast : castData?.cast.slice(0, 3);

	return (
		<div className="w-[80vw] lg:w-[50vw] h-max">
			<div className="flex gap-2 pb-2">
				<p className="font-bold">Stars:</p>
				<div className="flex flex-wrap gap-2 h-full">
					{visibleCast?.map((castMember, index, array) => (
						<React.Fragment key={castMember.id + index}>
							<div className="relative">
								<p
									className="text-neutral-400 cursor-pointer hover:text-white"
									onMouseEnter={() => handleMouseEnter(castMember.id)}
									onMouseLeave={handleMouseLeave}
									aria-describedby={
										hoveredCastId === castMember.id
											? `tooltip-${castMember.id}`
											: undefined
									}
								>
									{castMember.name}
								</p>
								{hoveredCastId === castMember.id && (
									<div
										className="absolute left-1/2 -translate-x-1/2 -top-56 w-52 h-52 rounded-full z-20 shadow-2xl shadow-neutral-500/50"
										role="tooltip"
										id={`tooltip-${castMember.id}`}
									>
										{castMember.profile_path ? (
											<img
												src={imageURL + castMember.profile_path}
												alt={`${castMember.name}'s profile`}
												className="h-full w-full object-cover rounded-full"
											/>
										) : (
											<div className="h-full w-full bg-neutral-900 rounded-full p-2 flex items-center justify-center text-white">
												Sorry, no image
											</div>
										)}
									</div>
								)}
							</div>
							{index < array.length - 1 && <span>{"\u00B7"}</span>}
						</React.Fragment>
					))}
					{castData?.cast.length > 3 && !showAll && (
						<button
							onClick={handleToggleShowAll}
							className="ml-2 hover:text-white text-sm"
							aria-label="Show more cast members"
						>
							. . .
						</button>
					)}
					{showAll && (
						<button
							onClick={handleToggleShowAll}
							className="ml-2 hover:text-white text-sm "
							aria-label="Show less cast members"
						>
							. . . show less
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CastList;
