// Import synchronous copy and directory creation functions from 'fs' module
import { cpSync, mkdirSync } from 'fs';

// Import 'dirname' to get the directory path of a file
import { dirname } from 'path';

/**
 * Copies a file from src to dest.
 * Ensures that the destination directory exists (creates it recursively if needed).
 */
function copyFile(src, dest) {
  // Create destination folder if it doesn't exist
  mkdirSync(dirname(dest), { recursive: true });

  // Copy file from src to dest
  cpSync(src, dest);
}

// Copy content script
copyFile('src/content/content.js', 'dist/src/content/content.js');

// Copy background script
copyFile('src/background/background.js', 'dist/src/background/background.js');

// Copy utility script for managing auto-tweeting
copyFile('src/scripts/auto_tweet_manager.js', 'dist/src/scripts/auto_tweet_manager.js');

// Copy script that handles tweet generation and posting
copyFile('src/scripts/tweet_executor.js', 'dist/src/scripts/tweet_executor.js');

// Copy Gemini API integration script
copyFile('src/utils/gemini_api.js', 'dist/src/utils/gemini_api.js');

// Copy prompt generator script
copyFile('src/utils/prompt.js', 'dist/src/utils/prompt.js');
