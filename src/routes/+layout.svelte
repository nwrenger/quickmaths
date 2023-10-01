<script>
	import "../bootstrap/app.scss";
	import "../bootstrap/main";
	import Navbar from "../components/Navbar.svelte";
</script>

<!--  General App Layout + Important Imports  -->
<div class="app">
	<Navbar />
	<main>
		<slot />
	</main>
</div>
