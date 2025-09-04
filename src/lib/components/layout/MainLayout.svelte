<script lang="ts">
	import { onMount } from 'svelte';
	import { themeController } from '$lib/stores/theme.js';
	import Navbar from './Navbar.svelte';
	import Sidebar from './Sidebar.svelte';

  let { children } = $props()
	
	onMount(() => {
		themeController.init();
	});
</script>

<div class="drawer lg:drawer-open">
	<input id="drawer-toggle" type="checkbox" class="drawer-toggle" />
	
	<!-- Main Content Area -->
	<div class="drawer-content bg-base-200">
		<Navbar />
		
		<!-- Page Content -->
		<main class="p-6">
			{@render children()}
		</main>
	</div>

	<!-- Sidebar -->
	<div class="drawer-side">
		<label for="drawer-toggle" aria-label="close sidebar" class="drawer-overlay"></label>
		<Sidebar />
	</div>
</div>
