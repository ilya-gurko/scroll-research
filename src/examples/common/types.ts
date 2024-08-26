import { ProfilerOnRenderCallback } from 'react';

export type FixAny = any;

export interface FormInputProps {
  name: string;
  control: any;
  label: string;
  setValue?: any;
}

export interface DataItem1 {
  type: number;
  id: string;
  firstName: string;
}

export interface DataItem2 extends DataItem1 {
  lastName: string;
}

export interface DataItem3 extends DataItem2 {
  patronymic: string;
}

export type DataItem = DataItem1 | DataItem2 | DataItem3;

export interface ComplexForm {
  owner: DataItem;
  visiters: DataItem[];
}
