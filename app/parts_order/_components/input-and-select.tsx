'use client';

import {
  Autocomplete,
  TextField,
} from '@mui/material';

type Props = {
  label: string;
  options: {label: string}[];
};

export function InputAndSelect(props: Props) {
  const label = props.label;
  const options = props.options;

  return (
    <>
      <Autocomplete
        disablePortal
        freeSolo // 直接入力を可能にする
        options={options}
        /*
        // options から参照する label を別のプロパティに変更したい場合
        getOptionLabel={(option) => {
          if(typeof option != 'string'){
            return option.number
          } else {
            return option
          }
        }}
        */
        renderInput={(params) => (
          <TextField {...params} label={label} variant='standard' />
        )}
      />
    </>
  );
}