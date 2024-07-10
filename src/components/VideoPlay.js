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
		<section
			className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center"
			aria-modal="true"
			role="dialog"
			aria-label="Video player"
		>
			<div className="bg-black w-full max-h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative">
				<button
					onClick={close}
					className="absolute -top-1 -right-1 m-2 text-2xl "
					aria-label="Close video player"
				>
					<IoCloseCircleOutline />
				</button>

				{!isReady ? (
					<div className="flex justify-center items-center h-full">
						<span className="text-white" aria-live="polite">
							Loading...
						</span>
					</div>
				) : (
					videoData?.results?.[0]?.key && (
						<iframe
							src={`https://www.youtube.com/embed/${videoData.results[0].key}`}
							className="w-full h-full"
							title="Video player"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						/>
					)
				)}
			</div>
		</section>
	);
};

export default VideoPlay;
