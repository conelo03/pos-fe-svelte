<script lang="ts">
  import ActionColumn from '$lib/components/dataDisplay/ActionColumn.svelte';
  import DataTable from '$lib/components/dataDisplay/DataTable.svelte';
  import ProductForm from '$lib/components/pages/product/ProductForm.svelte';
  import UserForm from '$lib/components/pages/user/UserForm.svelte';
  import Toast from '$lib/components/ui/Toast.svelte';
  import { createUser, deleteUser, getUsers, updateUser } from '$lib/services/user.service.js';
  import { user } from '$lib/stores/auth.js';
  import type { ColumnType } from '$lib/types/global.type.js';
  import type { UserType } from '$lib/types/user.type.js';
  import { createMutation } from '@tanstack/svelte-query';
	import { fade, scale } from "svelte/transition";

	let refreshHash: number = $state(0)
	const defaultValues = {
		name: '',
		username: '',
		email: '',
		password: '',
		role: '',
	}
	let selectedValues: UserType = $state({
		...defaultValues
	})
	let disabled = $state(false)
	let showModal = $state(false)
	let showToast = $state(false)
	let toastMessage = $state('')
	let toastType = $state('info')

	const columns: ColumnType<UserType>[] = [
    // { accessorKey: 'id', title: 'ID' },
    { accessorKey: 'name', title: 'Name' },
    { accessorKey: 'username', title: 'Username' },
    { accessorKey: 'email', title: 'Email' },
    { accessorKey: 'role', title: 'Role' },
    { title: 'Custom Column', cell: (row) => `${row.name} - ${row.email}` },
    {
      title: "Actions",
			// cell: row => row.name
			cell: (row) => ({
				component: ActionColumn,
				props: { 
					row, 
					onView: () => (disabled = true, showModal = true, selectedValues = row), 
					onEdit: () => (showModal = true, selectedValues = row), 
					onDelete: $user?.id !== row.id ? () => $deleteData.mutate(row.id) : null
				}
			})
    }
  ]

  const deleteData = createMutation({
    mutationFn: deleteUser,
    onSuccess: () => refreshHash = Math.random()
  })

  const createData = createMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
			toastMessage = data?.message
			toastType = 'success'
			showToast = true
			refreshHash = Math.random()
			showModal = false
		},
    onError: (error: any) => {
			toastMessage = error?.response?.data?.message ?? 'An error occurred'
			toastType = 'error'
			showToast = true
		},
  })

  const updateData = createMutation({
    mutationFn: updateUser,
    onSuccess: (data) => {
			toastMessage = data?.message
			toastType = 'success'
			showToast = true
			refreshHash = Math.random()
			showModal = false
		},
    onError: (error: any) => {
			toastMessage = error?.response?.data?.message ?? 'An error occurred'
			toastType = 'error'
			showToast = true
		},
  })

	const closeToast = () => {
		showToast = false
	}

	const onSubmit = (values: UserType) => {
		if (values?.id) {
			$updateData.mutate({
				id: values?.id,
				...values
			})
		} else {
			$createData.mutate({
				...values
			})
		}
	}
</script>

<svelte:head>
	<title>User Management - Admin Template</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">User Management</h1>
		<button class="btn btn-primary" onclick={() => (selectedValues = defaultValues, showModal = true)}>
			<i class="fas fa-plus mr-2"></i>
			Add User
		</button>
	</div>
	
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<DataTable
				key={'users'}
				columns={columns}
				queryFn={getUsers}
				filter={{
					// filter: [1000, 'pro', 'descrip'],
					// filterBy: ['$gte(price)', '$ilike(name)', '$ilike(description)'],
					// grouping: ['and', 'or']
				}}
				showIndex
				refreshHash={refreshHash}
			/>
		</div>
	</div>
</div>

{#if showModal}
  <div class="modal modal-open" transition:fade>
    <div class="modal-box" transition:scale={{ duration: 800 }}>
      <h3 class="font-bold text-lg mb-2">User Form</h3>
			<UserForm
				defaultValues={selectedValues}
				onSubmit={onSubmit}
				onCancel={() => (showModal = false)}
				disabled={disabled}
				loading={$createData.isPending || $updateData.isPending}
			/>
    </div>
  </div>
{/if}
{#if showToast}
	<Toast message={toastMessage} type={toastType} onClose={closeToast} />
{/if}
