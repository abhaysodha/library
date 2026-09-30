import fs from 'node:fs';
import { EventEmitter } from 'node:events';

const file = new URL('./data.txt', import.meta.url);
const text = await fs.promises.readFile(file, 'utf8');
let lineCount = 0;

if (text.length > 0) {
  const lines = text.split('\n');
  if (lines[lines.length - 1] === '') {
    lines.pop();
  }
  lineCount = lines.length;
}
console.log('number of lines:', lineCount);

const events = new EventEmitter();
events.on('bookAdded', book => {
  console.log('book added:', book);
});
events.emit('bookAdded', { id: 6, name: 'New Book', price: 500 });

