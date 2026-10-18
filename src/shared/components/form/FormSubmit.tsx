import { ButtonHTMLAttributes } from "react"
import { Button } from "../ui/button";
import { clsx } from "cn";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

export function FormSubmit(props: Props) {
  return (
    <Button
        type="submit"
        variant={'ghost'}
        className={clsx('bg-green-500 flex items-center justify-center gap-x-2 py-2 text-white text-lg w-full font-bold capitalize rounded-lg cursor-pointer hover:bg-green-400', props.className)}
    >
        {props.children}
    </Button>
  )
}
