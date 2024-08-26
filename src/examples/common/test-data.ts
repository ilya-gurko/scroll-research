import { DataItem } from './types';

const DEFAULT_COUNT = 10_000;

function getDataItem(id: number | string, type?: number): DataItem {
  type = type ?? Math.round(Math.random() * 2) + 1;

  let result: DataItem = {
    type: 1,
    id: id.toString(),
    firstName: `firstName_${id}`,
  };

  if (type > 1) result = { ...result, type: 2, lastName: `lastName_${id}` };

  if (type > 2)
    result = {
      ...result,
      type: 3,
      patronymic: `patronymic_${id}`,
    };

  return result;
}

export class TestData {
  private _items: DataItem[] = [];

  get items(): DataItem[] {
    return this._items.map((item) => ({ ...item }));
  }

  createItems(count: number) {
    let type = 0;

    this._items = new Array(count).fill(null).map((_, i) => {
      type = type === 3 ? 1 : ++type;

      return getDataItem(i, type);
    });
  }

  constructor(count?: number) {
    this.createItems(count ?? 0);
  }
}

export const testData = new TestData(DEFAULT_COUNT);
