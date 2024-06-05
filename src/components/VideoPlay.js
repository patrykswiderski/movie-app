import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";

const VideoPlay = (data, close) => {
	return (
		<section className="fixed bg-neutral-700 top-0 bottom-0 right-0 left-0 z-40 bg-opacity-50 flex justify-center items-center">
			<div className="bg-black w-ful h-[80vh] max-w-screen-lg aspect-video rounded overflow-hidden relative">
				<button
					onClick={close}
					className="absolute -top-1 -right-1 m-2 text-2xl "
				>
					<IoCloseCircleOutline />
				</button>
			</div>
		</section>
	);
};

export default VideoPlay;
