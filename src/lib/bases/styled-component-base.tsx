import * as React from 'react';
import { StyledProps } from '../models/types';

export abstract class StyledComponentBase<
  Style,
  Props = {},
  State = {}
> extends React.Component<Props & StyledProps<Style>, State> {}
