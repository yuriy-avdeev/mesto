export default class {
    constructor({arrayWithDataList, renderer}, containerSelector) {
        this._arrayWithDataList = arrayWithDataList;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._arrayWithDataList.forEach(itemWithData => {
          this._renderer(itemWithData); // вызываем renderer - по количеству элементов массива:
          // т.е. отрисовка новых карточек из переданных в элементе link и name
        });
    }

    addItem(element) {
        this._container.prepend(element);
    }
}

// принимает объект с двумя свойствами: items и renderer:
// Свойство items — это массив данных, которые нужно добавить на страницу при инициализации класса. 
// Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
// Второй параметр конструктора — селектор контейнера, в который нужно добавлять созданные элементы.
// Содержит публ. метод, кот. отв-т за отрисовку всех эл-тов: oтрисовка каждого отдельного эл-та должна осущ-ся ф-ей renderer.
// Содержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.