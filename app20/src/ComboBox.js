import React from "react";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

const useStyles = makeStyles(() => {
return{
  formControl: {
    marginTop: 100,
    margin: (theme) => theme.spacing(20),
    marginBottom: (theme) =>theme.spacing(5)
  }
};
});

const ComboBox = (props) => {
  const { inputLabel, items, value, defaultValue, onChange } = props;
  const theme = useTheme();
  const classes = useStyles(theme);
console.log(classes.formControl);

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{inputLabel}</InputLabel>
      <Select
        defaultValue={defaultValue}
        value={value}
        onChange={(e) => {
          if (e.target.value !== undefined) {
            onChange(e.target.value);
          }
        }}
      >
        {items.map((item) => (
          <MenuItem value={item.id} key={item.id}>
            {item.value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default ComboBox;
