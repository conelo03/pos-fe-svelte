<script lang="ts">
  import { user } from '$lib/stores/auth.js'
</script>

<svelte:head>
	<title>Products - Admin Template</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">Product Management</h1>
		<button class="btn btn-primary">
			<i class="fas fa-plus mr-2"></i>
			Add Product
		</button>
	</div>
	
	<!-- Content area untuk product management -->
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<p class="text-base-content/60">Product management content goes here...</p>
		</div>
	</div>
</div>
