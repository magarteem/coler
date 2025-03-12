import s from "./title.module.scss";
import cn from "classnames";

interface Props {
  text: string;
  classNamesContainer?: string;
  fs?: number;
  fw?: number;
  lh?: number;
}

export const Title = ({ text, fs, fw, classNamesContainer }: Props) => {
  const style = {
    fontSize: `${fs}px`,
    fontWeight: `${fw}`,
  };

  return (
    <h4 style={{ ...style }} className={cn(s.title, classNamesContainer)}>
      {text}
    </h4>
  );
};
