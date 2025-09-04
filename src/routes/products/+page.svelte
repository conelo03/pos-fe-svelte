<script lang="ts">
  import ActionColumn from '$lib/components/dataDisplay/ActionColumn.svelte';
  import DataTable from '$lib/components/dataDisplay/DataTable.svelte';
  import { deleteProduct, getProduts } from '$lib/services/product.service.js';
  import type { ColumnType } from '$lib/types/global.type.js';
  import type { ProductType } from '$lib/types/product.type.js';
  import { createMutation } from '@tanstack/svelte-query';

	let refreshHash: number = $state(0)

	const columns: ColumnType<ProductType>[] = [
    { accessorKey: 'id', title: 'ID' },
    { accessorKey: 'name', title: 'Name' },
    { accessorKey: 'description', title: 'Description' },
    { accessorKey: 'price', title: 'Price' },
    { title: 'Custom', cell: (row) => `${row.name} - ${row.price}` },
    {
      title: "Actions",
			// cell: row => row.name
			cell: (row) => ({
				component: ActionColumn,
				props: { 
					row, 
					// onView: () => {}, 
					onEdit: () => refreshHash = Math.random(), 
					onDelete: () => $deleteMutation.mutate(row.id)
				}
			})
    }
  ]

	// // Mutation delete user
  const deleteMutation = createMutation({
    mutationFn: deleteProduct,
    onSuccess: () => refreshHash = Math.random()
  })
</script>

<svelte:head>
	<title>Product Management - Admin Template</title>
</svelte:head>

<div class="space-y-6">
	<div class="flex justify-between items-center">
		<h1 class="text-2xl font-bold">Product Management</h1>
		<button class="btn btn-primary">
			<i class="fas fa-plus mr-2"></i>
			Add Product
		</button>
	</div>
	
	<div class="card bg-base-100 shadow">
		<div class="card-body">
			<DataTable columns={columns} key={'products'} queryFn={getProduts} filter={{}} showIndex refreshHash={refreshHash} />
		</div>
	</div>
</div>
