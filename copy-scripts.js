import { cpSync, mkdirSync } from 'fs'
import { dirname } from 'path'

function copyFile(src, dest) {
  mkdirSync(dirname(dest), { recursive: true })
  cpSync(src, dest)
}

copyFile('src/content/content.js', 'dist/src/content/content.js')
copyFile('src/background/background.js', 'dist/src/background/background.js')
copyFile('src/scripts/auto_tweet_manager.js', 'dist/src/scripts/auto_tweet_manager.js')
copyFile('src/scripts/tweet_executor.js', 'dist/src/scripts/tweet_executor.js')
copyFile('src/utils/gemini_api.js', 'dist/src/utils/gemini_api.js')
copyFile('src/utils/prompt.js', 'dist/src/utils/prompt.js')
