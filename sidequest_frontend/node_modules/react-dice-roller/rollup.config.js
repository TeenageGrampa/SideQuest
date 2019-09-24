import { uglify } from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel' ;

const config = {
  input: 'react-dice.jsx',
  external: ['react'],
  output: {
      format: 'umd',
      name: 'react-dice-roller',
      globals: {
          react: "React"
      }
  },
  plugins: [
    babel({ exclude: "node_modules/**" }),
    uglify(),
  ],
}
export default config