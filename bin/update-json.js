/* eslint-env node, commonjs */

import fs from 'fs';
import path from 'path';

export function updateJson(pathname, properties) {
  const jsonPath = path.join(process.cwd(), pathname);
  try {
    const data = fs.readFileSync(jsonPath, 'utf8');
    const json = JSON.parse(data);

    for (const [key, val] of Object.entries(properties)) {
      if (val === '[[DELETE]]') {
        delete json[key];
      } else {
        json[key] = val;
      }
    }
    const updatedContent = JSON.stringify(json, null, 2);

    fs.writeFileSync(jsonPath, updatedContent, 'utf8');
    console.log(`✔ Successfully updated ${pathname}`);
    return true;
  } catch (err) {
    if (err instanceof SyntaxError) {
      console.error(`! Error parsing ${pathname}:`, err);
    } else {
      console.error(`! Error reading or writing ${pathname}:`, err);
    }
    return false;
  }
}
