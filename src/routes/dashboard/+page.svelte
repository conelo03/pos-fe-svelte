<script lang="ts">
  import { user } from '$lib/stores/auth.js'
</script>

<!-- <div class="p-6">
  <h1 class="text-3xl font-bold mb-4">Welcome, {$user?.name}</h1>
  <p class="text-gray-600">Dashboard dummy</p>
</div> -->
<svelte:head>
	<title>Dashboard - Admin Template</title>
</svelte:head>

<div class="space-y-6">
	<!-- Welcome Header -->
	<div class="text-center py-12">
		<div class="w-24 h-24 bg-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
			<i class="fas fa-rocket text-3xl text-primary"></i>
		</div>
		<h1 class="text-3xl font-bold mb-4">Welcome, {$user?.name}</h1>
		<p class="text-base-content/60 max-w-md mx-auto mb-6">
			Your SvelteKit admin template with DaisyUI v5 is ready! The main content area is empty and waiting for your components.
		</p>
		<!-- <button class="btn btn-primary">
			<i class="fas fa-plus mr-2"></i>
			Get Started
		</button> -->
	</div>
	
	<!-- Stats Preview -->
	<!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
		<div class="stat bg-base-100 shadow rounded-lg">
			<div class="stat-figure text-primary">
				<i class="fas fa-users text-2xl"></i>
			</div>
			<div class="stat-title">Total Users</div>
			<div class="stat-value text-primary">1,234</div>
			<div class="stat-desc">↗︎ 5% increase</div>
		</div>
		
		<div class="stat bg-base-100 shadow rounded-lg">
			<div class="stat-figure text-secondary">
				<i class="fas fa-shopping-cart text-2xl"></i>
			</div>
			<div class="stat-title">Orders</div>
			<div class="stat-value text-secondary">567</div>
			<div class="stat-desc">↗︎ 12% increase</div>
		</div>
		
		<div class="stat bg-base-100 shadow rounded-lg">
			<div class="stat-figure text-accent">
				<i class="fas fa-dollar-sign text-2xl"></i>
			</div>
			<div class="stat-title">Revenue</div>
			<div class="stat-value text-accent">$12,345</div>
			<div class="stat-desc">↗︎ 8% increase</div>
		</div>
		
		<div class="stat bg-base-100 shadow rounded-lg">
			<div class="stat-figure text-info">
				<i class="fas fa-chart-line text-2xl"></i>
			</div>
			<div class="stat-title">Growth</div>
			<div class="stat-value text-info">18%</div>
			<div class="stat-desc">↗︎ 3% increase</div>
		</div>
	</div> -->
</div>
