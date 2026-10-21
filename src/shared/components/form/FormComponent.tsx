import { clsx } from "cn";
import { FormHTMLAttributes } from "react"

type Props = FormHTMLAttributes<HTMLFormElement>;

export function FormComponent(props: Props) {
  return (
    <form
        {...props}
        className={clsx('space-y-4 container mx-auto max-w-lg', props.className)}
    >
        {props.children}
    </form>
  )
}
