import { Control, Controller } from 'react-hook-form';
import { TextField, Box } from '@mui/material';
import { FormInputProps, DataItem } from './types';

export const InputTextControl = ({ name, control, label }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          fullWidth
          size="small"
          variant="outlined"
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          label={label}
        />
      )}
    />
  );
};

export const RowItem = ({
  control,
  name,
  type,
  index,
}: {
  item?: DataItem;
  control: Control<any, unknown>;
  name: string;
  type: number;
  index?: number;
}) => {
  //console.log(`RowItem-${index}`);

  return (
    <>
      <Box m={1} p={1}>
        <InputTextControl
          control={control}
          name={`${name}.firstName`}
          label="firstName"
        />
      </Box>

      {type > 1 && (
        <Box m={1} p={1}>
          <InputTextControl
            control={control}
            name={`${name}.lastName`}
            label="lastName"
          />
        </Box>
      )}

      {type > 2 && (
        <Box m={1} p={1}>
          {' '}
          <InputTextControl
            control={control}
            name={`${name}.patronymic`}
            label="patronymic"
          />
        </Box>
      )}
    </>
  );
};
