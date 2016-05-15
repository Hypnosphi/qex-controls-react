import assets from '../build/assets';
import fs from './lib/fs';
import jade from 'jade';
import path from 'path';

const template = jade.compileFile('src/views/index.jade');
const data = {
  entry: path.join(
    'build/public',
    assets.main.js
  ),
};

async function index() {
  await fs.writeFile(
    'index.html',
    template(data)
  );
}

export default index;
