<script setup lang="ts">
import { Button } from '@/components/ui/button'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button class="p-button-text">
        <i class="i-tabler-dots block color-[#DA3468]" />
        <span class="sr-only">open menu</span>
      </Button>
    </PopoverTrigger>

    <PopoverContent class="max-w-max border-[#DDE2EF] bg-white p-0">
      <slot />
    </PopoverContent>
  </Popover>
</template>
