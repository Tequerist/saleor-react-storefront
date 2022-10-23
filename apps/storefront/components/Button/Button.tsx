import clsx from "clsx";
import { HTMLAttributes } from "react";

const styles =
  "bg-black text-white rounded-2xl mt-4 shadow-sm py-4 px-4 text-base font-medium hover:bg-gray-700";

export type ButtonProps = Pick<HTMLAttributes<{}>, "className" | "onClick" | "children">;

export function Button({ className, ...rest }: ButtonProps) {
  /* eslint react/button-has-type: off */
  return <button className={clsx(styles, className)} {...rest} />;
}
