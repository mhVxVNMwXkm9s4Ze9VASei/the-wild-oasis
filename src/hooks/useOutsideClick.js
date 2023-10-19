import { useEffect, useRef } from "react";

export function useOutsideClick(handler, listenDuringCapturing = true) {
	const ref = useRef();

	useEffect(() => {
		function handleClick(event) {
			if (ref.current && !ref.current.contains(event.target)) handler();
		}

		document.addEventListener("click", handleClick, listenDuringCapturing);

		return () =>
			document.removeEventListener("click", handleClick, listenDuringCapturing);
	}, [handler, listenDuringCapturing]);

	return ref;
}
