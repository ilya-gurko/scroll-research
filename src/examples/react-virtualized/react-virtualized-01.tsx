import React from 'react';
import { List, CellMeasurer, CellMeasurerCache } from 'react-virtualized';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Control, useFieldArray, useWatch } from 'react-hook-form';
import { testData, ComplexForm, DataItem, RowItem, FixAny } from '../common';

const FormList = ({
  items,
  control,
}: {
  items: DataItem[];
  control: Control<any, any>;
}) => {
  console.log('FormList.render');

  const [cache] = React.useState(
    new CellMeasurerCache({
      fixedWidth: true,
      defaultHeight: 72,
    })
  );

  const renderRow = ({
    index,
    parent,
    key,
    style,
  }: {
    index: number;
    parent: FixAny;
    key: string;
    style: object;
  }) => {
    return (
      <CellMeasurer
        key={key}
        cache={cache}
        parent={parent}
        columnIndex={0}
        rowIndex={index}
      >
        <div style={style}>
          <div
            style={{
              padding: '10px 0',
              borderBottom: '1px solid gray',
              backgroundColor: index % 2 ? 'white' : 'lightgray',
            }}
          >
            <RowItem
              control={control}
              name={`visiters[${index}]`}
              type={items[index].type}
              index={index}
              item={items[index]}
            />
          </div>
        </div>
      </CellMeasurer>
    );
  };

  return (
    <List
      rowCount={items.length}
      width={500}
      height={500}
      style={{ border: '1px solid gray' }}
      deferredMeasurementCache={cache}
      rowHeight={cache.rowHeight}
      rowRenderer={renderRow}
    />
  );
};

export function ReactVirtualized01() {
  const [isVisible, setVisible] = React.useState(true);
  const { handleSubmit, reset, control, getValues, setValue } =
    useForm<ComplexForm>({
      defaultValues: {
        owner: {
          id: 'owner',
          type: 3,
          firstName: 'ownerFirstName',
          lastName: 'ownerLastName',
          patronymic: 'patronymic',
        },
        visiters: testData.items,
      },
    });
  const {
    fields: items,
    append,
    remove,
    prepend,
  } = useFieldArray({
    control,
    name: 'visiters',
  });
  const owner = useWatch({
    control,
    name: 'owner',
  });

  const onSubmit = (data: ComplexForm) => console.log('onSubmit', data);

  const handleToggleClick = React.useCallback(() => {
    setVisible(!isVisible);
  }, [isVisible]);

  const handleAppend = React.useCallback(() => {
    const id = items.length.toString();
    append({
      id,
      firstName: `firstName_${id}`,
      type: 1,
    });
  }, [items, append]);

  const handlePrepend = React.useCallback(() => {
    const id = items.length.toString();
    console.log('id', id);
    prepend({
      id,
      firstName: `firstName_${id}`,
      type: 1,
    });
  }, [items, prepend]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Box m={1} p={1}>
        <Button type="submit">Submit</Button>
        <Button onClick={handleToggleClick}>
          {isVisible ? 'Hide list' : 'Show list'}
        </Button>
        <Button onClick={handleAppend}>Append</Button>
        <Button onClick={handlePrepend}>Prepend</Button>
      </Box>
      <Typography variant="h5">Организатор (owner)</Typography>
      <RowItem control={control} name="owner" type={owner.type} item={owner} />

      <Typography variant="h5">Гости (visitors)</Typography>

      {isVisible ? <FormList control={control} items={items} /> : null}
    </form>
  );
}
