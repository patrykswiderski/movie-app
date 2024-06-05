import React, { useState } from "react";
import { useSelector } from "react-redux";

const JobFilter = ({ jobName, jobNameSecond = null, castData, label }) => {
	const [hoveredCrewId, setHoveredCrewId] = useState(null);
	const imageURL = useSelector((state) => state.movieflixData.imageURL);

	const handleMouseEnter = (crewId) => {
		setHoveredCrewId(crewId);
	};

	const handleMouseLeave = () => {
		setHoveredCrewId(null);
	};

	return (
		<div className="flex gap-2">
			<p className="font-bold">{label}:</p>
			<div className="flex flex-wrap gap-2 h-full">
				{castData?.crew
					.filter(
						(crewMember) =>
							crewMember.job === jobName || crewMember.job === jobNameSecond
					)
					.map((crewMember, index, array) => (
						<React.Fragment key={crewMember.id + index}>
							<div className="relative">
								<p
									className="text-neutral-400 cursor-pointer"
									onMouseEnter={() => handleMouseEnter(crewMember.id)}
									onMouseLeave={handleMouseLeave}
								>
									{crewMember.name}
								</p>
								{hoveredCrewId === crewMember.id && (
									<div className="absolute left-1/2 -translate-x-1/2 -top-56 w-52 h-52 rounded-full z-20 shadow-2xl shadow-neutral-500/50 ">
										<div className="relative w-full h-full ">
											{crewMember.profile_path ? (
												<img
													src={imageURL + crewMember.profile_path}
													alt="crew member"
													className="h-full w-full object-cover rounded-full"
												/>
											) : (
												<div className="h-full w-full bg-neutral-900 rounded-full p-2 flex items-center justify-center text-white">
													Sorry, no image
												</div>
											)}
											<div className="absolute inset-0 bg-gradient-to-center from-black via-transparent to-black opacity-60"></div>
										</div>
									</div>
								)}
							</div>
							{index < array.length - 1 && <span>{"\u00B7"}</span>}
						</React.Fragment>
					))}
			</div>
		</div>
	);
};

export default JobFilter;
