

/**
 * Create css properties to limit text in a container to x lines.
 * @param numberOfLines Number of lines to limit text to
 * @returns css properties
 */
export function limitXLines(numberOfLines) {
	return {
		display: "-webkit-box",
		overflow: "hidden",
		WebkitBoxOrient: "vertical",
		WebkitLineClamp: numberOfLines,
	}
}