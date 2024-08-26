import styled from 'styled-components';
//import './readme.css';
import Readme from './readme.mdx';

const ReadmeStyles = styled.div`
  & table {
      border-collapse: collapse;
  }

  & td {
    padding: .25rem;
    border: 1px solid lightgray;
    text-align: center;
  }

`;

const comparisonData = [
  ['virtuoso', 'tanstack', 'window', 'virtualized', ''],
  ['2022', '2020', '2018', '2015', 'год'],
  ['5.1k', '5.3k', '15.7k', '26.2k', 'stars'],
  ['30', '44', '2', '387', 'opened issue'],
  ['689', '230', '623', '811', 'close issue'],
  ['56.6', '27', '83', '>100', 'size kB(.cjs)'],
  ['90', '115', '-', '150', 'mount performance ms'],
  ['typescript', 'typescript', 'flow', 'flow', 'dev stack'],
  ['+', '+', '+', '+', 'вертикальная виртуализация <br/> horizontal virtualization'],
  ['+', '+', '+', '+', 'горизонтальная виртуализация <br/> row virtualization'],
  ['+', '+', '+', '+', 'табличная виртуализация <br/> grid virtualization'],
  ['-', '-', '+', '-', 'неупорядоченные элементы <br/> non-linear data'],
  ['-', '-', '+', '-', 'кирпичная кладка <br/> masonry layout'],
  ['+', '+', '+', '+', 'скролл по индексу <br/> scroll to index'],
  ['+', '+', '+', '+', 'фиксированные размеры элемента <br/> fixed sizing'],
  ['+', '+', '+', '+', 'переменные размеры элемента <br/> variable sizing'],
  ['+', '+', '+', '+', 'стикерирование элементов <br/> sticky/pin items'],
  ['+', '+', '+', '+', 'бесконечный скролл <br/> infinityendless scroll'],
  ['+', '+', '+', '-', 'динамические размеры элементов <br/> dynamic sizing'],
  ['+', '+', '+', '-', 'прокрутка окна <br/> window scroller'],
  ['+', '-', '+', '+', 'плейсхолдер элемента при скроллинге <br/> placeholder while scrolling'],
  ['-', '-', '+', '+', 'авторазмер по доступной области <br/> auto sizer'],
  ['-', '-', '+', '-', 'синхронизированный скролл <br/> synchronizing scrolling'],
  ['-', '-', '-', '+', 'отображение справа-налево <br/> RTL'],
  ['+', '-', '-', '-', 'начальное позиционирование <br/> initial index '],
  ['+', '-', '-', '-', 'отображение подвала <br/> show footer '],
  ['+', '-', '-', '-', 'догрузить по требованию <br/> load on demand/press to load more '],
  ['+', '-', '-', '-', 'видимый диапазон <br/> visible range callback '],
  ['+', '-', '+', '-', 'кастомизация скрола по клавишам <br/> custom keyboard navigation'],
  ['+', '-', '-', '-', 'группировка элементов <br/> grouped '],
  ['+', '-', '-', '-', 'скроллинг до группы <br/> scroll to group '],
];

export function ReadmePage() {
  return (
    <ReadmeStyles>
      <Readme />
      <table>
        <tbody>
          {comparisonData.map((item, i) => (
            <tr key={i.toString()}>
              <td
                dangerouslySetInnerHTML={{ __html: item[4] }}
                style={{ textAlign: 'right' }}
              />
              <td>{item[0]}</td>
              <td>{item[1]}</td>
              <td>{item[2]}</td>
              <td>{item[3]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ReadmeStyles>
  );
}

// let markdownTable = `
// |              | virtuoso  | tanstack  | window  | virtualized  |
// |         ---: |   :---:   |   :---:   |  :---:  |     :---:    |
// `.trim();

// comparisonData.forEach(item => {
//   const row = `| ${item[4]} | ${item[0]} | ${item[1]} | ${item[2]} | ${item[3]} |`.trim();
//   markdownTable = markdownTable + `\n${row}`;
// });

// console.log(markdownTable)
