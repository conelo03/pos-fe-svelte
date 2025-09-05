<script lang="ts">
	import { themeController } from '$lib/stores/theme.js';
	import { onMount } from 'svelte';
	import Toast from '$lib/components/ui/Toast.svelte';
  import { goto } from '$app/navigation';
  import { apiPost } from '$lib/api.js';
  import type { UserType } from '$lib/types/user.type.js';
  import { validator } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { createMutation } from '@tanstack/svelte-query';
  import { register } from '$lib/services/auth.service.js';
	
	let showToast = $state(false)
	let toastMessage = $state('')
	let toastType = $state('info')
	
	onMount(() => {
		themeController.init()
	})

  const schema = yup.object({
		name: yup.string().required(),
    username: yup.string().required(),
    role: yup.string().required(),
		email: yup.string().email('Invalid Email').required("Email is required"),
		password: yup.string().required("Password is required"),
		passwordConfirm: yup.string()
			.when(["password"], {
				is: (password: string) => password,
				then: (schema) => schema.required("Confirm password required")
					.oneOf([yup.ref("password")], "Passwords must match"),
				otherwise: (schema) => schema.notRequired()
			}),
  })

	const registerMutation = createMutation({
    mutationFn: register,
    onSuccess: (data) => {
			toastMessage = data?.message
			toastType = 'success'
			showToast = true
			
			setTimeout(() => goto('/login'), 1000)
		},
    onError: (error: any) => {
			toastMessage = error?.response?.data?.message ?? 'An error occurred'
			toastType = 'error'
			showToast = true
		},
  })
 
  const { form, errors } = createForm<yup.InferType<typeof schema>>({
    initialValues: {
			name: '',
			username: '',
			email: '',
			password: '',
			passwordConfirm: '',
			role: 'customer',
		},
    onSubmit: (values: UserType) => {
			$registerMutation.mutate(values)
    },
    extend: [validator({ schema })],
  })
	
	function closeToast() {
		showToast = false
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
			
			<form use:form class="space-y-2">
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Name</legend>
					<input type="text" name="name" class="input w-full" placeholder="Name" />
					{#if $errors.name}<span class="text-error">{$errors.name}</span>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Username</legend>
					<input type="text" name="username" class="input w-full" placeholder="Username" />
					{#if $errors.username}<span class="text-error">{$errors.username}</span>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Email</legend>
					<input type="text" name="email" class="input w-full" placeholder="Email" />
					{#if $errors.email}<span class="text-error">{$errors.email}</span>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Password</legend>
					<input type="password" name="password" class="input w-full" placeholder="Password" />
					{#if $errors.password}<span class="text-error">{$errors.password}</span>{/if}
				</fieldset>
				<fieldset class="fieldset">
					<legend class="fieldset-legend">Password Confirm</legend>
					<input type="password" name="passwordConfirm" class="input w-full" placeholder="Password" />
					{#if $errors.passwordConfirm}<span class="text-error">{$errors.passwordConfirm}</span>{/if}
				</fieldset>				
				<button type="submit" class="btn btn-secondary w-full" disabled={$registerMutation.isPending}>
					{#if $registerMutation.isPending}
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