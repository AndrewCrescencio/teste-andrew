<script lang="ts" setup>
import type { Category } from '@/types/category.type'
import ListItemMenu from '@/components/ListIemMenu/index.vue'
import { Button } from '@/components/ui/button'
import { useCategoriesStore } from '@/stores/categories'
import { useSubcategoriesStore } from '@/stores/subcategories'
import { onClickOutside } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { nextTick, ref } from 'vue'
import { object, string } from 'yup'
import { Input } from '../ui/input'

interface Props {
  category: Category
  isSubCategory: boolean
}

const { category, isSubCategory } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', payload: { category: Category, isSubCategory: boolean }): void
}>()

const schema = object({
  categoryName: string().min(3, 'O nome da categoria deve ter pelo menos 3 caracteres').required('O nome da categoria é obrigatório').label('Nome da categoria'),
})

const { defineField, handleSubmit, errors, setFieldValue, setFieldError } = useForm({
  validationSchema: schema,
})

const [categoryName] = defineField('categoryName')

const isEditing = ref(false)
const isLoading = ref(false)

const { updateCategory } = useCategoriesStore()
const { updateSubcategory } = useSubcategoriesStore()

const categoryNameInputRef = ref()

function startEditing() {
  setFieldValue('categoryName', category.name)
  isEditing.value = true
  nextTick(() => {
    categoryNameInputRef.value?.inputRef?.focus()
  })
}

async function saveEdit() {
  try {
    isLoading.value = true
    const response = isSubCategory ? await updateSubcategory(categoryName.value, category.id) : await updateCategory(categoryName.value, category.id)
    isEditing.value = false
    return response
  }
  catch (err: any) {
    console.error(err)
    if (err?.message === 'Category already exists') {
      setFieldError('categoryName', 'Uma categoria com esse nome já existe')
    }

    throw err
  }
  finally {
    isLoading.value = false
  }
}

function cancelEdit() {
  isEditing.value = false
}

onClickOutside(categoryNameInputRef, () => cancelEdit())

async function deleteItem() {
  emit('delete', { category, isSubCategory })
}

const onSubmit = handleSubmit(() => {
  if (categoryName.value === category.name) {
    isEditing.value = false
    return
  }
  saveEdit()
})
</script>

<template>
  <div class="pt-1">
    <div v-if="isEditing" class="relative h-[52px] w-full flex items-center justify-between">
      <form class="h-full w-full" @submit="onSubmit">
        <Input
          :id="category.id"
          ref="categoryNameInputRef"
          v-model.trim="categoryName"
          aria-labelledby="input-nome-categoria" :disabled="isLoading" type="text" minlength="3" maxlength="48" class="h-full"
          @keydown.enter.prevent="onSubmit" @keydown.esc.prevent="cancelEdit"
        />
        <small id="categoryName-help" class="absolute z-1 text-xs color-red font-500">
          {{ errors.categoryName }}
        </small>

        <div class="absolute right-2 top-2 flex items-center gap-2">
          <Button
            :disabled="isLoading"
            aria-label="Cancelar"
            class="grid h-9 w-9 place-content-center rounded-full bg-[#FFE2EB] color-[#DA3468]" @click="cancelEdit"
          >
            <span class="sr-only">Cancelar</span>
            <div class="i-tabler-x not-sr-only block h-4 w-4 color-[#DA3468]" />
          </Button>
          <Button
            :disabled="isLoading || category.name === categoryName"
            aria-label="Salvar" class="grid h-9 w-9 cursor-pointer place-content-center rounded-full bg-[#DA3468] color-white"
          >
            <span class="sr-only">salvar</span>
            <!-- <div class="i-tabler-check not-sr-only block h-4 w-4 color-white" /> -->
            <div v-if="!isLoading" class="i-tabler-check not-sr-only block h-4 w-4 color-white" />
            <div v-else class="i-tabler-loader-2 not-sr-only block h-4 w-4 animate-spin color-white" />
          </Button>
        </div>
      </form>
    </div>
    <div v-else class="h-[52px] w-full flex items-center justify-between rounded-[14px] bg-[#F3F3F5] px-4">
      <p class="category-name color-[#29354F]">
        {{ category.name }}
      </p>
      <ListItemMenu class="text-left">
        <Button class="w-full flex items-center justify-start" aria-label="Renomear" @click="startEditing">
          <div class="i-tabler-pencil color-[#DA3468]" />
          Renomear
        </Button>
        <Button class="w-full flex items-center justify-start" aria-label="Excluir" @click="deleteItem">
          <div class="i-tabler-trash color-[#DA3468]" />
          Excluir
        </Button>
      </ListItemMenu>
    </div>
  </div>
</template>
