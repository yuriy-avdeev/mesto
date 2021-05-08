// подключите плагины в файл:
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

module.exports = {
  // подключите плагины к PostCSS
    plugins: 
    [
        autoprefixer,   // подключите autoprefixer
        cssnano({ preset: 'default' })   // cssnano при подключении передаем объект опций {preset: default} - т.е. нужно использовать
                                                       // стандартные настройки минификации
    ]
};