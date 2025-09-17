<script lang="ts" >
  import type { ProductType } from '$lib/types/product.type.js';
  import { validator } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import * as yup from 'yup';
  import { env } from "$env/dynamic/public";

  const APP_URL = env.PUBLIC_APP_URL;

  let { 
    defaultValues = {},
    onSubmit = () => {},
    onCancel = () => {},
    loading = false,
    disabled = false
  } = $props()

  const schema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
  })

  const { form, errors } = createForm<yup.InferType<typeof schema>>({
    initialValues: { ...defaultValues },
    onSubmit: (values: ProductType) => {
      onSubmit(values)
      // ...
    },
    extend: validator({ schema }),
  })
</script>

<form use:form class="space-y-4">
  <input type="hidden" name="id" />
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Product Name</legend>
    <input type="text" name="name" class="input w-full" placeholder="Name" />
    {#if $errors.name}<span class="text-error">{$errors.name}</span>{/if}
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Description</legend>
    <textarea name="description" class="textarea w-full" placeholder="Description"></textarea>
    {#if $errors.description}<span class="text-error">{$errors.description}</span>{/if}
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Price</legend>
    <input type="number" name="price" class="input w-full" />
    {#if $errors.price}<span class="text-error">{$errors.price}</span>{/if}
  </fieldset>
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Image</legend>
    {#if defaultValues?.image}<img src={`${APP_URL}${defaultValues?.image}`} alt={defaultValues?.image} />{/if}
    <input type="file" name="file" class="file-input file-input-bordered w-full" accept="image/*" />
    {#if $errors.file}<span class="text-error">{$errors.file}</span>{/if}
  </fieldset>
  <div class="flex justify-end gap-2">
    <button type="button" class="btn" onclick={() => onCancel()}>Cancel</button>
    <button type="submit" class="btn btn-primary" disabled={loading || disabled}><i class="fas fa-save me-2"></i>Save</button>
  </div>
</form>