import { FC, ReactNode } from 'react';

interface IContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  maxWidth?: number;
}

const Container: FC<IContainerProps> = ({
  children,
  className,
  maxWidth = 800,
}) => {
  return (
    <div
      className={`container mx-auto w-full p-[8px] ${className}`}
      style={{
        maxWidth: maxWidth,
      }}
    >
      {children}
    </div>
  );
};

export default Container;
