// import * as React from 'react';
// import { RouteComponentProps } from 'react-router';
// import { decorate } from '../../helper/app-style-helper';
// import { WithStyles, TableRow } from 'material-ui';
// import { Cbn } from '../../../lib/shared/cbn';
// import { Product, ProductVersion } from '../../models/actions/products';
// import { Page } from '../../components/layout/page';
// import {
//     AppGrid,
//     AppButton,
//     AppTextField,
//     AppSelect,
//     AppInputLabel,
//     AppInput,
//     AppMenuItem,
//     AppFormControl
// } from '../../components/material-ui/wrapper';
// import { FieldSet } from '../../components/form-control/fieldset';
// import { TableContainer } from '../../components/table-control/table-container';
// import { AddIcon, RemoveIcon } from '../../components/material-ui/icon-wrapper';
// import {
//     HeadCellProps,
//     HeadCell
// } from '../../components/table-control/head-cell';
// import { CheckedCell } from '../../components/table-control/checked-cell';
// import { Selectable } from '../../../lib/models/selectable';
// import { Cell } from '../../components/table-control/cell';
// import { RadioFormGroup } from '../../components/form-control/radio-form-group';
// import { Adjuster, AdjusterProps } from '../../components/layout/adjuster';
// import { Products } from '../../services/products-service';
// import { messagesAction } from '../../actions/shared/messages-action';
// import { Url } from '../../masters/app-router';
// import { productsIndexAction } from '../../actions/products/index-action';
// import { dialogAction } from '../../actions/shared/dialog-action';
// import { Subscription } from 'rxjs';

// namespace InnerScope {
//     interface Style {
//         action;
//         'table-action';
//         status;
//     }
//     const style: Style = {
//         action: {
//             display: 'flex',
//             '& button': {
//                 margin: 5
//             },
//             '& button:first-child': {
//                 'margin-left': 0
//             },
//             '& button:last-child': {
//                 'margin-right': 0
//             }
//         },
//         'table-action': {
//             display: 'flex'
//         },
//         status: {}
//     };
//     interface RouteParams {
//         mode: 'create' | 'update' | 'detail';
//         id?: string;
//     }
//     interface Props {}
//     interface Event {
//         initialize: RouteParams;
//     }
//     interface State {
//         columns: number[];
//         product?: Product<Version>;
//         preProduct?: string;
//     }
//     interface Version extends ProductVersion, Selectable {}

