// @flow

import type { Interpolation, SerializedStyles } from '@zedvision/emotion-utils'
import { serializeStyles } from '@zedvision/emotion-serialize'

function css(...args: Array<Interpolation>): SerializedStyles {
  return serializeStyles(args)
}

export default css
