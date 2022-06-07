import React from 'react'
import { TextField ,FormControl, InputAdornment} from '@mui/material';


function ViewInputField(props) {
  console.log(props)

//   const classes = useStyles();
    // const textBoxClass = useStyles();
    const{id,label,variant, autoFocus, color, defaultValue, disabled, error, name,onChange,
         placeholder, type, value, multiline,minRow,maxRow, inputProps, endAdornment, startAdornment,formControlProps,helperText}=props
  return (
    <div>
        
        <TextField
        style={{width: '88%', marginLeft: 40}}
        id={id}
        label={label}
        variant={variant}
        autoFocus={autoFocus}
        color={color}
        defaultValue={defaultValue}
        disabled={disabled}
        error={error}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        multiline={multiline || false}
        type={type}
        value={value}
        minRow={minRow}
        maxRow={maxRow}
        helperText = {helperText}
        // startAdornment={
        //     startAdornment && (
        //         <InputAdornment position="start">
        //             {startAdornment}
        //         </InputAdornment>
        //     )
        // }
        // endAdornment={
        //     endAdornment && (
        //         <InputAdornment position="end">
        //             {endAdornment}
        //         </InputAdornment>
        //     )
        // }
      
        />
    </div>
  )
}

export default ViewInputField