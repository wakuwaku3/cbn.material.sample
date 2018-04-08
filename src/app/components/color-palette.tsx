import * as React from 'react';
import { getColors, Color } from '../shared/models/color';
import { AppStyle } from '../shared/app-style';
import { AppRadioFormGroup } from './app-radio-form-group';

export namespace ColorPalette {
    export const getItems = (classes: object) =>
        getColors().map(item => {
            return {
                label: item.name,
                value: item.key,
                labelProps: {
                    classes: {
                        label: classes[item.name]
                    }
                },
                radioProps: {
                    classes: {
                        checked: classes[item.name],
                        default: classes[item.name]
                    }
                }
            };
        });
    const style = (() => {
        let obj = {};
        getColors().forEach(item => {
            obj[item.name] = {
                color: item.color['500']
            };
        });
        return obj;
    })();
    export interface Props {
        title: string;
        value?: Color;
        onChange?: (event?: React.ChangeEvent<{}>, value?: Color) => void;
    }

    export const component = AppStyle.decorate(style)<Props>(sheet => props => {
        let handleChange = (e, v) => {
            props.onChange(e, v);
        };
        return (
            <AppRadioFormGroup.component
                title={props.title}
                value={props.value.toString()}
                onChange={handleChange}
                items={getItems(sheet.classes)}
            />
        );
    });
}
