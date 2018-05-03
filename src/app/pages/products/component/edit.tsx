import * as React from 'react';
import {
  Product,
  ProductVersion,
  Products,
} from '../../../services/products-service';
import { Selectable } from '../../../../lib/models/selectable';
import { decorate } from '../../../../lib/shared/style-helper';
import { StyledEventComponentBase } from '../../../../lib/bases/event-component-base';
import { Subscription } from 'rxjs';
import { observeWindow } from '../../../../lib/shared/window-helper';
import { dialogAction } from '../../../actions/shared/dialog-action';
import { messagesAction } from '../../../actions/shared/messages-action';
import { productsIndexAction } from '../../../actions/products/index-action';
import { Page } from '../../../components/layout/page';
import {
  AppGrid,
  AppTextField,
  AppButton,
  AppTableRow,
} from '../../../components/material-ui/wrapper';
import { RadioFormGroup } from '../../../components/form-control/radio-form-group';
import { FieldSet } from '../../../components/form-control/fieldset';
import { Adjuster } from '../../../components/layout/adjuster';
import { TableContainer } from '../../../components/table-control/table-container';
import {
  AddIcon,
  RemoveIcon,
} from '../../../components/material-ui/icon-wrapper';
import {
  HeadCellProps,
  HeadCell,
} from '../../../components/table-control/head-cell';
import { CheckedCell } from '../../../components/table-control/checked-cell';
import { Cell } from '../../../components/table-control/cell';

