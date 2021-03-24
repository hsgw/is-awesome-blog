import { InjectionKey, provide, inject } from '@nuxtjs/composition-api'

export function createTransitionProps() {
  return {}
}

/* provide/inject */
export const key: InjectionKey<
  ReturnType<typeof createTransitionProps>
> = Symbol('TransitionProps')

export const provideTransitionProps = () => {
  provide(key, createTransitionProps())
}

export const useTransitionProps = () => {
  const ret = inject(key)
  if (ret === undefined) throw new Error('useTransitionProps is not provided')
  else return ret
}
