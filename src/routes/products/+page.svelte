<script lang="ts">
  import ActionColumn from '$lib/components/dataDisplay/ActionColumn.svelte';
  import DataTable from '$lib/components/dataDisplay/DataTable.svelte';
  import ProductForm from '$lib/components/pages/product/ProductForm.svelte';
  import Toast from '$lib/components/ui/Toast.svelte';
  import { createProduct, deleteProduct, getProduts, updateProduct } from '$lib/services/product.service.js';
  import type { ColumnType } from '$lib/types/global.type.js';
  import type { ProductType } from '$lib/types/product.type.js';
  import { createMutation } from '@tanstack/svelte-query';
	import { fade, scale } from "svelte/transition";

	let refreshHash: number = $state(0)
	let selectedValues: ProductType = $state({
		name: '',
		description: '',
		price: null
	})
	let disabled = $state(false)
	let showModal = $state(false)
	let showToast = $state(false)
	let toastMessage = $state('')
	let toastType = $state('info')

	const columns: ColumnType<ProductType>[] = [
    // { accessorKey: 'id', title: 'ID' },
    { accessorKey: 'name', title: 'Name' },
    { accessorKey: 'description', title: 'Description' },
    { accessorKey: 'price', title: 'Price' },
    { title: 'Custom Column', cell: (row) => `${row.name} - ${row.price}` },
    {
      title: "Actions",
			// cell: row => row.name
			cell: (row) => ({
				component: ActionColumn,
				props: { 
					row, 
					onView: () => (disabled = true, showModal = true, selectedValues = row), 
					onEdit: () => (showModal = true, selectedValues = row), 
					onDelete: () => $deleteData.mutate(row.id)
				}
			})
    }
  ]

  const deleteData = createMutation({
    mutationFn: deleteProduct,
    onSuccess: () => refreshHash = Math.random()
  })

  const createData = createMutation({
    mutationFn: createProduct,
    onSuccess: (data) => {
			toastMessage = data?.message
			toastType = 'success'
			showToast = true
			refreshHash = Math.random()
			showModal = false
			console.log(data?.data)
			console.log(data?.message)
		},
    onError: (error: any) => {
			console.log(error?.response?.data?.message)
			toastMessage = error?.response?.data?.message ?? 'An error occurred'
			toastType = 'error'
			showToast = true
		},
  })

  const updateData = createMutation({
    mutationFn: updateProduct,
    onSuccess: (data) => {
			toastMessage = data?.message
			toastType = 'success'
			showToast = true
			refreshHash = Math.random()
			showModal = false
		},
    onError: (error: any) => {
			console.log(error?.response?.data?.message)
			toastMessage = error?.response?.data?.message ?? 'An error occurred'
			toastType = 'error'
			showToast = true
		},
  })

	const closeToast = () => {
		showToast = false
	}

	const onSubmit = (values: ProductType) => {
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
	<title>Product Management - Admin Template</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">Product Management</h1>
		<button class="btn btn-primary" onclick={() => (showModal = true)}>
			<i class="fas fa-plus mr-2"></i>
			Add Product
		</button>
	</div>
	
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<DataTable
				key={'products'}
				columns={columns}
				queryFn={getProduts}
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
      <h3 class="font-bold text-lg mb-2">Product Form</h3>
			<ProductForm
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
