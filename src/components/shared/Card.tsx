import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

type CardProps = {
  classname?: string;
};

const Card: React.FC<PropsWithChildren<CardProps>> = ({
  children,
  classname,
}) => {
  return (
    <div className={cn("bg-white p-8 shadow rounded m-2", classname)}>
      {children}
    </div>
  );
};

export default Card;
