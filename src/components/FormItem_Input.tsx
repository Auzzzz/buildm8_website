import type { Control } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Textarea } from "~/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "~/components/ui/select";

interface FormItemInputProps {
  control: Control
  name: string;
  label?: string;
  placeholder: string;
  type?: string;
  description?: string;
  className?: string;
  inputClassname?: string;
  disabled?: boolean;
  options?: { value: string; label: string }[];
}

export function FormItem_Input({
  control,
  name,
  label,
  placeholder,
  type,
  description,
  className,
  inputClassname,
  disabled,
  options,
}: FormItemInputProps) {
  return (
   <div className={className}>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              {type === "select" ? (
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={disabled}>
                  <SelectTrigger className={inputClassname}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : type === "textarea" ? (
                <Textarea
                  className={inputClassname}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
              ) : (
                <Input
                  className={inputClassname}
                  type={type}
                  placeholder={placeholder}
                  {...field}
                  disabled={disabled}
                />
              )}
            </FormControl>
            <FormMessage />
            {description && <FormDescription>{description}</FormDescription>}
          </FormItem>
        )}
      />
    </div>
);
}