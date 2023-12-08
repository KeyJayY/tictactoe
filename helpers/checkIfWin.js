export default (board) => {
	const winningSets = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
	return winningSets.find((elem) => {
		if (
			board[elem[0]] != 0 &&
			elem.every((value, index, array) => {
				return board[value] === board[array[0]];
			})
		)
			return true;
	});
};
