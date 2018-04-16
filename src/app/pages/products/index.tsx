import * as React from 'react';
import {
    AppButton,
    AppGrid,
    AppTextField,
    AppTableRow
} from '../../components/material-ui/wrapper';
import {
    AddIcon,
    RemoveIcon,
    RefreshIcon
} from '../../components/material-ui/icon-wrapper';
import { productsIndexAction } from '../../actions/products/index-action';
import { CheckedCell } from '../../components/table-control/checked-cell';
import {
    HeadCell,
    HeadCellProps
} from '../../components/table-control/head-cell';
import { Cell } from '../../components/table-control/cell';
import { TableContainer } from '../../components/table-control/table-container';
import { Adjuster } from '../../components/layout/adjuster';
import { Page } from '../../components/layout/page';
import { FieldSet } from '../../components/form-control/fieldset';
import {
    Products,
    ProductsIndexCondition,
    ProductsIndexItem
} from '../../services/products-service';
import { RouteComponentProps } from 'react-router';
import { Url } from '../../masters/app-router';
import { dialogAction } from '../../actions/shared/dialog-action';
import { withStore } from '../../../lib/shared/react-frxp';
import { decorate } from '../../../lib/shared/style-helper';

namespace InnerScope {
    interface Style {
        action;
    }
    const style: Style = {
        action: {
            display: 'flex'
        }
    };
    interface ActionElementProps {
        onAddClick: () => void;
    }
    const ActionElement = decorate(style)<ActionElementProps>(props => {
        let handleRemove = () => {
            let ids = productsIndexAction.store.items
                .filter(x => x.isSelected)
                .map(x => x.id);
            let text =
                ids.length + '件の製品情報を削除します。よろしいですか？';
            dialogAction.next('showYesNo', {
                title: '製品情報',
                text,
                callBack: yes => {
                    if (yes) {
                        productsIndexAction.next('remove', ids);
                    }
                }
            });
        };

        return (
            <div className={props.classes.action}>
                <AppButton
                    variant="raised"
                    size="small"
                    color="primary"
                    onClick={props.onAddClick}
                >
                    <AddIcon />
                </AppButton>
                <AppButton
                    variant="raised"
                    size="small"
                    color="secondary"
                    disabled={
                        !productsIndexAction.store.items.filter(
                            x => x.isSelected
                        ).length
                    }
                    onClick={handleRemove}
                >
                    <RemoveIcon />
                </AppButton>
                <AppButton
                    variant="raised"
                    size="small"
                    onClick={() => productsIndexAction.next('search')}
                >
                    <RefreshIcon />
                </AppButton>
            </div>
        );
    });

