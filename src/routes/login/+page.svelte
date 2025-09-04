<script lang="ts">
	import { goto } from '$app/navigation'
	import { token, user } from '$lib/stores/auth.js'
	import { themeController } from '$lib/stores/theme.js'
	import { onMount } from 'svelte'
	import Toast from '$lib/components/ui/Toast.svelte'
  import { apiPost } from '$lib/api.js'
	
	let loading = false;
	let showToast = false;
	let toastMessage = '';
	let toastType = 'info';
	
	onMount(() => {
		themeController.init();
	});
	
	async function handleSubmit(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
		event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = Object.fromEntries(data.entries());
		loading = true;
		
		try {
			const response: any = await apiPost('/auth/login', payload);
			
			if (response.token) {
        token.set(response.token);
        user.set(response.user);
				toastMessage = response.message;
				toastType = 'success';
				showToast = true;
        
        setTimeout(() => goto('/dashboard'), 1000);
			} else {
				toastMessage = response.error || 'Login failed';
				toastType = 'error';
				showToast = true;
			}
		} catch (error) {
			toastMessage = 'An error occurred';
			toastType = 'error';
			showToast = true;
		} finally {
			loading = false;
		}
	}
	
	function closeToast() {
		showToast = false;
	}
</script>

<svelte:head>
	<title>Login - Admin Template</title>
</svelte:head>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
	<div class="card w-full max-w-md bg-base-100 shadow-2xl">
		<div class="card-body">
			<div class="text-center mb-6">
				<div class="w-16 h-16 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
					<i class="fas fa-lock text-2xl text-primary-content"></i>
				</div>
				<h1 class="text-3xl font-bold">Welcome Back</h1>
				<p class="text-base-content/60">Sign in to your admin account</p>
			</div>
			
			<form on:submit={handleSubmit} class="space-y-4">
				<div class="form-control">
					<label class="label" for="username">
						<span class="label-text">Username</span>
					</label>
					<input 
						id="username"
						type="text" 
            name="username"
						class="input input-bordered w-full" 
						placeholder="admin@example.com" 
						required
						disabled={loading}
					/>
				</div>
				
				<div class="form-control">
					<label class="label" for="password">
						<span class="label-text">Password</span>
					</label>
					<input 
						id="password"
						type="password" 
            name="password"
						class="input input-bordered w-full" 
						placeholder="••••••••" 
						required
						disabled={loading}
					/>
					<!-- <label class="label"> -->
          <!-- <a href="#" class="label-text-alt link link-hover">Forgot password?</a> -->
					<!-- </label> -->
				</div>
				
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">Remember me</span>
						<input type="checkbox" name="rememberMe" class="checkbox checkbox-primary" disabled={loading} />
					</label>
				</div>
				
				<button type="submit" class="btn btn-primary w-full" disabled={loading}>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
						Signing in...
					{:else}
						<i class="fas fa-sign-in-alt mr-2"></i>
						Sign In
					{/if}
				</button>
			</form>
			
			<div class="divider">OR</div>
			
			<a href="/register" class="btn btn-outline w-full">
				Don't have an account? Sign Up
			</a>
		</div>
	</div>
</div>

{#if showToast}
	<Toast message={toastMessage} type={toastType} onClose={closeToast} />
{/if}
