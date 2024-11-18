<script setup lang="ts">
import Loader from '@/components/Loader/index.vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

import { useCategoriesStore } from '@/stores/categories'

import { useForm } from 'vee-validate'
import { ref } from 'vue'
import { object, string } from 'yup'

const { postCategory } = useCategoriesStore()

const schema = object({
  categoryName: string().min(3, 'O nome da categoria deve ter pelo menos 3 caracteres').required('O nome da categoria é obrigatório').label('Nome da categoria'),
})

const { defineField, handleSubmit, resetForm, errors, setFieldError } = useForm({
  validationSchema: schema,
})

const [categoryName] = defineField('categoryName', { validateOnModelUpdate: false })

const isLoading = ref(false)

async function handleCreateCategory() {
  try {
    isLoading.value = true
    const newCategory = await postCategory({ name: categoryName.value })

    if (newCategory) {
      resetForm()
    }
    else {
      console.error('Failed to create category')
    }
  }
  catch (error: any) {
    console.error('RegisterCategory.vue Error creating category:', error)
    if (error?.message === 'Category already exists') {
      setFieldError('categoryName', 'Uma categoria com esse nome já existe')
    }
  }
  finally {
    isLoading.value = false
  }
}

const onSubmit = handleSubmit(() => {
  handleCreateCategory()
})

// NOTE: eu poderia não usar position absolute na small tag que mostra os erros, mas não quero causar layout shift aqui (a fonte está com um tamanho menor que em outros lugares)
</script>

<template>
  <form class="flex gap-2 pb-5 pt-1" @submit="onSubmit">
    <div class="relative w-full">
      <label for="categoryName" class="sr-only">Nome da categoria</label>
      <Input
        v-model.trim="categoryName" class="rounded-3xl" aria-describedby="categoryName-help"
        :class="{ 'border-red': errors.categoryName }" :disabled="isLoading" maxlength="48"
      />
      <small v-show="errors.categoryName" id="categoryName-help" class="absolute z-1 mt-1 text-[10px] color-red font-500 tracking-tight">
        {{ errors.categoryName }}
      </small>
    </div>
    <Button class="rounded-3xl bg-[#F24F82] color-white font-500" :disabled="isLoading">
      <Loader v-show="isLoading" :visible="isLoading" />
      criar
    </Button>
  </form>
</template>
