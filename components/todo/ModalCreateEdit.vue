<script setup lang="ts">
// Interfaces
import { ITodoForm } from '~~/utils/interfaces/todo/todo'

// Yup
import { object, string } from 'yup'

// Vee Validate
import { useForm } from 'vee-validate'

// Interfaces
interface ITodoModalCreateEditProps {
  isOpen: boolean
  isEdit: boolean
}

// Props
const { isOpen } = defineProps<ITodoModalCreateEditProps>()

// Emits
const emit = defineEmits<{
  (e: 'close', value: false): void
  (e: 'submit', value: ITodoForm): void
}>()

// Form
const validationSchema = object({
  title: string().required().label('Title')
})
const { handleSubmit } = useForm<ITodoForm>({
  validationSchema
})

/**
 * @description Submit
 *
 * @param {ITodoForm} form
 *
 * @return {void} void
 */
const onSubmit = handleSubmit((form): void => {
  emit('submit', form)
})

/**
 * @description Hide / Close modal
 *
 * @param {boolean} value
 *
 * @return {void} void
 */
const onClose = (): void => {
  emit('close', false)
}
</script>

<template>
  <v-modal
    title="Todo Form"
    width="1024px"
    maxWidth="1024px"
    persistent
    hide-x-button
    :model-value="isOpen"
    @close="onClose"
  >
  </v-modal>
</template>
