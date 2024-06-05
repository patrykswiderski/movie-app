import React from "react";

const JobFilter = ({ jobName, castData, label }) => {
	return (
		<div className="flex gap-2">
			<p>{label}:</p>
			{castData?.crew
				.filter((crewMember) => crewMember.job === jobName)
				.map((crewMember, index, array) => {
					return (
						<React.Fragment key={crewMember.id + index}>
							<p className="">{crewMember.name}</p>
							{index < array.length - 1 && <span> {"\u00B7"} </span>}
						</React.Fragment>
					);
				})}
		</div>
	);
};

export default JobFilter;
