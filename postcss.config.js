const autoprefixer = require('autoprefixer'); // подкл. плагин в файл
const cssnano = require('cssnano'); // подкл. плагин в файл

module.exports = {
  // подкл. плагины к PostCSS
    plugins: 
    [
        autoprefixer,
        cssnano({ preset: 'default' })   // передаем объект опций {preset: default} - т.е. нужно исп-ть стандартные настройки минификации
    ]
};