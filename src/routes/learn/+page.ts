export async function load({ url }) {
	return {
		difficulty: parseInt(url.searchParams.get('dif') || '2') || 2,
		type: url.searchParams.get('type') || 'add'
	};
}
