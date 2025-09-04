<script lang="ts">
  import { createQuery } from '@tanstack/svelte-query'

  let { 
    columns, 
    key = 'queries',
    queryFn, 
    filter = {}, 
    showIndex = false, 
    refreshHash = 0 
  } = $props()

  let params = $state({
    page: 1,
    limit: 1,
    ...filter
  })

  const queries = createQuery<any>({
    queryKey: [key, params],
    queryFn: () => queryFn(params),
  })

  $effect(() => {
    $queries.refetch()

    refreshHash
    filter
  })
</script>

{#if $queries.status === 'pending'}
  <p>Loading...</p>
{:else if $queries.status === 'error'}
  <p class="text-red-500">Error: {$queries.error.message}</p>
{:else}
  <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
    <table class="table">
      <thead>
        <tr>
          {#if showIndex}
            <th>#</th>
          {/if}
          {#each columns as col}
            <th>
              {col.title}
            </th>
          {/each}
        </tr>
      </thead>
      <tbody>
        {#each $queries.data.data.result as row, i}
          <tr>
            {#if showIndex}
              <td>
                {(params.page - 1) * params.limit + (i + 1)}
              </td>
            {/if}
            {#each columns as col}
              <td>
                {#if col.cell}
                  {#if typeof col.cell(row) === 'object' && col.cell(row).component}
                      <!-- <ActionColumn {...col.cell(row).props} /> -->
                    <!-- svelte-ignore svelte_component_deprecated -->
                    <svelte:component
                      this={col.cell(row).component}
                      {...col.cell(row).props} />
                  {:else}
                    {col.cell(row)}
                  {/if}
                {:else if col.accessorKey}
                  {row[col.accessorKey]}
                {/if}
              </td>
            {/each}
          </tr>
        {/each}
      </tbody>
    </table>
  </div>

  <div class="flex gap-2 mt-2">
    <button onclick={() => (params.page = Math.max(1, params.page - 1), $queries.refetch())} disabled={params.page === 1}>
      Prev
    </button>
    <span>Page {params.page} of {Math.ceil($queries.data?.data?.total / params.limit)}</span>
    <button
      onclick={() => (params.page = params.page + 1, $queries.refetch())}
      disabled={params.page * params.limit >= ($queries.data?.data?.total ?? 0)}>
      Next
    </button>
  </div>
{/if}
