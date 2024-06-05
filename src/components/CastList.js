import React, { useState } from "react";

const CastList = ({ castData }) => {
	const [showAll, setShowAll] = useState(false);

	const handleToggleShowAll = () => {
		setShowAll(!showAll);
	};

	const visibleCast = showAll ? castData?.cast : castData?.cast.slice(0, 3);

	return (
		<div className="w-[80vw] lg:w-[50vw] h-full">
			<div className="flex gap-2 pb-2">
				<p>Stars:</p>
				<div className="flex flex-wrap gap-2 h-full">
					{visibleCast?.map((castMember, index, array) => (
						<React.Fragment key={castMember.id + index}>
							<p className="">{castMember.name}</p>
							{index < array.length - 1 && <span>{"\u00B7"}</span>}
						</React.Fragment>
					))}
					{castData?.cast.length > 3 && !showAll && (
						<button
							onClick={handleToggleShowAll}
							className="ml-2  hover:text-white"
						>
							...
						</button>
					)}
					{showAll && (
						<button
							onClick={handleToggleShowAll}
							className="ml-2 hover:text-white border text-sm border-neutral-500 hover:border-white rounded-full px-3"
						>
							... show less
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default CastList;
