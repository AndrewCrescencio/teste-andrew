<script lang="ts" setup>
import { Button } from '@/components/ui/button'
import { useSubcategoriesStore } from '@/stores/subcategories'

import { onClickOutside } from '@vueuse/core'
import { useForm } from 'vee-validate'
import { nextTick, ref } from 'vue'
import { object, string } from 'yup'
import { Input as AppInput } from '../ui/input'

interface Props {
  parentId: string
}

const props = defineProps<Props>()

const schema = object({
  categoryName: string().min(3, 'O nome da categoria deve ter pelo menos 3 caracteres').required('O nome da categoria é obrigatório').label('Nome da categoria'),
})

const { defineField, handleSubmit, errors, setFieldError, resetForm } = useForm({
  validationSchema: schema,
})

const [categoryName] = defineField('categoryName')
const isCreating = ref(false)

const categoryNameInputRef = ref()
const componentRef = ref()

const isLoading = ref(false)
function startEditing() {
  isCreating.value = true
  nextTick(() => {
    if (categoryNameInputRef?.value) {
      categoryNameInputRef.value.inputRef?.focus()
    }
  })
}

const subcategoriesStore = useSubcategoriesStore()
const { postSubcategory } = subcategoriesStore

async function saveEdit() {
  try {
    isLoading.value = true
    const response = await postSubcategory({ name: categoryName.value, parentId: props.parentId })
    if (response) {
      isCreating.value = false
      resetForm()
    }
  }
  catch (err: any) {
    console.error(err)
    if (err?.message === 'Category already exists') {
      setFieldError('categoryName', 'Uma categoria com esse nome já existe')
    }
  }
  finally {
    isLoading.value = false
  }
}

function cancelEdit() {
  isCreating.value = false
  resetForm()
}

onClickOutside(componentRef, () => {
  if (isCreating.value)
    cancelEdit()
})

const onSubmit = handleSubmit(saveEdit)
</script>

<template>
  <div ref="componentRef">
    <div v-show="isCreating" class="relative w-full flex items-center justify-between">
      <form class="w-full" @submit="onSubmit">
        <AppInput
          ref="categoryNameInputRef"
          v-model.trim="categoryName" :disabled="isLoading" type="text" minlength="3" maxlength="48" class="h-[52px]"
          @keydown.enter.prevent="onSubmit" @keydown.esc.prevent="cancelEdit"
        />
        <small v-show="errors.categoryName" id="categoryName-help" class="mt-1 block text-xs color-red font-500">
          {{ errors.categoryName }}
        </small>
        <div class="absolute right-2 top-2 flex items-center gap-2">
          <Button
            :disabled="isLoading"
            aria-label="Cancelar" class="grid h-9 w-9 place-content-center rounded-full bg-[#FFE2EB] color-[#DA3468]"
            @click="cancelEdit"
          >
            <span class="sr-only">Cancelar</span>
            <div class="i-tabler-x not-sr-only block h-4 w-4 color-[#DA3468]" />
          </Button>
          <Button
            :disabled="isLoading"
            aria-label="Salvar" class="grid h-9 w-9 place-content-center rounded-full bg-[#DA3468] color-white"
            @click="onSubmit"
          >
            <span class="sr-only">salvar</span>
            <div v-if="!isLoading" class="i-tabler-check not-sr-only block h-4 w-4 color-white" />
            <div v-else class="i-tabler-loader-2 not-sr-only block h-4 w-4 animate-spin color-white" />
          </Button>
        </div>
      </form>
    </div>
    <Button v-show="!isCreating" class="h-[52px] w-full items-center justify-between bg-[#F3F3F5] color-[#DA3468] font-500 !flex-row" aria-label="Adicionar subcategoria" @click="startEditing">
      Adicionar subcategoria
      <i class="i-tabler-plus color-[#DA3468]" />
    </Button>
  </div>
</template>
