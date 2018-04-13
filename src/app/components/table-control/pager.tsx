import * as React from 'react';
import { themeAction } from '../../actions/shared/theme-action';
import { decorate } from '../../helper/app-style-helper';
import {
    AppTypography,
    AppFormControl,
    AppSelect,
    AppMenuItem,
    AppIconButton
} from '../material-ui/wrapper';
import {
    FirstPageIcon,
    KeyboardArrowLeftIcon,
    KeyboardArrowRightIcon,
    LastPageIcon
} from '../material-ui/icon-wrapper';
import { Pagination } from '../../../lib/models/pagination';

namespace InnerScope {
    export interface Style {
        root;
        display;
        text;
        'button-container';
    }
    const style: Style = {
        root: themeAction.getThemeObservable().map(theme => ({
            display: 'flex',
            'align-items': 'center',
            [theme.breakpoints.down('sm')]: {
                'overflow-x': 'auto'
            }
        })),
        display: {
            'margin-left': 10,
            'min-width': 60
        },
        text: {
            'margin-left': 10,
            'white-space': 'nowrap'
        },
        'button-container': {
            display: 'flex'
        }
    };
    export interface Props {
        pagination: Pagination;
        onChange: (pagination: Pagination) => void;
        rowsPerPage?: number[];
    }
    export const component = decorate(style)<Props>(sheet => props => {
        let getlastPage = () =>
            Math.ceil(props.pagination.total / props.pagination.display) - 1;
        let getdescription = () => {
            let { total, display, current } = props.pagination;
            let start = display * current + 1;
            let end = display * (current + 1);
            if (end > total) end = total;
            return `${total}件中 ${start} ~ ${end} 件表示`;
        };
        let handleChange = (pagination: Partial<Pagination>) => {
            let p = Object.assign({}, props.pagination, pagination);
            props.onChange(p);
        };
        return (
            <div className={sheet.classes.root}>
                <AppTypography className={sheet.classes.text}>
                    表示件数
                </AppTypography>
                <AppFormControl className={sheet.classes.display}>
                    <AppSelect
                        value={props.pagination.display}
                        onChange={e => {
                            handleChange({
                                display: Number(e.target.value)
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
                <AppTypography className={sheet.classes.text}>
                    {getdescription()}
                </AppTypography>
                <div className={sheet.classes['button-container']}>
                    <AppIconButton
                        onClick={e =>
                            handleChange({
                                current: 0
                            })
                        }
                        disabled={props.pagination.current === 0}
                    >
                        {<FirstPageIcon />}
                    </AppIconButton>
                    <AppIconButton
                        onClick={e =>
                            handleChange({
                                current: props.pagination.current - 1
                            })
                        }
                        disabled={props.pagination.current === 0}
                    >
                        {<KeyboardArrowLeftIcon />}
                    </AppIconButton>
                    <AppIconButton
                        onClick={e =>
                            handleChange({
                                current: props.pagination.current + 1
                            })
                        }
                        disabled={props.pagination.current >= getlastPage()}
                    >
                        {<KeyboardArrowRightIcon />}
                    </AppIconButton>
                    <AppIconButton
                        onClick={e =>
                            handleChange({
                                current: getlastPage()
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
        rowsPerPage: [5, 10, 25, 100]
    };
}
export type PagerProps = InnerScope.Props;
export const Pager = InnerScope.component;
