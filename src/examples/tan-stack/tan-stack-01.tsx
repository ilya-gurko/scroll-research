import * as React from 'react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { Box, Typography, Button } from '@mui/material';
import { useForm, Control, useFieldArray, useWatch } from 'react-hook-form';
import { testData, ComplexForm, DataItem, RowItem } from '../common';

const FormList = ({
  items,
  control,
}: {
  items: DataItem[];
  control: Control<any, any>;
}) => {
  console.log('FormList.render');

  const parentRef = React.useRef<HTMLDivElement>(null);
  const [enabled] = React.useState(true);
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 72,
    enabled,
  });
  const virtualItems = virtualizer.getVirtualItems();

  return (
    <div
      ref={parentRef}
      style={{
        height: 500,
        overflowY: 'auto',
        contain: 'strict',
        border: '1px solid gray',
      }}
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          width: '100%',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            transform: `translateY(${virtualItems[0]?.start ?? 0}px)`,
          }}
        >
          {virtualItems.map(({ key, index }) => (
            <div key={key} data-index={index} ref={virtualizer.measureElement}>
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
          ))}
        </div>
      </div>
    </div>
  );
};

export const TanStack01 = () => {
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
};
