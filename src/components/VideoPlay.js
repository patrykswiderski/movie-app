import React, { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import useFetchDetails from "../hooks/useFetchDetail";

const VideoPlay = ({ data, close, media_type }) => {
	const mediaType = data?.media_type || media_type;

	const { data: videoData } = useFetchDetails(
		`/${mediaType}/${data?.id}/videos`
	);
	const [isReady, setIsReady] = useState(false);

	useEffect(() => {
		if (videoData) {
			const timer = setTimeout(() => {
				setIsReady(true);
			}, 500);

			return () => clearTimeout(timer);
		}
	}, [videoData]);

	return (
		<section className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
			<div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative">
				<button
					onClick={close}
					className="absolute -top-1 -right-1 m-2 text-2xl "
				>
					<IoCloseCircleOutline />
				</button>

				{!isReady ? (
					<div className="flex justify-center items-center h-full">
						<span className="text-white">Loading...</span>
					</div>
				) : (
					videoData?.results?.[0]?.key && (
						<iframe
							src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
							className="w-full h-full"
						/>
					)
				)}
			</div>
		</section>
	);
};

export default VideoPlay;
