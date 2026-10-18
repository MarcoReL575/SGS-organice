import { clsx } from "cn";
import { FormHTMLAttributes } from "react"

type Props = FormHTMLAttributes<HTMLFormElement>;

export function FormComponent(props: Props) {
  return (
    <form
        {...props}
        className={clsx('mt-10 space-y-6 container mx-auto max-w-lg', props.className)}
    >
        {props.children}
    </form>
  )
}
