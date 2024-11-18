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
    <PopoverTrigger>
      <Button class="p-button-text">
        <i class="pi pi-ellipsis-v rotate-90" />
        <div class="i-tabler-dots color-[#DA3468]" />
      </Button>
    </PopoverTrigger>

    <PopoverContent class="max-w-max border-[#DDE2EF] bg-white p-0">
      <slot />
    </PopoverContent>
  </Popover>
</template>