    interface HeadProps {
        index: number;
        name: keyof ProductsIndexItem;
        headCellProps?: Partial<HeadCellProps>;
    }
    const Head: React.SFC<HeadProps> = props => {
        return (
            <HeadCell
                {...props.headCellProps}
                sorting={productsIndexAction.store.condition.sorting}
                onSizeChange={w =>
                    productsIndexAction.next('handleSizeChange', {
                        index: props.index,
                        width: w
                    })
                }
                name={props.name}
                onSort={(e, s) =>
                    productsIndexAction.next('search', { sorting: s })
                }
            >
                {props.children}
            </HeadCell>
        );
    };
    const HeadElement: React.SFC = () => {
        return (
            <AppTableRow>
                <CheckedCell
                    hidden={!productsIndexAction.store.items.length}
                    checked={productsIndexAction.store.items.every(
                        x => x.isSelected
                    )}
                    onChange={e =>
                        productsIndexAction.next('selectAll', e.target.checked)
                    }
                />
                <Head index={1} name="id">
                    ID
                </Head>
                <Head index={2} name="name">
                    製品名
                </Head>
                <Head index={3} name="status">
                    状態
                </Head>
                <Head
                    index={4}
                    name="price"
                    headCellProps={{
                        cellProps: { numeric: true }
                    }}
                >
                    価格
                </Head>
                <Head index={5} name="latestVersion">
                    最新バージョン
                </Head>
            </AppTableRow>
        );
    };
    const FootElement: React.SFC = props => {
        return (
            <AppTableRow>
                <Cell />
                <Cell>ID</Cell>
                <Cell>製品名</Cell>
                <Cell>状態</Cell>
                <Cell numeric>価格</Cell>
                <Cell>最新バージョン</Cell>
            </AppTableRow>
        );
    };
    const SearchResult = decorate(style)<RouteComponentProps<{}>>(props => {
        return (
            <TableContainer
                columns={productsIndexAction.store.columns}
                pagination={productsIndexAction.store.condition.pagination}
                onPaging={e => {
                    productsIndexAction.next('search', {
                        pagination: e
                    });
                }}
                actionElement={
                    <ActionElement
                        onAddClick={() =>
                            props.history.push(Url.productsCreate)
                        }
                    />
                }
                headElement={<HeadElement />}
                footElement={<FootElement />}
            >
                {productsIndexAction.store.items.map(n => (
                    <AppTableRow
                        key={n.id}
                        selected={n.isSelected}
                        onDoubleClick={e =>
                            props.history.push(Url.productsDetail(n.id))
                        }
                        onClick={e => {
                            productsIndexAction.next('select', {
                                value: !n.isSelected,
                                id: n.id
                            });
                        }}
                    >
                        <CheckedCell
                            checked={n.isSelected}
                            onChange={e =>
                                productsIndexAction.next('select', {
                                    value: e.target.checked,
                                    id: n.id
                                })
                            }
                        />
                        <Cell>{n.id}</Cell>
                        <Cell>{n.name}</Cell>
                        <Cell>{n.status}</Cell>
                        <Cell numeric>{n.price}</Cell>
                        <Cell>{n.latestVersion}</Cell>
                    </AppTableRow>
                ))}
            </TableContainer>
        );
    });

    interface ConditionProps extends ProductsIndexCondition {
        onChange: <TKey extends keyof ProductsIndexCondition>(
            name: TKey,
            value: ProductsIndexCondition[TKey]
        ) => void;
        onClickReset: () => void;
    }

    const Condition: React.SFC<ConditionProps> = props => (
        <AppGrid container>
            <AppGrid item xs={12} sm={6} md={4}>
                <AppTextField
                    label="製品名"
                    value={props.name}
                    onChange={e => props.onChange('name', e.target.value)}
                />
            </AppGrid>
            <AppGrid item xs={12} sm={6} md={4}>
                <AppTextField
                    label="状態"
                    value={props.status}
                    onChange={e => props.onChange('status', e.target.value)}
                />
            </AppGrid>
            <AppGrid item xs={12}>
                <Adjuster horizontal="right">
                    <AppButton
                        variant="raised"
                        color="secondary"
                        onChange={props.onClickReset}
                    >
                        リセット
                    </AppButton>
                </Adjuster>
            </AppGrid>
        </AppGrid>
    );

    export const component = withStore(productsIndexAction)<
        RouteComponentProps<{}>
    >(props => {
        return (
            <AppGrid container>
                <AppGrid item xs={12}>
                    <Page title="製品一覧" loading={!productsIndexAction.store}>
                        <FieldSet title="検索条件" defaultExpanded={false}>
                            <Condition
                                {...productsIndexAction.store.condition}
                                onChange={(name, value) =>
                                    productsIndexAction.next('search', {
                                        [name]: value
                                    })
                                }
                                onClickReset={() =>
                                    productsIndexAction.next('reset')
                                }
                            />
                        </FieldSet>
                        <FieldSet title="検索結果">
                            <SearchResult {...props} />
                        </FieldSet>
                    </Page>
                </AppGrid>
            </AppGrid>
        );
    });
}
export const ProductsIndex = InnerScope.component;
