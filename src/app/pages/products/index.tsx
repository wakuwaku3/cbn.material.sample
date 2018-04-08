import * as React from 'react';
import { decorateWithStore } from '../../helper/app-style-helper';
import { productsIndexAction } from '../../actions/products/index-action';
import { AppForm } from '../../components/app-form';
import { AppFieldSet } from '../../components/app-fieldset';
import {
    AppGrid,
    AppTextField,
    AppTable,
    AppTableHead,
    AppTableRow,
    AppTableCell,
    AppTableBody,
    AppButton
} from '../../components/material-ui/wrapper';
import { Cbn } from '../../../lib/shared/cbn';
import { AppContainer } from '../../components/app-container';

namespace InnerScope {
    const styles = {};
    export const component = decorateWithStore(styles, productsIndexAction.key)(
        sheet => props => (
            <AppGrid container>
                <AppGrid item xs={12} sm={6}>
                    <AppForm title="製品一覧">
                        <AppFieldSet title="検索条件">
                            <AppGrid container>
                                <AppGrid item xs={12} sm={6} md={4}>
                                    <AppTextField
                                        label="製品名"
                                        value={
                                            productsIndexAction.model.condition
                                                .name
                                        }
                                        onChange={e => {
                                            productsIndexAction.emit('search', {
                                                name: e.target.value
                                            });
                                        }}
                                    />
                                </AppGrid>
                                <AppGrid item xs={12} sm={6} md={4}>
                                    <AppTextField
                                        label="状態"
                                        value={
                                            productsIndexAction.model.condition
                                                .status
                                        }
                                        onChange={e => {
                                            productsIndexAction.emit('search', {
                                                status: e.target.value
                                            });
                                        }}
                                    />
                                </AppGrid>
                                <AppGrid item xs={12}>
                                    <AppContainer horizontal="right">
                                        <AppButton
                                            variant="raised"
                                            color="secondary"
                                            onClick={() =>
                                                productsIndexAction.emit(
                                                    'reset'
                                                )
                                            }
                                        >
                                            リセット
                                        </AppButton>
                                    </AppContainer>
                                </AppGrid>
                            </AppGrid>
                        </AppFieldSet>
                        <AppFieldSet title="検索結果">
                            <AppTable>
                                <AppTableHead>
                                    <AppTableRow>
                                        <AppTableCell>ID</AppTableCell>
                                        <AppTableCell>製品名</AppTableCell>
                                        <AppTableCell>状態</AppTableCell>
                                        <AppTableCell numeric>
                                            価格
                                        </AppTableCell>
                                        <AppTableCell>発売日</AppTableCell>
                                    </AppTableRow>
                                </AppTableHead>
                                <AppTableBody>
                                    {productsIndexAction.model.items.map(n => {
                                        return (
                                            <AppTableRow key={n.id}>
                                                <AppTableCell>
                                                    {n.id}
                                                </AppTableCell>
                                                <AppTableCell>
                                                    {n.name}
                                                </AppTableCell>
                                                <AppTableCell>
                                                    {n.status}
                                                </AppTableCell>
                                                <AppTableCell numeric>
                                                    {n.price}
                                                </AppTableCell>
                                                <AppTableCell>
                                                    {n.releaseDate}
                                                </AppTableCell>
                                            </AppTableRow>
                                        );
                                    })}
                                </AppTableBody>
                            </AppTable>
                        </AppFieldSet>
                    </AppForm>
                </AppGrid>
                <AppGrid item xs={12} sm={6}>
                    <AppForm>
                        <AppGrid container>
                            <AppGrid item xs={12} sm={6} md={4}>
                                <AppTextField
                                    label="製品名"
                                    value={
                                        productsIndexAction.model.condition.name
                                    }
                                    onChange={e => {
                                        productsIndexAction.emit('search', {
                                            name: e.target.value
                                        });
                                    }}
                                />
                            </AppGrid>
                            <AppGrid item xs={12} sm={6} md={4}>
                                <AppTextField
                                    label="状態"
                                    value={
                                        productsIndexAction.model.condition
                                            .status
                                    }
                                    onChange={e => {
                                        productsIndexAction.emit('search', {
                                            status: e.target.value
                                        });
                                    }}
                                />
                            </AppGrid>
                            <AppGrid item xs={12}>
                                <AppContainer horizontal="right">
                                    <AppButton
                                        variant="raised"
                                        color="secondary"
                                        onClick={() =>
                                            productsIndexAction.emit('reset')
                                        }
                                    >
                                        リセット
                                    </AppButton>
                                </AppContainer>
                            </AppGrid>
                        </AppGrid>
                    </AppForm>
                </AppGrid>
            </AppGrid>
        )
    );
}
export const ProductsIndex = InnerScope.component;
