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
import { Textarea } from "~/components/ui/textarea"

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
}: FormItemInputProps) {
  return (
   <div className={className}>
   <FormField
   control={control}
   name={name}
   render={({ field }) => (
     // removed className={className}
     type === "textarea" ? (
       <FormItem>
         {label && <FormLabel>{label}</FormLabel>}
         <FormControl>
           <Textarea
             className={inputClassname}
             placeholder={placeholder}
             {...field}
             disabled={disabled}
           />
         </FormControl>
         <FormMessage />
         {description && <FormDescription>{description}</FormDescription>}
       </FormItem>
     ) : (
       <FormItem>
         {label && <FormLabel>{label}</FormLabel>}
         <FormControl>
           <Input
             className={inputClassname}
             type={type}
             placeholder={placeholder}
             {...field}
             disabled={disabled}
           />
         </FormControl>
         <FormMessage />
         {description && <FormDescription>{description}</FormDescription>}
       </FormItem>
     )
   )}
 />
 </div>
);
}