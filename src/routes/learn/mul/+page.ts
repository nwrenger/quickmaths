export async function load({ url }) {
	return {
		difficulty: parseInt(url.searchParams.get('dif') || '') || 0
	};
}
