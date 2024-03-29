const presets = [
  ['@babel/preset-env', { // какой пресет использовать
    targets: { // какие версии браузеров поддерживать - обычно определяет заказчик проекта
      esmodules: true, // в браузерах, поддерж. модули (ie - нет)
      // строка выше взамен 1-го варианта (ниже)
      // edge: '17',
      // ie: '11',
      // firefox: '50',
      // chrome: '64',
      // safari: '11.1'
    },
    // использовать полифиллы для браузеров из свойства target
    // по умолчанию babel использует поллифиллы библиотеки core-js
    useBuiltIns: "entry",
    corejs: { version: "3.18", proposals: true }
  }]
];

module.exports = { presets };