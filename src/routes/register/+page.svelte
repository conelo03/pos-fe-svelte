<script lang="ts">
	import { themeController } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
	
	let loading = false;
	let showToast = false;
	let toastMessage = '';
	let toastType = 'info';
	
	onMount(() => {
		themeController.init();
	});
	
	async function handleRegister(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement}) {
		event.preventDefault();
		
		// if (!agreeTerms) {
		// 	toastMessage = 'Please agree to the terms and conditions';
		// 	toastType = 'warning';
		// 	showToast = true;
		// 	return;
		// }
		
		// loading = true;
		
		// try {
		// 	const result = await auth.register({
		// 		firstName,
		// 		lastName,
		// 		email,
		// 		password,
		// 		confirmPassword
		// 	});
			
		// 	if (result.success) {
		// 		toastMessage = result.message;
		// 		toastType = 'success';
		// 		showToast = true;
				
		// 		setTimeout(() => {
		// 			goto('/login');
		// 		}, 2000);
		// 	} else {
		// 		toastMessage = result.error;
		// 		toastType = 'error';
		// 		showToast = true;
		// 	}
		// } catch (error) {
		// 	toastMessage = 'Registration failed';
		// 	toastType = 'error';
		// 	showToast = true;
		// } finally {
		// 	loading = false;
		// }
	}
	
	function closeToast() {
		showToast = false;
	}
</script>

<svelte:head>
	<title>Register - Admin Template</title>
</svelte:head>

<div class="min-h-screen bg-base-200 flex items-center justify-center p-4">
	<div class="card w-full max-w-md bg-base-100 shadow-2xl">
		<div class="card-body">
			<div class="text-center mb-6">
				<div class="w-16 h-16 bg-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
					<i class="fas fa-user-plus text-2xl text-secondary-content"></i>
				</div>
				<h1 class="text-3xl font-bold">Create Account</h1>
				<p class="text-base-content/60">Join the admin panel</p>
			</div>
			
			<form on:submit={handleRegister} class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div class="form-control">
						<label class="label" for="firstName">
							<span class="label-text">First Name</span>
						</label>
						<input 
							id="firstName"
							name="firstName"
							type="text" 
							class="input input-bordered w-full" 
							placeholder="John" 
							required
							disabled={loading}
						/>
					</div>
					<div class="form-control">
						<label class="label" for="lastName">
							<span class="label-text">Last Name</span>
						</label>
						<input 
							id="lastName"
							name="lastName"
							type="text" 
							class="input input-bordered w-full" 
							placeholder="Doe" 
							required
							disabled={loading}
						/>
					</div>
				</div>
				
				<div class="form-control">
					<label class="label" for="registerEmail">
						<span class="label-text">Email Address</span>
					</label>
					<input 
						id="registerEmail"
						type="email" 
						name="email" 
						class="input input-bordered w-full" 
						placeholder="admin@example.com" 
						required
						disabled={loading}
					/>
				</div>
				
				<div class="form-control">
					<label class="label" for="registerPassword">
						<span class="label-text">Password</span>
					</label>
					<input 
						id="registerPassword"
						type="password" 
						name="password" 
						class="input input-bordered w-full" 
						placeholder="••••••••" 
						required
						disabled={loading}
					/>
					<!-- <label class="label">
						<span class="label-text-alt">Must be at least 8 characters</span>
					</label> -->
				</div>
				
				<div class="form-control">
					<label class="label" for="confirmPassword">
						<span class="label-text">Confirm Password</span>
					</label>
					<input 
						id="confirmPassword"
						name="confirmPassword"
						type="password" 
						class="input input-bordered w-full" 
						placeholder="••••••••" 
						required
						disabled={loading}
					/>
				</div>
				
				<div class="form-control">
					<label class="label cursor-pointer">
						<span class="label-text">I agree to the Terms of Service and Privacy Policy</span>
						<input type="checkbox" name="agreeTerms" class="checkbox checkbox-primary" disabled={loading} />
					</label>
				</div>
				
				<button type="submit" class="btn btn-secondary w-full" disabled={loading}>
					{#if loading}
						<span class="loading loading-spinner loading-sm"></span>
						Creating account...
					{:else}
						<i class="fas fa-user-plus mr-2"></i>
						Create Account
					{/if}
				</button>
			</form>
			
			<div class="divider">OR</div>
			
			<a href="/login" class="btn btn-outline w-full">
				Already have an account? Sign In
			</a>
		</div>
	</div>
</div>

{#if showToast}
	<Toast message={toastMessage} type={toastType} onClose={closeToast} />
{/if}