import * as React from 'react';
import {
  AppTypography,
  AppFormControl,
  AppSelect,
  AppMenuItem,
  AppIconButton,
} from '../material-ui/wrapper';
import {
  FirstPageIcon,
  KeyboardArrowLeftIcon,
  KeyboardArrowRightIcon,
  LastPageIcon,
} from '../material-ui/icon-wrapper';
import { Pagination } from '../../../lib/models/pagination';
import { Theme } from 'material-ui';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
  export interface Style {
    root;
    display;
    text;
    'button-container';
  }
  const style = (theme: Theme): Style => ({
    root: {
      display: 'flex',
      'align-items': 'center',
      [theme.breakpoints.down('sm')]: {
        'overflow-x': 'auto',
      },
    },
    display: {
      'margin-left': 10,
      'min-width': 60,
    },
    text: {
      'margin-left': 10,
      'white-space': 'nowrap',
    },
    'button-container': {
      display: 'flex',
    },
  });
  export interface Props {
    pagination: Pagination;
    onChange: (pagination: Pagination) => void;
    rowsPerPage?: number[];
  }
  export const component = decorate(style)<Props>(props => {
    const getlastPage = () =>
      Math.ceil(props.pagination.total / props.pagination.display) - 1;
    const getdescription = () => {
      const { total, display, current } = props.pagination;
      const start = display * current + 1;
      let end = display * (current + 1);
      if (end > total) {
        end = total;
      }
      return `${total}件中 ${start} ~ ${end} 件表示`;
    };
    const handleChange = (pagination: Partial<Pagination>) => {
      const p = Object.assign({}, props.pagination, pagination);
      props.onChange(p);
    };
    return (
      <div className={props.classes.root}>
        <AppTypography className={props.classes.text}>表示件数</AppTypography>
        <AppFormControl className={props.classes.display}>
          <AppSelect
            value={props.pagination.display}
            onChange={e => {
              handleChange({
                display: Number(e.target.value),
              });
            }}
          >
            {props.rowsPerPage.map(x => (
              <AppMenuItem key={x} value={x}>
                {x}
              </AppMenuItem>
            ))}
          </AppSelect>
        </AppFormControl>
        <AppTypography className={props.classes.text}>
          {getdescription()}
        </AppTypography>
        <div className={props.classes['button-container']}>
          <AppIconButton
            onClick={e =>
              handleChange({
                current: 0,
              })
            }
            disabled={props.pagination.current === 0}
          >
            {<FirstPageIcon />}
          </AppIconButton>
          <AppIconButton
            onClick={e =>
              handleChange({
                current: props.pagination.current - 1,
              })
            }
            disabled={props.pagination.current === 0}
          >
            {<KeyboardArrowLeftIcon />}
          </AppIconButton>
          <AppIconButton
            onClick={e =>
              handleChange({
                current: props.pagination.current + 1,
              })
            }
            disabled={props.pagination.current >= getlastPage()}
          >
            {<KeyboardArrowRightIcon />}
          </AppIconButton>
          <AppIconButton
            onClick={e =>
              handleChange({
                current: getlastPage(),
              })
            }
            disabled={props.pagination.current >= getlastPage()}
          >
            {<LastPageIcon />}
          </AppIconButton>
        </div>
      </div>
    );
  });
  component.defaultProps = {
    rowsPerPage: [5, 10, 25, 100],
  };
}
export type PagerProps = InnerScope.Props;
export const Pager = InnerScope.component;
