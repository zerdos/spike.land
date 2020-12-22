import {} from 'react'
import { Interpolation } from '@zedvision/emotion-serialize'
import { Theme } from '.'

declare module 'react' {
  interface Attributes {
    css?: Interpolation<Theme>
  }
}
