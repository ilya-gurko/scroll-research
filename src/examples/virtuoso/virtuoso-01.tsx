import * as React from 'react';
import { Virtuoso } from 'react-virtuoso';
import { Control, useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Box, Typography, Button } from '@mui/material';
import { testData, ComplexForm, DataItem, RowItem } from '../common';

const FormList = ({
  items,
  control,
}: {
  items: DataItem[];
  control: Control<any, any>;
}) => {
  console.log('FormList.render');

  return (
    <Virtuoso
      style={{ height: 500, border: '1px solid gray' }}
      data={items}
      computeItemKey={(_, item) => item.id}
      itemContent={(index, item) => (
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
            type={item.type}
            index={index}
            item={item}
          />
        </div>
      )}
    />
  );
};

export const Virtuoso01 = () => {
  const [isVisible, setVisible] = React.useState(true);
  const { handleSubmit, reset, control, setValue, getValues } =
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
};
