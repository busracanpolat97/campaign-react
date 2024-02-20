/* eslint-disable @typescript-eslint/no-empty-function */

import { createContext } from 'react';

export interface IBaseListContext {
  refetch: any;
}

export const BaseListContext = createContext<IBaseListContext>({
  refetch: () => {},
});
