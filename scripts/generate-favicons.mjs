import sharp from 'sharp';
import fs from 'fs';
import pngToIco from 'png-to-ico';

const input = 'public/logo.jpg';
const outDir = 'public';

async function run(){
  if(!fs.existsSync(input)){
    console.error('Source image not found:', input);
    process.exit(1);
  }

  // produce PNGs
  await sharp(input).resize(32,32,{fit:'cover'}).toFile(`${outDir}/favicon-32x32.png`);
  await sharp(input).resize(16,16,{fit:'cover'}).toFile(`${outDir}/favicon-16x16.png`);
  await sharp(input).resize(180,180,{fit:'cover'}).toFile(`${outDir}/apple-touch-icon.png`);
  // create temporary pngs for ico (48,32,16)
  const tmp32 = `${outDir}/.tmp_fav_32.png`;
  const tmp16 = `${outDir}/.tmp_fav_16.png`;
  const tmp48 = `${outDir}/.tmp_fav_48.png`;
  await sharp(input).resize(48,48,{fit:'cover'}).toFile(tmp48);
  await sharp(input).resize(32,32,{fit:'cover'}).toFile(tmp32);
  await sharp(input).resize(16,16,{fit:'cover'}).toFile(tmp16);

  const buffer = await pngToIco([tmp48, tmp32, tmp16]);
  fs.writeFileSync(`${outDir}/favicon.ico`, buffer);

  // cleanup temp files
  [tmp32,tmp16,tmp48].forEach(p=>{ try{fs.unlinkSync(p)}catch(e){} });

  console.log('Favicons generated in', outDir);
}

run().catch(e=>{ console.error(e); process.exit(1); });
