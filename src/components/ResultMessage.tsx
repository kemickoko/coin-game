import React from 'react';

type Props = {
  message: string | null;
};

export const ResultMessage: React.FC<Props> = ({ message }) =>
  message ? <p className="mt-3 text-center font-semibold">{message}</p> : null;