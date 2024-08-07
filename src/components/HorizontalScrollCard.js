import React, { useRef } from "react";
import Card from "./Card";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const HorizontalScrollCard = ({ data = [], heading, trending, media_type }) => {
	const containerRef = useRef();

	const handleNext = () => {
		containerRef.current.scrollLeft += 600;
	};

	const handlePrev = () => {
		containerRef.current.scrollLeft -= 600;
	};

	return (
		<div className="container mx-auto px-3 my-10 group">
			<h2 className="text-xl lg:text-2xl font-bold mb-2 text-white">
				{heading}
			</h2>
			<div className="relative">
				<div
					ref={containerRef}
					className="grid grid-cols-[repeat(auto-fit,230px)] grid-flow-col gap-6 overflow-hidden overflow-x-scroll relative z-10 scroll-smooth transition-all scrollbar-none p-2"
					aria-label={heading}
					role="region"
				>
					{data.map((data, index) => {
						return (
							<Card
								key={data.id + "heading" + index}
								data={data}
								index={index + 1}
								trending={trending}
								media_type={media_type}
							/>
						);
					})}
				</div>

				<div className="absolute top-0 w-full h-full hidden group-hover:lg:flex items-center justify-between px-2">
					<button className="bg-white/70 p-1 text-black z-10 -ml-5 rounded-full text-lg">
						<FaAngleLeft onClick={handlePrev} aria-label="Scroll left" />
					</button>
					<button className="bg-white/70 p-1 text-black z-10 -mr-5 rounded-full text-lg">
						<FaAngleRight onClick={handleNext} aria-label="Scroll right" />
					</button>
				</div>
			</div>
		</div>
	);
};

export default HorizontalScrollCard;
