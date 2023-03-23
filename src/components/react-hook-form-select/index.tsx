import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { FormHelperText } from "@mui/material";

const ReactHookFormSelect = ({
  name,
  label,
  control,
  defaultValue,
  children,
  error,
  helperText,
  ...props
}: {
  name: string;
  label: string;
  control: any;
  defaultValue?: string | number;
  children: ReactNode;
  error?: boolean;
  helperText?: string;
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props} margin="normal" fullWidth size="small">
      <InputLabel id={labelId}>{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            labelId={labelId}
            label={label}
            {...field}
            error={error}
            margin="dense"
            size="small"
          >
            {children}
          </Select>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default ReactHookFormSelect;
