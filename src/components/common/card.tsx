import React from 'react';

export interface ICardProps extends React.PropsWithChildren {
  title?: string | React.ReactNode;
}

export function Card(props: ICardProps) {
  const { title, children } = props;

  return (
    <div className="border border-grey-700 rounded-md bg-primary max-w-[1080px] mx-auto">
      {title && (
        <div className="border-b border-grey-700 px-12 py-5">{title}</div>
      )}
      <div className="px-12 py-5">{children}</div>
    </div>
  );
}
