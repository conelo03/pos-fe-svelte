<script lang="ts" >
  import type { UserType } from '$lib/types/user.type.js';
  import { validator } from '@felte/validator-yup';
  import { createForm } from 'felte';
  import * as yup from 'yup';

  let { 
    defaultValues = {},
    onSubmit = () => {},
    onCancel = () => {},
    loading = false,
    disabled = false
  } = $props()

  let baseSchema = $state({
    name: yup.string().required(),
    username: yup.string().required(),
    role: yup.string().required(),
  })

  let schema = yup.object({
    ...baseSchema
  })

  if (!defaultValues?.id) {
    console.log(defaultValues)
    schema = yup.object({
      ...baseSchema,
      email: yup.string().email('Invalid Email')
        .when(["$defaultValues"], {
          is: (defaultValues: UserType) => !defaultValues?.id,
          then: (schema) => schema.required("Email is required"),
          otherwise: (schema) => schema.notRequired()
        }),
      password: yup.string()
        .when(["$defaultValues"], {
          is: (defaultValues: UserType) => !defaultValues?.id,
          then: (schema) => schema.required("Password is required"),
          otherwise: (schema) => schema.notRequired()
        }),
      passwordConfirm: yup.string()
        .when(["$defaultValues"], {
          is: (defaultValues: UserType) => !defaultValues?.id,
          then: (schema) => schema.required("Confirm password required")
            .oneOf([yup.ref("password")], "Passwords must match"),
          otherwise: (schema) => schema.notRequired()
        }),
    })
  }
 
  const { form, errors } = createForm<yup.InferType<typeof schema>>({
    initialValues: { ...defaultValues },
    onSubmit: (values: UserType) => {
      onSubmit(values)
    },
    extend: [validator({ schema })],
  })
</script>

<form use:form class="space-y-4">
  <input type="hidden" name="id" />
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
  {#if !defaultValues?.id}
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
  {/if}
  <fieldset class="fieldset">
    <legend class="fieldset-legend">Role</legend>
    <input type="text" name="role" class="input w-full" placeholder="Role" />
    {#if $errors.role}<span class="text-error">{$errors.role}</span>{/if}
  </fieldset>
  <div class="flex justify-end gap-2">
    <button type="button" class="btn" onclick={() => onCancel()}>Cancel</button>
    <button type="submit" class="btn btn-primary" disabled={loading || disabled}><i class="fas fa-save me-2"></i>Save</button>
  </div>
</form>