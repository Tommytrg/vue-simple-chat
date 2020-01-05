// bili.config.ts
import { Config } from 'bili'

const config: Config = {
  plugins: {
    vue: {
      runtimeHelpers: true,
      css: true
    },
  },
  input: 'src/index.ts',
  babel: {
    configFile: true
  }
}

export default config