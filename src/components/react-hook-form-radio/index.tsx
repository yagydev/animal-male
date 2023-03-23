import FormControl from "@mui/material/FormControl";
import { Controller } from "react-hook-form";
import { ReactNode } from "react";
import { FormHelperText, FormLabel, RadioGroup } from "@mui/material";

const ReactHookFormRadio = ({
  name,
  label,
  control,
  defaultValue,
  children,
  error,
  helperText,
  valueAsBoolean,
  ...props
}: {
  name: string;
  label: string;
  control: any;
  defaultValue?: string | number | boolean;
  children: ReactNode;
  error?: boolean;
  helperText?: string;
  valueAsBoolean?: boolean;
}) => {
  const labelId = `${name}-label`;
  return (
    <FormControl {...props} margin="normal" fullWidth size="small">
      <FormLabel id={labelId}>{label}</FormLabel>
      <Controller
        render={({ field: { onChange, ...restFields } }) => (
          <RadioGroup
            row
            {...restFields}
            aria-labelledby={`${label}-row-radio-buttons-group-label`}
            onChange={(event) => {
              if (valueAsBoolean) {
                return onChange(JSON.parse(event.target.value));
              }
              return onChange(event.target.value);
            }}
          >
            {children}
          </RadioGroup>
        )}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
      <FormHelperText error>{helperText}</FormHelperText>
    </FormControl>
  );
};
export default ReactHookFormRadio;
