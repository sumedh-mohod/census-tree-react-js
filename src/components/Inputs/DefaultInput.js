import React from 'react'
import { TextField ,FormControl, InputAdornment} from '@mui/material';


function DefaultInput(props) {
  console.log(props)

//   const classes = useStyles();
    // const textBoxClass = useStyles();
    const{id,label,variant, autoFocus, color, defaultValue, disabled, error, name,onChange,
         placeholder, type, value, multiline,minRow,maxRow, inputProps, endAdornment, startAdornment,formControlProps,helperText}=props
  return (
    <div>
         <FormControl
        //  className={classes.TextFeild}
                {...formControlProps}
            >
        <TextField
        style={{width: '175%', marginLeft: 40,marginTop:5}}
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
        startAdornment={
            startAdornment && (
                <InputAdornment position="start">
                    {startAdornment}
                </InputAdornment>
            )
        }
        endAdornment={
            endAdornment && (
                <InputAdornment position="end">
                    {endAdornment}
                </InputAdornment>
            )
        }
        {...inputProps}
        />
          {/* {(errorMsg || notification) && (
                    <FormHelperText>{errorMsg || notification}</FormHelperText>
                )} */}
                </FormControl>
    </div>
  )
}

export default DefaultInput