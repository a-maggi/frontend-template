import React from "react";

export interface HeadingProps {
  title: string | JSX.Element;
  subtitle?: string | JSX.Element;
}

export const Heading: React.FC<HeadingProps> = (props) => {
  const { title, subtitle } = props;
  return (
    <div className="flex flex-col items-start justify-center w-full">
      <h2 className="text-2xl dark:text-primary-foreground leading-tight md:text-3xl lg:leading-[1.1] md:block">
        {title}
      </h2>
      {subtitle && <div className="my-4 text-xl text-muted-foreground sm:text-2xl">{subtitle}</div>}
    </div>
  );
};

export default Heading;
