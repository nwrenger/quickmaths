<script lang="ts">
	import { page } from "$app/stores";

	let routes: string[] = [];
	$: routes = $page.url.pathname.split("/").filter((i) => i != "");
	$: routes.unshift("");
</script>

<ol class="breadcrumb m-0">
	{#each routes as route, i}
		<li
			class="breadcrumb-item {$page.url.pathname ==
			(routes.slice(0, i + 1).join('/') ? routes.slice(0, i + 1).join('/') : '/')
				? 'active'
				: ''}"
		>
			{#if !($page.url.pathname == (routes.slice(0, i + 1).join("/") ? routes
							.slice(0, i + 1)
							.join("/") : "/"))}
				<a href={routes.slice(0, i + 1).join("/") ? routes.slice(0, i + 1).join("/") : "/"}
					>{route.charAt(0).toLocaleUpperCase() + route.slice(1)
						? route.charAt(0).toLocaleUpperCase() + route.slice(1)
						: "Home"}</a
				>
			{:else}
				{route.charAt(0).toLocaleUpperCase() + route.slice(1)
					? route.charAt(0).toLocaleUpperCase() + route.slice(1)
					: "Home"}
			{/if}
		</li>
	{/each}
</ol>
