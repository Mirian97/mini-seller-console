import type { ComponentProps, FC } from "react";

interface TitlePageProps extends ComponentProps<"div"> {
  title: string;
  description?: string;
}

export const TitlePage: FC<TitlePageProps> = ({
  title,
  description,
  className,
}) => {
  return (
    <div className={className}>
      <h1 className="text-2xl font-bold text-foreground mb-2">{title}</h1>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};
