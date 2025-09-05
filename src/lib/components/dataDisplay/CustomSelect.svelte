<script lang="ts">
  import Select from 'svelte-select'
  import { createField } from 'felte'
  import { theme } from '$lib/stores/theme.js';
  
  let {
    items = [],
    value = null,
    onchange = null,
    placeholder,
    multiple = false,
    searchable = true,
    clearable = true,
    disabled = false,
    filterFunction = null,
    getOptionLabel = null,
    getSelectionLabel = null,
    createGroupHeaderItem = null,
  } = $props()

  let selectedValue = getSelectedValue(value)
  console.log(value)
  
  function getSelectedValue(fieldValue: any) {
    if (!fieldValue || !items.length) return multiple ? [] : undefined
    
    if (multiple) {
      if (Array.isArray(fieldValue)) {
        return items.filter(item => fieldValue.includes(item.value))
      }
      return []
    } else {
      return items.find(item => item.value === fieldValue) || undefined
    }
  }
  
  function handleChange(event: any) {
    const selected = event.detail
    if (multiple) {
      const values = selected ? selected.map((item: any) => item.value) : []
      onchange && onchange(values)
    } else {
      const value = selected?.value || ''
      onchange && onchange(value)
    }
  }
  
  function handleClear() {
    if (multiple) {
      onchange && onchange(value)
    } else {
      onchange && onchange(value)
    }
  }
</script>

<div class="select-wrapper" data-theme={$theme}>
  <Select
    items={items}
    value={selectedValue}
    placeholder={placeholder}
    multiple={multiple}
    searchable={searchable}
    clearable={clearable}
    disabled={disabled}
    createGroupHeaderItem={createGroupHeaderItem}
    on:change={handleChange}
    on:clear={handleClear}
    class={`daisyui-select`}
  />
</div>

<style>
  /* Base select styling mengikuti DaisyUI input */
  .select-wrapper {
    background-color: transparent !important;
  }

  :global(.daisyui-select) {
    --background: hsl(var(--b1));
    --border: 1px solid hsl(var(--bc) / 0.2);
    --border-hover: 1px solid hsl(var(--bc) / 0.4);
    --border-focused: 2px solid hsl(var(--p));
    --border-radius: var(--rounded-btn, 0.25rem);
    --height: 2.5rem;
    --font-size: 0.875rem;
    --placeholder-color: hsl(var(--bc) / 0.6);
    --selected-item-color: hsl(var(--bc));
    --list-background: hsl(var(--b1));
    --list-border: 1px solid hsl(var(--bc) / 0.2);
    --list-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
    --item-hover-bg: hsl(var(--b2));
    --item-is-active-bg: hsl(var(--p));
    --item-is-active-color: hsl(var(--pc));
    
    width: 100%;
    min-height: var(--height);
    outline: 2px solid transparent;
    outline-offset: 2px;
    transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  }

  [data-theme="dark"] :global(.daisyui-select) {
    --background: #1f2937;                    /* Dark background */
    --border: 1px solid rgba(255, 255, 255, 0.1);
    --border-hover: 1px solid rgba(255, 255, 255, 0.2);
    --border-focused: 2px solid #3b82f6;      /* Blue focus */
    --placeholder-color: rgba(255, 255, 255, 0.5);
    --selected-item-color: #f9fafb;           /* Light text */
    --list-background: #1f2937;              /* Dark dropdown */
    --list-border: 1px solid rgba(255, 255, 255, 0.15);
    --list-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 
                    0 0 0 1px rgba(255, 255, 255, 0.05);
    --item-hover-bg: #374151;                /* Darker hover */
    --item-is-active-bg: #3b82f6;           /* Blue active */
    --item-is-active-color: #ffffff;         /* White text */
  }
</style>