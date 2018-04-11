import * as React from 'react';
import { RadioFormGroup } from './app-radio-form-group';
import { getColors, Color } from '../../models/shared/color';
import { decorate } from '../../helper/app-style-helper';

namespace InnerScope {
    const getItems = (classes: object) =>
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

    export const component = decorate(style)<Props>(sheet => props => {
        let handleChange = (e, v) => {
            props.onChange(e, v);
        };
        return (
            <RadioFormGroup
                title={props.title}
                value={props.value.toString()}
                onChange={handleChange}
                items={getItems(sheet.classes)}
            />
        );
    });
}
export type ColorPaletteProps = InnerScope.Props;
export const ColorPalette = InnerScope.component;
