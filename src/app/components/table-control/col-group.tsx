import * as React from 'react';

namespace InnerScope {
  export interface Props {
    columns?: number[];
  }
  export const component: React.SFC<Props> = props => (
    <colgroup>
      {props.columns.map((c, i) => <col key={i} width={c} />)}
    </colgroup>
  );
}
export type ColGroupProps = InnerScope.Props;
export const ColGroup = InnerScope.component;
