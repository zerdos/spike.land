import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'snakecase-keys',
  output: {
    file: 'snakecase-keys.bundle.js',
    format: 'umd', // Change format to umd
    name: 'snakecaseKeys', // Add name for umd format
  },
  plugins: [
    resolve({
      moduleDirectories: ['node_modules']
    }),
    commonjs(),
  ],
};
