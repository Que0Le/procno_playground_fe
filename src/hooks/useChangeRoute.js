import { useHistory } from "react-router-dom";

/**
 * Custom React hook that can be used to change the current route.
 * @example
 * // redirects the page to the "/home" path
 * const changeRoute = useChangeRoute();
 * changeRoute("/home");
 * @returns {(function(*=): void)|*}
 */
export default function useChangeRoute() {
	const history = useHistory();

	return (path) => {
		history.push(path);
	};
}
