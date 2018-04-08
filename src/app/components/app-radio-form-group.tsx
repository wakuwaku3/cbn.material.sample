import * as React from 'react';
import {
    AppRadioGroup,
    AppRadio,
    AppFormControlLabel,
    AppFormControl,
    AppFormLabel
} from './material-ui/wrapper';
import { AppStyle } from '../shared/app-style';
import { AppSelectableContainer } from './app-selectable-container';

export namespace AppRadioFormGroup {
    export interface Props {
        title: string;
        radioGroupProps?: AppRadioGroup.Props;
        items: ItemProps[];
        onChange?: (event?: React.ChangeEvent<{}>, value?: string) => void;
        value?: string;
    }
    export interface ItemProps {
        label: string;
        value: string;
        labelProps?: Partial<AppFormControlLabel.Props>;
        radioProps?: AppRadio.Props;
    }
    export interface State {
        value: string;
    }
    type style = 'form-control-root';
    const style = {
        'form-control-root': {
            padding: [16, 8, 0]
        }
    };
    export const component = AppStyle.decorate(style)<Props>(sheet => props => (
        <AppFormControl.component
            component="fieldset"
            classes={{
                root: sheet.classes['form-control-root']
            }}
        >
            <AppFormLabel.component>{props.title}</AppFormLabel.component>
            <AppRadioGroup.component
                row={true}
                {...props.radioGroupProps}
                value={props.value}
                onChange={props.onChange}
            >
                {props.items.map((item, i) => (
                    <AppSelectableContainer.component
                        key={i}
                        {...item.labelProps}
                        label={item.label}
                        value={item.value}
                        control={<AppRadio.component {...item.radioProps} />}
                    />
                ))}
            </AppRadioGroup.component>
        </AppFormControl.component>
    ));
}
