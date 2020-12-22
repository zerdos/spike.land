// @flow
import createCache from '@zedvision/emotion-cache'

test('throws correct error with invalid key', () => {
  expect(() => {
    createCache({ key: '.' })
  }).toThrowErrorMatchingSnapshot()
})