//     export const component = decorate(style)(
//         sheet =>
//             class extends React.Component<
//                 Props & RouteComponentProps<RouteParams>,
//                 State
//             > {
//                 beforeUnloadSubscription: Subscription;
//                 constructor(props) {
//                     super(props);
//                     this.state = { columns: [50, 200, 200, 200] };
//                 }
//                 componentWillMount() {
//                     this.handleClickReset();
//                 }
//                 componentDidMount() {
//                     this.beforeUnloadSubscription = Cbn.Window.observe(
//                         'beforeunload'
//                     ).subscribe(this.handleBeforeUnload);
//                 }
//                 componentWillUnmount() {
//                     this.beforeUnloadSubscription.unsubscribe();
//                 }
//                 handleBeforeUnload = e => {
//                     let value = this.checkChanged();
//                     if (value) {
//                         e.returnValue = value;
//                     }
//                 };
//                 checkChanged = () => {
//                     if (
//                         this.state.preProduct &&
//                         JSON.stringify(this.state.product) !==
//                             this.state.preProduct
//                     ) {
//                         return '変更中の情報は破棄されます。移動しますか？';
//                     }
//                 };
//                 handleSizeChange = (index: number) => (width: number) => {
//                     let columns = this.state.columns;
//                     columns[index] = width;
//                     this.setState({ columns });
//                 };
//                 handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
//                     this.state.product.productVersions.forEach(
//                         x => (x.isSelected = e.target.checked)
//                     );
//                     this.setState({ product: this.state.product });
//                 };
//                 handleSelectRow = (v: boolean, i: number) => () => {
//                     this.state.product.productVersions[i].isSelected = v;
//                     this.setState({ product: this.state.product });
//                 };
//                 handleChangeProduct = (name: keyof Product<Version>) => (
//                     e: React.ChangeEvent<HTMLInputElement>
//                 ) => {
//                     this.state.product[name] = e.target.value;
//                     this.setState({ product: this.state.product });
//                 };
//                 handleChangeVersion = (name: keyof Version, i: number) => (
//                     e: React.ChangeEvent<HTMLInputElement>
//                 ) => {
//                     this.state.product.productVersions[i][name] =
//                         e.target.value;
//                     this.setState({ product: this.state.product });
//                 };
//                 handleClickAdd = () => {
//                     this.state.product.productVersions.push(
//                         this.createNewVersion()
//                     );
//                     this.setState({ product: this.state.product });
//                 };
//                 handleClickRemove = () => {
//                     this.state.product.productVersions = this.state.product.productVersions.filter(
//                         x => !x.isSelected
//                     );
//                     this.setState({ product: this.state.product });
//                 };
//                 handleClickExecute = async () => {
//                     switch (this.mode) {
//                         case 'create':
//                             dialogAction.emit('showYesNo', {
//                                 title: '製品情報登録',
//                                 text: '製品情報を登録します。よろしいですか？',
//                                 callBack: async yes => {
//                                     if (yes) {
//                                         await Products.service.createAsync(
//                                             this.state.product
//                                         );
//                                         messagesAction.emit('showMessage', {
//                                             text: '製品を登録しました。',
//                                             level: 'info'
//                                         });
//                                         this.handleNavigationDetail();
//                                     }
//                                 }
//                             });
//                             break;
//                         case 'update':
//                             dialogAction.emit('showYesNo', {
//                                 title: '製品情報更新',
//                                 text: '製品情報を更新します。よろしいですか？',
//                                 callBack: async yes => {
//                                     if (yes) {
//                                         await Products.service.updateAsync(
//                                             this.state.product
//                                         );
//                                         messagesAction.emit('showMessage', {
//                                             text: '製品を更新しました。',
//                                             level: 'info'
//                                         });
//                                         this.handleNavigationDetail();
//                                     }
//                                 }
//                             });
//                             break;
//                     }
//                 };
//                 handleClickReset = async () => {
//                     let product =
//                         this.mode === 'create'
//                             ? {
//                                   name: '',
//                                   price: null,
//                                   productId: null,
//                                   status: '',
//                                   productVersions: [this.createNewVersion()]
//                               }
//                             : await this.getAsync();
//                     if (product) {
//                         this.setState({
//                             product,
//                             preProduct: JSON.stringify(product)
//                         });
//                     } else {
//                         messagesAction.emit('showMessage', {
//                             text: '製品が存在しません。',
//                             level: 'error'
//                         });
//                         this.handleNavigationIndex();
//                     }
//                 };
//                 getAsync = async () => {
//                     let p = await Products.service.getAsync(this.id);
//                     if (!p) {
//                         return null;
//                     }
//                     if (p.productVersions) {
//                         p.productVersions = p.productVersions.map(x => {
//                             return Object.assign({ isSelected: false }, x);
//                         });
//                     } else {
//                         p.productVersions = [];
//                     }
//                     return p as Product<Version>;
//                 };
//                 handleNavigationIndex = () => {
//                     let navigate = () => {
//                         productsIndexAction.emit('search');
//                         this.props.history.push(Url.productsIndex);
//                     };
//                     let text = this.checkChanged();
//                     if (!text) {
//                         navigate();
//                         return;
//                     }
//                     dialogAction.emit('showYesNo', {
//                         title: '製品情報',
//                         text,
//                         callBack: yes => {
//                             if (yes) {
//                                 navigate();
//                             }
//                         }
//                     });
//                 };
//                 handleNavigationUpdate = () => {
//                     this.props.history.push(Url.productsUpdate(this.id));
//                 };
//                 handleNavigationDetail = () => {
//                     this.props.history.push(Url.productsDetail(this.id));
//                 };
//                 createNewVersion = (): Version => ({
//                     isSelected: false,
//                     date: '',
//                     version: '',
//                     notes: '',
//                     productId: null,
//                     productVersionId: null
//                 });
//                 render() {
//                     return (
//                         <Page title={this.title} loading={!this.state.product}>
//                             {this.getElement()}
//                         </Page>
//                     );
//                 }
//                 getElement = () => {
//                     if (!this.state.product) {
//                         return '';
//                     }
//                     return (
//                         <AppGrid container>
//                             <AppGrid item xs={12} sm={6} lg={4}>
//                                 <AppTextField
//                                     label="製品名"
//                                     value={this.state.product.name}
//                                     disabled={this.isReadOnly}
//                                     onChange={this.handleChangeProduct('name')}
//                                 />
//                             </AppGrid>
//                             <AppGrid item xs={12} sm={6} lg={4}>
//                                 <AppTextField
//                                     type="number"
//                                     label="価格"
//                                     value={
//                                         this.state.product.price
//                                             ? this.state.product.price
//                                             : ''
//                                     }
//                                     disabled={this.isReadOnly}
//                                     onChange={this.handleChangeProduct('price')}
//                                 />
//                             </AppGrid>
//                             <AppGrid item xs={12} sm={6} lg={4}>
//                                 <RadioFormGroup
//                                     title="状態"
//                                     value={this.state.product.status}
//                                     onChange={this.handleChangeProduct(
//                                         'status'
//                                     )}
//                                     disabled={this.isReadOnly}
//                                     items={[
//                                         { label: '発売中', value: '' },
//                                         { label: '製造終了', value: '1' }
//                                     ]}
//                                 />
//                             </AppGrid>
//                             <AppGrid item xs={12}>
//                                 <FieldSet title="製品バージョン">
//                                     {this.getVersionElement()}
//                                 </FieldSet>
//                             </AppGrid>
//                             <AppGrid
//                                 item
//                                 xs={12}
//                                 className={sheet.classes.action}
//                             >
//                                 <Adjuster>
//                                     <AppButton
//                                         variant="raised"
//                                         onClick={this.handleNavigationIndex}
//                                     >
//                                         戻る
//                                     </AppButton>
//                                 </Adjuster>
//                                 {(() => {
//                                     if (!this.isReadOnly) {
//                                         return (
//                                             <Adjuster horizontal="right">
//                                                 <AppButton
//                                                     variant="raised"
//                                                     color="primary"
//                                                     onClick={
//                                                         this.handleClickExecute
//                                                     }
//                                                 >
//                                                     {this.executeButtonName}
//                                                 </AppButton>
//                                                 <AppButton
//                                                     variant="raised"
//                                                     color="secondary"
//                                                     onClick={
//                                                         this.handleClickReset
//                                                     }
//                                                 >
//                                                     リセット
//                                                 </AppButton>
//                                             </Adjuster>
//                                         );
//                                     }
//                                     return (
//                                         <Adjuster horizontal="right">
//                                             <AppButton
//                                                 variant="raised"
//                                                 color="primary"
//                                                 onClick={
//                                                     this.handleNavigationUpdate
//                                                 }
//                                             >
//                                                 編集
//                                             </AppButton>
//                                         </Adjuster>
//                                     );
//                                 })()}
//                             </AppGrid>
//                         </AppGrid>
//                     );
//                 };
//                 getVersionElement = () => {
//                     return (
//                         <TableContainer
//                             columns={this.state.columns}
//                             actionElement={
//                                 this.isReadOnly
//                                     ? null
//                                     : this.getVersionActionElement()
//                             }
//                             headElement={this.getVersionHeadElement()}
//                         >
//                             {this.getVersionBodyElement()}
//                         </TableContainer>
//                     );
//                 };
//                 getVersionActionElement = () => {
//                     return (
//                         <div className={sheet.classes['table-action']}>
//                             <AppButton
//                                 variant="raised"
//                                 size="small"
//                                 color="primary"
//                                 onClick={this.handleClickAdd}
//                             >
//                                 <AddIcon />
//                             </AppButton>
//                             <AppButton
//                                 variant="raised"
//                                 size="small"
//                                 color="secondary"
//                                 onClick={this.handleClickRemove}
//                             >
//                                 <RemoveIcon />
//                             </AppButton>
//                         </div>
//                     );
//                 };
//                 getVersionHead = (
//                     index: number,
//                     name: keyof ProductVersion,
//                     text: string,
//                     props?: Partial<HeadCellProps>
//                 ) => (
//                     <HeadCell
//                         {...props}
//                         onSizeChange={this.handleSizeChange(index)}
//                         name={name}
//                     >
//                         {text}
//                     </HeadCell>
//                 );
//                 getVersionHeadElement = () => (
//                     <TableRow>
//                         <CheckedCell
//                             disabled={this.isReadOnly}
//                             hidden={!this.state.product.productVersions.length}
//                             checked={this.state.product.productVersions.every(
//                                 x => x.isSelected
//                             )}
//                             onChange={this.handleSelectAll}
//                         />
//                         {this.getVersionHead(1, 'version', 'バージョン')}
//                         {this.getVersionHead(2, 'date', 'リリース日')}
//                         {this.getVersionHead(3, 'notes', '内容')}
//                     </TableRow>
//                 );
//                 getVersionBodyElement = () =>
//                     this.state.product.productVersions.map((item, i) => {
//                         return (
//                             <TableRow key={i} selected={item.isSelected}>
//                                 <CheckedCell
//                                     checked={item.isSelected}
//                                     disabled={this.isReadOnly}
//                                     onChange={this.handleSelectRow(
//                                         !item.isSelected,
//                                         i
//                                     )}
//                                 />
//                                 <Cell>
//                                     <AppTextField
//                                         value={item.version}
//                                         disabled={this.isReadOnly}
//                                         onChange={this.handleChangeVersion(
//                                             'version',
//                                             i
//                                         )}
//                                     />
//                                 </Cell>
//                                 <Cell>
//                                     <AppTextField
//                                         type="date"
//                                         value={item.date}
//                                         disabled={this.isReadOnly}
//                                         onChange={this.handleChangeVersion(
//                                             'date',
//                                             i
//                                         )}
//                                     />
//                                 </Cell>
//                                 <Cell>
//                                     <AppTextField
//                                         value={item.notes}
//                                         disabled={this.isReadOnly}
//                                         onChange={this.handleChangeVersion(
//                                             'notes',
//                                             i
//                                         )}
//                                     />
//                                 </Cell>
//                             </TableRow>
//                         );
//                     });
//                 get id() {
//                     return Number(this.routeParams.id);
//                 }
//                 get isReadOnly() {
//                     return this.mode === 'detail';
//                 }
//                 get routeParams() {
//                     return this.props.match.params;
//                 }
//                 get mode() {
//                     return this.routeParams.mode;
//                 }
//                 get title() {
//                     let mode = '';
//                     switch (this.mode) {
//                         case 'create':
//                             mode = '新規作成';
//                             break;
//                         case 'detail':
//                             mode = '詳細';
//                             break;
//                         case 'update':
//                             mode = '更新';
//                             break;
//                     }
//                     return `製品${mode}`;
//                 }
//                 get executeButtonName() {
//                     if (this.mode === 'create') {
//                         return '登録';
//                     }
//                     return '更新';
//                 }
//             }
//     );
// }
// export const ProductsEdit = InnerScope.component;
