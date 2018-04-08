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
} from './material-ui/wrapper';
import { AppSelectableContainer } from './app-selectable-container';
import { decorate } from '../helper/app-style-helper';

namespace InnerScope {
    export interface Props {
        title: string;
        radioGroupProps?: AppRadioGroupProps;
        items: ItemProps[];
        onChange?: (event?: React.ChangeEvent<{}>, value?: string) => void;
        value?: string;
    }
    export interface ItemProps {
        label: string;
        value: string;
        labelProps?: Partial<AppFormControlLabelProps>;
        radioProps?: AppRadioProps;
    }
    export interface State {
        value: string;
    }
    type style = 'form-control-root';
    const style = {
        'form-control-root': {
            padding: [16, 0, 0]
        }
    };
    export const component = decorate(style)<Props>(sheet => props => (
        <AppFormControl
            component="fieldset"
            classes={{
                root: sheet.classes['form-control-root']
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
                    <AppSelectableContainer
                        key={i}
                        {...item.labelProps}
                        label={item.label}
                        value={item.value}
                        control={<AppRadio {...item.radioProps} />}
                    />
                ))}
            </AppRadioGroup>
        </AppFormControl>
    ));
}
export type AppRadioFormGroupProps = InnerScope.Props;
export const AppRadioFormGroup = InnerScope.component;
