import { onGlobalSetup } from '@nuxtjs/composition-api'
import { provideTransitionProps } from '@/scripts/useTransitionProps'

export default () => {
  onGlobalSetup(() => {
    provideTransitionProps()
  })
}
