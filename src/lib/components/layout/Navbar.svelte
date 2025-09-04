<script lang="ts">
	import { themeController, theme } from '$lib/stores/theme.js';
	import { token, user } from '$lib/stores/auth.js';
  import { goto } from '$app/navigation';
	
	let drawerToggle: any;
	
	function toggleDrawer() {
		if (drawerToggle) {
			drawerToggle.checked = !drawerToggle.checked;
		}
	}

	const handleLogout = () => {
		user.set(null)
		token.set(null)
		goto('/login')
	}
</script>

<div class="navbar bg-base-100 shadow-sm">
	<div class="flex-none lg:hidden">
		<label for="drawer-toggle" class="btn btn-square btn-ghost">
			<i class="fas fa-bars text-xl"></i>
		</label>
	</div>
	
	<div class="flex-1">
		<!-- <h1 class="text-xl font-semibold">Dashboard</h1> -->
	</div>
	
	<div class="flex-none gap-2">
		
		<!-- Theme Toggle -->
		<button on:click={themeController.toggle} class="btn btn-ghost btn-circle">
			{#if $theme === 'dark'}
				<i class="fas fa-moon text-xl"></i>
			{:else}
				<i class="fas fa-sun text-xl"></i>
			{/if}
		</button>
		
		<!-- Notifications -->
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<div class="indicator">
					<i class="fas fa-bell text-xl"></i>
					<span class="badge badge-xs badge-primary indicator-item">2</span>
				</div>
			</div>
			<div class="dropdown-content menu bg-base-100 rounded-box z-[1] w-80 p-2 shadow-xl">
				<div class="p-3 border-b">
					<h3 class="font-semibold">Notifications</h3>
				</div>
				<div class="p-2 space-y-2 max-h-64 overflow-y-auto">
					<div class="flex items-start gap-3 p-2 hover:bg-base-200 rounded">
						<div class="w-2 h-2 bg-primary rounded-full mt-2"></div>
						<div class="flex-1">
							<p class="text-sm font-medium">New user registered</p>
							<p class="text-xs text-base-content/60">2 minutes ago</p>
						</div>
					</div>
					<div class="flex items-start gap-3 p-2 hover:bg-base-200 rounded">
						<div class="w-2 h-2 bg-warning rounded-full mt-2"></div>
						<div class="flex-1">
							<p class="text-sm font-medium">System update available</p>
							<p class="text-xs text-base-content/60">1 hour ago</p>
						</div>
					</div>
				</div>
				<div class="border-t p-2">
					<a href="/" class="btn btn-sm btn-ghost w-full">View All</a>
				</div>
			</div>
		</div>
		
		<!-- Profile Menu -->
		<div class="dropdown dropdown-end">
			<div tabindex="0" role="button" class="btn btn-ghost btn-circle">
				<div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
					<i class="fas fa-user text-primary-content"></i>
				</div>
			</div>
			<ul class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-xl">
				<li class="menu-title">
					<span>{$user?.name}</span>
				</li>
				<li><a href="/"><i class="fas fa-user mr-2"></i>Profile</a></li>
				<li><a href="/"><i class="fas fa-cog mr-2"></i>Settings</a></li>
				<li><a href="/"><i class="fas fa-question-circle mr-2"></i>Help</a></li>
				<li class="border-t mt-2 pt-2">
					<button class="text-error w-full text-left" on:click={handleLogout}>
						<i class="fas fa-sign-out-alt mr-2"></i>Logout
					</button>
				</li>
			</ul>
		</div>
	</div>
</div>