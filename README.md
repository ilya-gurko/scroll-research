# Обзор библиотек для виртуализации списков.

## [react-virtualized](https://www.npmjs.com/package/react-virtualized)

Довольно старое, но намоленное решение. Редко обновляется. Много открытых issue и не вмерженных PR.
Ввиду возраста, основана на классовых компонентах. В коде используются deprecated методы.
Есть проблемы при импорте в Vite [issue 02.03.2022](https://github.com/bvaughn/react-virtualized/issues/1722).
(Для импорта необходимо использовать дополнительный плагин.)  
**Выглядит как уходящая натура.**

## [react-window](https://www.npmjs.com/package/react-window)

Более легковесное решение чем react-virtualized написанная тем же разработчиком.
Предлагает минималистичный, но быстрый подход. Редко обновляется.  
Чтобы сделать список с заранее неизвестными размерами элементов необходимо приложить дополнительные усилия.
**Подходит для сценариев, требующих легкого решения с простыми списками или сетками фиксированного размера**,

## [@tanstack/react-virtual](https://www.npmjs.com/package/@tanstack/react-virtual)

В основе библиотеки пакет @tanstack/virtual-core, не привязанный к конкертному фреймворку.  
Имеются обёртки для всех фреймворков включая React. По описанной функциональности уступает react-virtualized и react-vitruoso.

## [react-virtuso](https://www.npmjs.com/package/react-virtuoso)

Довольно молодая библитека для React. По функциональности в чём-то уступает react-virtualized, но имеет фичи которых не обозначены в react-virtualized

## Известные проблемы

- У всех библиотек с динамическими размерами элементов имеются проблемы с проматыванием списка до конца или начало.
- У **react-virtualize**, **tanstack/react-virtual** при добавлении элемента в форму списка некорретно значения последующих строк
- **tanstack/react-virtual** несколько раз вызывает рендер списка при инстацировании, прокрутке

Возможно это решаемые проблемы, но требует дополнительных усилий

## Тестовые примеры

Тестовые примеры расположены в src/examples. Отображается разное количество полей от 1 до 3.
Количество записей 10000. Набор данных одиновый для всех примеров

```ts
type DataItem {
  id: string,
  type: string,
  firstName: string,
  lastName?: string,
  patronymic?: string,
}
```

Код примеров максимально атомарен. Наиболее показательный компонент в коде примеров **FormList**

## Сравнительная таблица возможностей

Составлена на основе документации разбработчика с примерами кода (или ссылками на них).  
Наверное можно реализовать все хотелки во всех библиотеках, но для перечисленных в списке точно есть рецепты от производителя.

|              | virtuoso  | tanstack  | vitualized  |  window |
|         ---: |   :---:   |   :---:   |    :---:    |  :---:  |
| год | 2022 | 2020 | 2015 | 2018 |
| stars | 5.1k | 5.3k | 26.2k | 15.7k |
| opened issue | 30 | 44 | 387 | 2 |
| close issue | 689 | 230 | 811 | 623 |
| size kB(.cjs) | 56.6 | 27 | >100 | 83 |
| mount performance ms | 90 | 115 | 150 | ? |
| dev stack | typescript | typescript | flow | flow |
| вертикальная виртуализация <br/> horizontal virtualization | + | + | + | + |
| горизонтальная виртуализация <br/> row virtualization | + | + | + | + |
| табличная виртуализация <br/> grid virtualization | + | + | + | + |
| неупорядоченные элементы <br/> non-linear data | - | - | + | - |
| кирпичная кладка <br/> masonry layout | - | - | + | - |
| скролл по индексу <br/> scroll to index | + | + | + | + |
| фиксированные размеры элемента <br/> fixed sizing | + | + | + | + |
| переменные размеры элемента <br/> variable sizing | + | + | + | + |
| стикерирование элементов <br/> sticky/pin items | + | + | + | + |
| бесконечный скролл <br/> infinityendless scroll | + | + | + | + |
| динамические размеры элементов <br/> dynamic sizing | + | + | + | - |
| прокрутка окна <br/> window scroller | + | + | + | - |
| плейсхолдер элемента при скроллинге <br/> placeholder while scrolling | + | - | + | + |
| авторазмер по доступной области <br/> auto sizer | - | - | + | + |
| синхронизированный скролл <br/> synchronizing scrolling | - | - | + | - |
| отображение справа-налево <br/> RTL | - | - | - | + |
| начальное позиционирование <br/> initial index  | + | - | - | - |
| отображение подвала <br/> show footer  | + | - | - | - |
| догрузить по требованию <br/> load on demand/press to load more  | + | - | - | - |
| видимый диапазон <br/> visible range callback  | + | - | - | - |
| кастомизация скрола по клавишам <br/> custom keyboard navigation | + | - | + | - |
| группировка элементов <br/> grouped  | + | - | - | - |
| скроллинг до группы <br/> scroll to group  | + | - | - | - |

