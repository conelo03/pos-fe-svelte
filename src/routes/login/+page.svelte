<script lang="ts">
	import { goto } from '$app/navigation';
	import { token, user } from '$lib/stores/auth.js';
	import { themeController } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
  import { validator } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import { login } from '$lib/services/auth.service.js';
  import { createMutation } from '@tanstack/svelte-query';
  import * as yup from 'yup';
	
	let showToast = $state(false)
	let toastMessage = $state('')
	let toastType = $state('info')
	
	onMount(() => {
		themeController.init()
	})

  const schema = yup.object({
    username: yup.string().required(),
		password: yup.string().required("Password is required"),
  })

	const loginMutation = createMutation({
    mutationFn: login,
    onSuccess: (data) => {
			token.set(data.token);
			user.set(data.user);
			toastMessage = data.message;
			toastType = 'success';
			showToast = true;
			
			setTimeout(() => goto('/dashboard'), 1000);
		},
    onError: (error: any) => {
			toastMessage = error?.response?.data?.message ?? 'Login failed'
			toastType = 'error'
			showToast = true
		},
  })
 
  const { form, errors } = createForm<yup.InferType<typeof schema>>({
    initialValues: {
			username: '',
			password: '',
		},
    onSubmit: (values: any) => {
			$loginMutation.mutate(values)
    },
    extend: [validator({ schema })],
  })
	
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
			
			<form use:form class="space-y-4">
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Username</legend>
					<input type="text" name="username" class="input w-full" placeholder="Username" />
					{#if $errors.username}<span class="text-error">{$errors.username}</span>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Password</legend>
					<input type="password" name="password" class="input w-full" placeholder="Password" />
					{#if $errors.password}<span class="text-error">{$errors.password}</span>{/if}
				</fieldset>				
				<button type="submit" class="btn btn-primary w-full" disabled={$loginMutation.isPending}>
					{#if $loginMutation.isPending}
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
