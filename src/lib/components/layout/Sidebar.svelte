<script lang="ts">
	import { page } from '$app/stores';
  import { user } from '$lib/stores/auth.js';
	
	const menuItems = [
		{ href: '/dashboard', icon: 'fas fa-home', label: 'Dashboard' },
		{ href: '/users', icon: 'fas fa-users', label: 'Users', badge: '12' },
		{ href: '/products', icon: 'fas fa-box', label: 'Products' },
		{ href: '/orders', icon: 'fas fa-shopping-cart', label: 'Orders', badge: '3' },
		{ href: '/analytics', icon: 'fas fa-chart-bar', label: 'Analytics' },
		{ href: '/settings', icon: 'fas fa-cog', label: 'Settings' }
	];
</script>

<aside class="min-h-full w-64 bg-base-100">
	<!-- Logo/Brand -->
	<div class="p-4">
		<div class="flex items-center gap-3">
			<div class="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
				<i class="fas fa-cube text-primary-content"></i>
			</div>
			<div>
				<h2 class="text-lg font-bold">AdminKit</h2>
				<p class="text-xs text-base-content/60">SvelteKit + DaisyUI</p>
			</div>
		</div>
	</div>
	
	<!-- Navigation Menu -->
	<div class="p-2">
		<ul class="menu space-y-1 w-60">
			<li class="menu-title">
				<span>Main</span>
			</li>
			
			{#each menuItems.slice(0, 1) as item}
				<li>
					<a 
						href={item.href}
						class:menu-active={$page.url.pathname === item.href}
						class="font-medium"
					>
						<i class={item.icon}></i>
						{item.label}
						{#if item.badge}
							<span class="badge badge-sm badge-primary">{item.badge}</span>
						{/if}
					</a>
				</li>
			{/each}
			
			<li class="menu-title">
				<span>Management</span>
			</li>
			
			{#each menuItems.slice(1, 4) as item}
				<li>
					<a 
						href={item.href}
						class:menu-active={$page.url.pathname === item.href}
					>
						<i class={item.icon}></i>
						{item.label}
						{#if item.badge}
							<span class="badge badge-sm {item.badge === '3' ? 'badge-warning' : 'badge-primary'}">{item.badge}</span>
						{/if}
					</a>
				</li>
			{/each}
			
			<li class="menu-title">
				<span>Tools</span>
			</li>
			
			{#each menuItems.slice(4) as item}
				<li>
					<a 
						href={item.href}
						class:menu-active={$page.url.pathname === item.href}
					>
						<i class={item.icon}></i>
						{item.label}
					</a>
				</li>
			{/each}
		</ul>
	</div>
	
	<!-- Sidebar Footer -->
	<div class="absolute bottom-0 left-0 right-0 p-4 bg-base-100">
		<div class="flex items-center gap-3 p-2 rounded-lg bg-base-200">
			<div>
				<div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
					<i class="fas fa-user text-xs text-primary-content"></i>
				</div>
			</div>
			<div class="flex-1 min-w-0">
				<p class="text-sm font-medium truncate">{$user?.name}</p>
				<p class="text-xs text-base-content/60 truncate">{$user?.email}</p>
			</div>
		</div>
	</div>
</aside>