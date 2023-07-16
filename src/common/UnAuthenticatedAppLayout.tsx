import { ReactNode } from 'react';

type UnAuthenticatedAppLayout = {
  children: ReactNode;
};

export const UnAuthenticatedAppLayout = ({ children }: UnAuthenticatedAppLayout) => {
  return <>{children}</>;
};
