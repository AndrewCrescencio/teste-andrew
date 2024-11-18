import { useToast } from '@/components/ui/toast/use-toast'

interface ToastOptions {
  title: string
  variant?: 'default' | 'destructive'
}

export function useMyToast() {
  const { toast } = useToast()

  const showToast = (options: ToastOptions) => {
    const optionsObj: ToastOptions = {
      title: options.title,
      variant: options.variant ?? 'default',
    }

    toast(optionsObj)
  }

  return { showToast }
}
