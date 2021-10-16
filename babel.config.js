const presets = [
    ['@babel/preset-env', { // какой пресет использовать
      targets: { // какие версии браузеров поддерживать - обычно определяет заказчик проек
          esmodules: true, // в браузерах, поддерж. модули (ie - нет)
    },
      // использовать полифиллы для браузеров из свойства target
      // по умолчанию babel использует поллифиллы библиотеки core-js
        useBuiltIns: "entry",
        corejs: { version: "3.18", proposals: true }
    }]
];

module.exports = { presets };