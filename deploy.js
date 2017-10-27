const path = require('path');
const copy = require('copy');
const replace = require('replace-in-file');

// 專案資料夾
const _project = 'activity';

const options = {
  files: 'dist/*.html',
  from: 'base href="./"',
  to: `base href="./${_project}/"`,
};

replace(options)
  .then(changes => {
    console.log('Fix base success:', changes.join(', '));

    copy(['dist/*.*', '!dist/*.html'], `../server/src/public/${_project}/`, (err, file) => {
      if (err) throw err
      console.log('Copy JS/CSS complete.');

    });

    copy('dist/*.html', '../server/src/view/', (err, file) => {
      if (err) throw err
      console.log('Copy HTML complete.')
    });


  })
  .catch(error => {
    console.error('Fix base error:', error);
  });
