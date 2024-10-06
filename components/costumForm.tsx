import React from "react";
import { FormControl, FormField, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Control, FieldPath, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { string, z } from "zod";
import { authFormSchema } from "@/lib/utils";

  // 1. Define your form.

const formSchema = authFormSchema('sign-up')

  interface customInputFiled {
    control : Control<z.infer<typeof formSchema>>,
    name : FieldPath<z.infer<typeof formSchema>>,
    label : string,
    placeholder : string,
    type : string
  }

const CustomFiled = ({control, name ,label,placeholder,type = "text"} : customInputFiled)=>{
      
    return (                
    <FormField
        control={control}
        name={name}
        render={({ field }) => (
            <div className="form-item">
                <FormLabel className="form-label">
                    {label}
                </FormLabel>
                <div className="flex flex-col w-full">
                    <FormControl>
                        <Input
                        placeholder={placeholder}
                        type={type}
                        className="input-class"{...field}/>
                    </FormControl>
                    <FormMessage className="form-message mt-2"/>
                </div>
            </div>
        )}
        />)
}
export default CustomFiled