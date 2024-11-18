<script setup lang="ts">
import type { Category } from '@/types/category.type'
import CategoryWidget from '@/components/CategoryWidget/index.vue'
import FeedbackEmpty from '@/components/FeedbackEmpty/index.vue'
import RegisterSubcategory from '@/components/RegisterSubcategory/index.vue'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

interface Props {
  categories: Category[]
}
const { categories } = defineProps<Props>()

const emit = defineEmits<{
  (e: 'delete', payload: { category: Category, isSubCategory: boolean }): void
}>()

async function onDelete(payload: { category: Category, isSubCategory: boolean }) {
  emit('delete', payload)
}
</script>

<template>
  <section>
    <template v-if="categories">
      <Accordion type="single" collapsible class="bg-white" :default-value="categories[0].id">
        <AccordionItem v-for="(category) in categories" :key="category.id" :value="category.id" class="mb-3 border-1 rounded-2xl">
          <AccordionTrigger class="px-4 color-[#29354F] font-600">
            {{ category.name }}
          </AccordionTrigger>
          <AccordionContent class="px-4 pt-1">
            <div>
              <div class="flex flex-col gap-y-4 overflow-visible">
                <template v-if="category.children">
                  <CategoryWidget
                    v-for="(subcategory) in category.children"
                    :key="subcategory.id"
                    :is-sub-category="true"
                    :category="subcategory"
                    @delete="onDelete"
                  />
                </template>

                <RegisterSubcategory :parent-id="category.id" />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </template>

    <FeedbackEmpty v-else />
  </section>
</template>
