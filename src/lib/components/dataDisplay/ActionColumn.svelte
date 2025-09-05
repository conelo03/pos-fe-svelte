<script lang="ts">
  import { fade, scale } from "svelte/transition";

  let { 
    row = {}, 
    onView = null,
    onEdit = null, 
    onDelete = null,
  } = $props()
  // export let row: any;
  // export let onView: (row: any) => void;
  // export let onEdit: (row: any) => void;
  // export let onDelete: (row: any) => void;

  let open: boolean = $state(false)
</script>

<div class="flex justify-center gap-2">
  {#if typeof onView === 'function'} 
    <button class="btn btn-sm btn-success" onclick={() => onView(row)} aria-label="View"><i class="fas fa-eye"></i></button> 
  {/if}
  {#if typeof onEdit === 'function'} 
    <button class="btn btn-sm btn-info" onclick={() => onEdit(row)} aria-label="Edit"><i class="fas fa-pencil"></i></button> 
  {/if}
  {#if typeof onDelete === 'function'} 
    <button class="btn btn-sm btn-error" onclick={() => (open = true)} aria-label="Delete"><i class="fas fa-trash"></i></button> 
  {/if}
</div>
{#if open}
  <div class="modal modal-open" transition:fade>
    <div class="modal-box" transition:scale={{ duration: 800 }}>
      <h3 class="font-bold text-lg">Confirmation</h3>
      <p class="py-4">Are you sure want to delete this data?</p>
      <div class="modal-action flex gap-2">
        <button class="btn btn-error" onclick={() => (onDelete(row), open = false)}>Delete</button>
        <button class="btn" onclick={() => (open = false)}>Cancel</button>
      </div>
    </div>
  </div>
{/if}
