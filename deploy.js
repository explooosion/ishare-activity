const path = require('path');
const copy = require('copy');
const replace = require('replace-in-file');

// 專案資料夾
const _project = 'activity';

const opt = [{
    files: 'dist/*.html',
    from: 'href="styles',
    to: `href="${_project}/styles`,
  },
  {
    files: 'dist/*.html',
    from: 'src="inline',
    to: `src="${_project}/inline`,
  },
  {
    files: 'dist/*.html',
    from: 'src="polyfills',
    to: `src="${_project}/polyfills`,
  },
  {
    files: 'dist/*.html',
    from: 'src="scripts',
    to: `src="${_project}/scripts`,
  },
  {
    files: 'dist/*.html',
    from: 'src="main',
    to: `src="${_project}/main`,
  }
];

let index = 0;

workRename(opt[index]);

async function workRename(arr) {
  await replace(arr)
    .then(changes => {
      console.log('Fix base success:', opt[index]['from']);
      index++;
      index < 5 ? workRename(opt[index]) : workCopy();
    })
    .catch(error => {
      console.error('Fix base error:', error);
    });
}


async function workCopy() {

  copy(['dist/*.*', '!dist/*.html'], `../server/src/public/${_project}/`, (err, file) => {
    if (err) throw err
    console.log('Copy JS/CSS complete.');

  });

  copy('dist/*.html', '../server/src/view/', (err, file) => {
    if (err) throw err
    console.log('Copy HTML complete.');
  });

  copy(`dist/assets/${_project}/*.*`, `../server/src/public/assets/${_project}`, (err, file) => {
    if (err) throw err
    console.log('Copy assets complete.');
  });
}