namespace InnerScope {
  interface Style {
    action;
    'table-action';
    status;
  }
  const style: Style = {
    action: {
      display: 'flex',
      '& button': {
        margin: 5,
      },
      '& button:first-child': {
        'margin-left': 0,
      },
      '& button:last-child': {
        'margin-right': 0,
      },
    },
    'table-action': {
      display: 'flex',
    },
    status: {},
  };
  interface Props {
    mode: 'create' | 'update' | 'detail';
    id?: number;
    hiddenHeader?: boolean;
    hiddenReturn?: boolean;
    navigationIndex?: () => void;
    navigationUpdate?: () => void;
    navigationDetail?: (id: number) => void;
  }
  interface Event {
    beforeUnload: BeforeUnloadEvent;
    sizeChange: { index: number; width: number };
    selectAll: React.ChangeEvent<HTMLInputElement>;
    selectRow: { index: number; selected: boolean };
    changeProduct: {
      name: keyof Product<Version>;
      value;
    };
    changeVersion: {
      index: number;
      name: keyof Version;
      value;
    };
    clickAdd: void;
    clickRemove: void;
    clickExecute: void;
    reset: {
      mode: 'create' | 'update' | 'detail';
      id?: number;
    };
    navigationIndex: void;
    navigationUpdate: void;
    navigationDetail: number;
    create: void;
    createCallback: void;
    update: void;
    updateCallback: void;
  }
  interface State {
    columns: number[];
    product?: Product<Version>;
    preProduct?: string;
  }
  interface Version extends ProductVersion, Selectable {}
  export const component = decorate(style)(
    class extends StyledEventComponentBase<Event, Style, Props, State> {
      public beforeUnloadSubscription: Subscription;
      constructor(props) {
        super(props);
        this.state = { columns: [50, 200, 200, 200] };
      }
      public componentWillMount() {
        if (super.componentWillMount) {
          super.componentWillMount();
        }
        this.next('reset', this.props);
      }
      public componentDidMount() {
        if (super.componentDidMount) {
          super.componentDidMount();
        }
        this.beforeUnloadSubscription = observeWindow('beforeunload').subscribe(
          e => this.next('beforeUnload', e),
        );
      }
      public componentWillUnmount() {
        if (super.componentWillUnmount) {
          super.componentWillUnmount();
        }
        this.beforeUnloadSubscription.unsubscribe();
      }
      public componentWillReceiveProps(nextProps: Props) {
        if (
          this.props.id !== nextProps.id ||
          this.props.mode !== nextProps.mode
        ) {
          this.next('reset', nextProps);
        }
      }
      protected setupObservable() {
        this.observe('beforeUnload').subscribe(e => {
          const value = this.checkChanged();
          if (value) {
            e.returnValue = value;
          }
        });
        this.observe('sizeChange').subscribe(({ index, width }) => {
          const columns = this.state.columns;
          columns[index] = width;
          this.setState({ columns });
        });
        this.observe('selectAll').subscribe(e => {
          this.state.product.productVersions.forEach(
            x => (x.isSelected = e.target.checked),
          );
          this.setState({ product: this.state.product });
        });
        this.observe('selectRow').subscribe(({ index, selected }) => {
          this.state.product.productVersions[index].isSelected = selected;
          this.setState({ product: this.state.product });
        });
        this.observe('changeProduct').subscribe(({ name, value }) => {
          this.state.product[name] = value;
          this.setState({ product: this.state.product });
        });
        this.observe('changeVersion').subscribe(({ index, name, value }) => {
          this.state.product.productVersions[index][name] = value;
          this.setState({ product: this.state.product });
        });
        this.observe('clickAdd').subscribe(() => {
          this.state.product.productVersions.push(this.createNewVersion());
          this.setState({ product: this.state.product });
        });
        this.observe('clickRemove').subscribe(() => {
          this.state.product.productVersions = this.state.product.productVersions.filter(
            x => !x.isSelected,
          );
          this.setState({ product: this.state.product });
        });
        this.observe('clickExecute').subscribe(() => {
          switch (this.mode) {
            case 'create':
              this.next('create');
              break;
            case 'update':
              this.next('update');
              break;
          }
        });
        this.observe('create').subscribe(() => {
          dialogAction.next('showYesNo', {
            title: '製品情報登録',
            text: '製品情報を登録します。よろしいですか？',
            callBack: yes => {
              if (yes) {
                this.next('createCallback');
              }
            },
          });
        });
        this.observe('createCallback').subscribe(async () => {
          const id = await Products.service.createAsync(this.state.product);
          messagesAction.next('showMessage', {
            text: '製品を登録しました。',
            level: 'info',
          });
          this.next('navigationDetail', id);
        });
        this.observe('update').subscribe(() => {
          dialogAction.next('showYesNo', {
            title: '製品情報更新',
            text: '製品情報を更新します。よろしいですか？',
            callBack: yes => {
              if (yes) {
                this.next('updateCallback');
              }
            },
          });
        });
        this.observe('updateCallback').subscribe(async () => {
          await Products.service.updateAsync(this.state.product);
          messagesAction.next('showMessage', {
            text: '製品を更新しました。',
            level: 'info',
          });
          this.next('navigationDetail', this.id);
        });
        this.observe('reset').subscribe(async ({ mode, id }) => {
          const product =
            mode === 'create'
              ? {
                  name: '',
                  price: null,
                  productId: null,
                  status: '',
                  productVersions: [this.createNewVersion()],
                }
              : await this.getAsync(id);
          if (product) {
            this.setState({
              product,
              preProduct: JSON.stringify(product),
            });
          } else {
            messagesAction.next('showMessage', {
              text: '製品が存在しません。',
              level: 'error',
            });
            this.next('navigationIndex');
          }
        });

        this.observe('navigationIndex').subscribe(() => {
          const navigate = () => {
            productsIndexAction.next('search');
            if (this.props.navigationIndex) {
              this.props.navigationIndex();
            }
          };
          const text = this.checkChanged();
          if (!text) {
            navigate();
            return;
          }
          dialogAction.next('showYesNo', {
            title: '製品情報',
            text,
            callBack: yes => {
              if (yes) {
                navigate();
              }
            },
          });
        });

        this.observe('navigationUpdate').subscribe(() => {
          if (this.props.navigationUpdate) {
            this.props.navigationUpdate();
          }
        });
        this.observe('navigationDetail').subscribe(id => {
          if (this.props.navigationDetail) {
            this.props.navigationDetail(id);
          }
        });
      }
      public checkChanged = () => {
        if (
          this.state.preProduct &&
          JSON.stringify(this.state.product) !== this.state.preProduct
        ) {
          return '変更中の情報は破棄されます。移動しますか？';
        }
      };
      public getAsync = async (id: number) => {
        const p = await Products.service.getAsync(id);
        if (!p) {
          return null;
        }
        if (p.productVersions) {
          p.productVersions = p.productVersions.map(x => {
            return Object.assign({ isSelected: false }, x);
          });
        } else {
          p.productVersions = [];
        }
        return p as Product<Version>;
      };
      public createNewVersion = (): Version => ({
        isSelected: false,
        date: '',
        version: '',
        notes: '',
        productId: null,
        productVersionId: null,
      });
      public render() {
        if (this.props.hiddenHeader) {
          return this.getElement();
        }
        return (
          <Page title={this.title} loading={!this.state.product}>
            {this.getElement()}
          </Page>
        );
      }
      public getElement = () => {
        if (!this.state.product) {
          return '';
        }
        return (
          <AppGrid container={true}>
            <AppGrid item={true} xs={12} sm={6} lg={4}>
              <AppTextField
                label="製品名"
                value={this.state.product.name}
                disabled={this.isReadOnly}
                onChange={e =>
                  this.next('changeProduct', {
                    value: e.target.value,
                    name: 'name',
                  })
                }
              />
            </AppGrid>
            <AppGrid item={true} xs={12} sm={6} lg={4}>
              <AppTextField
                type="number"
                label="価格"
                value={this.state.product.price ? this.state.product.price : ''}
                disabled={this.isReadOnly}
                onChange={e =>
                  this.next('changeProduct', {
                    value: e.target.value,
                    name: 'price',
                  })
                }
              />
            </AppGrid>
            <AppGrid item={true} xs={12} sm={6} lg={4}>
              <RadioFormGroup
                title="状態"
                value={this.state.product.status}
                onChange={(e, v) =>
                  this.next('changeProduct', {
                    value: v,
                    name: 'status',
                  })
                }
                disabled={this.isReadOnly}
                items={[
                  { label: '発売中', value: '' },
                  { label: '製造終了', value: '1' },
                ]}
              />
            </AppGrid>
            <AppGrid item={true} xs={12}>
              <FieldSet title="製品バージョン">
                {this.getVersionElement()}
              </FieldSet>
            </AppGrid>
            <AppGrid item={true} xs={12} className={this.props.classes.action}>
              {(() => {
                if (!this.props.hiddenReturn) {
                  return (
                    <Adjuster>
                      <AppButton
                        variant="raised"
                        onClick={() => this.next('navigationIndex')}
                      >
                        戻る
                      </AppButton>
                    </Adjuster>
                  );
                }
                return '';
              })()}
              {(() => {
                if (!this.isReadOnly) {
                  return (
                    <Adjuster horizontal="right">
                      <AppButton
                        variant="raised"
                        color="primary"
                        onClick={() => this.next('clickExecute')}
                      >
                        {this.executeButtonName}
                      </AppButton>
                      <AppButton
                        variant="raised"
                        color="secondary"
                        onClick={() => this.next('reset', this.props)}
                      >
                        リセット
                      </AppButton>
                    </Adjuster>
                  );
                }
                return (
                  <Adjuster horizontal="right">
                    <AppButton
                      variant="raised"
                      color="primary"
                      onClick={() => this.next('navigationUpdate')}
                    >
                      編集
                    </AppButton>
                  </Adjuster>
                );
              })()}
            </AppGrid>
          </AppGrid>
        );
      };
      public getVersionElement = () => {
        return (
          <TableContainer
            columns={this.state.columns}
            actionElement={
              this.isReadOnly ? null : this.getVersionActionElement()
            }
            headElement={this.getVersionHeadElement()}
          >
            {this.getVersionBodyElement()}
          </TableContainer>
        );
      };
      public getVersionActionElement = () => {
        return (
          <div className={this.props.classes['table-action']}>
            <AppButton
              variant="raised"
              size="small"
              color="primary"
              onClick={() => this.next('clickAdd')}
            >
              <AddIcon />
            </AppButton>
            <AppButton
              variant="raised"
              size="small"
              color="secondary"
              onClick={() => this.next('clickRemove')}
            >
              <RemoveIcon />
            </AppButton>
          </div>
        );
      };
      public getVersionHead = (
        index: number,
        name: keyof ProductVersion,
        text: string,
        props?: Partial<HeadCellProps>,
      ) => (
        <HeadCell
          {...props}
          onSizeChange={width => this.next('sizeChange', { index, width })}
          name={name}
        >
          {text}
        </HeadCell>
      );
      public getVersionHeadElement = () => (
        <AppTableRow>
          <CheckedCell
            disabled={this.isReadOnly}
            hidden={!this.state.product.productVersions.length}
            checked={this.state.product.productVersions.every(
              x => x.isSelected,
            )}
            onChange={e => this.next('selectAll', e)}
          />
          {this.getVersionHead(1, 'version', 'バージョン')}
          {this.getVersionHead(2, 'date', 'リリース日')}
          {this.getVersionHead(3, 'notes', '内容')}
        </AppTableRow>
      );
      public getVersionBodyElement = () =>
        this.state.product.productVersions.map((item, index) => {
          return (
            <AppTableRow key={index} selected={item.isSelected}>
              <CheckedCell
                checked={item.isSelected}
                disabled={this.isReadOnly}
                onChange={e =>
                  this.next('selectRow', {
                    selected: !item.isSelected,
                    index,
                  })
                }
              />
              <Cell>
                <AppTextField
                  value={item.version}
                  disabled={this.isReadOnly}
                  onChange={e =>
                    this.next('changeVersion', {
                      name: 'version',
                      index,
                      value: e.target.value,
                    })
                  }
                />
              </Cell>
              <Cell>
                <AppTextField
                  type="date"
                  value={item.date}
                  disabled={this.isReadOnly}
                  onChange={e =>
                    this.next('changeVersion', {
                      name: 'date',
                      index,
                      value: e.target.value,
                    })
                  }
                />
              </Cell>
              <Cell>
                <AppTextField
                  value={item.notes}
                  disabled={this.isReadOnly}
                  onChange={e =>
                    this.next('changeVersion', {
                      name: 'notes',
                      index,
                      value: e.target.value,
                    })
                  }
                />
              </Cell>
            </AppTableRow>
          );
        });
      get id() {
        return this.props.id;
      }
      get isReadOnly() {
        return this.mode === 'detail';
      }
      get mode() {
        return this.props.mode;
      }
      get title() {
        let mode = '';
        switch (this.mode) {
          case 'create':
            mode = '新規作成';
            break;
          case 'detail':
            mode = '詳細';
            break;
          case 'update':
            mode = '更新';
            break;
        }
        return `製品${mode}`;
      }
      get executeButtonName() {
        if (this.mode === 'create') {
          return '登録';
        }
        return '更新';
      }
    },
  );
}
export const ProductsEdit = InnerScope.component;
