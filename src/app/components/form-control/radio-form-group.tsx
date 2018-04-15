import * as React from 'react';
import {
    AppRadioGroup,
    AppRadio,
    AppFormControlLabel,
    AppFormControl,
    AppFormLabel,
    AppRadioGroupProps,
    AppFormControlLabelProps,
    AppRadioProps
} from '../material-ui/wrapper';
import { SelectableContainer } from './selectable-container';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
    export interface Props {
        title: string;
        radioGroupProps?: AppRadioGroupProps;
        items: ItemProps[];
        onChange?: (event?: React.ChangeEvent<{}>, value?: string) => void;
        value?: string;
        disabled?: boolean;
    }
    export interface ItemProps {
        label: string;
        value: string;
        disabled?: boolean;
        labelProps?: Partial<AppFormControlLabelProps>;
        radioProps?: AppRadioProps;
    }
    export interface State {
        value: string;
    }
    interface Style {
        'form-control-root';
    }
    const style: Style = {
        'form-control-root': {
            padding: [16, 0, 0],
            display: 'flex'
        }
    };
    export const component = decorate(style)<Props>(props => (
        <AppFormControl
            component="fieldset"
            classes={{
                root: props.classes['form-control-root']
            }}
        >
            <AppFormLabel>{props.title}</AppFormLabel>
            <AppRadioGroup
                row={true}
                {...props.radioGroupProps}
                value={props.value}
                onChange={props.onChange}
            >
                {props.items.map((item, i) => (
                    <SelectableContainer
                        key={i}
                        {...item.labelProps}
                        label={item.label}
                        value={item.value}
                        disabled={item.disabled || props.disabled}
                        control={<AppRadio {...item.radioProps} />}
                    />
                ))}
            </AppRadioGroup>
        </AppFormControl>
    ));
}
export type RadioFormGroupProps = InnerScope.Props;
export const RadioFormGroup = InnerScope.component;
