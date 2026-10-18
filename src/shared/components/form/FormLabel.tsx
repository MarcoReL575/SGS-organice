import { clsx } from "cn";
import { LabelHTMLAttributes } from "react"

type Props = LabelHTMLAttributes<HTMLLabelElement>;

export function FormLabel(props: Props) {
  return (
    <label {...props} 
      className={clsx('mb-1', props.className)}
    >
      {props.children}
    </label>
  )
}
