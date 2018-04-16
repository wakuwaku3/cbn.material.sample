import * as React from 'react';
import { themeAction } from '../actions/shared/theme-action';
import { authAction } from '../actions/shared/auth-action';
import { Route, RouteComponentProps } from 'react-router';
import {
    AppBar,
    AppToolbar,
    AppIconButton,
    AppTypography,
    AppMenu,
    AppMenuItem,
    AppDivider
} from '../components/material-ui/wrapper';
import { Url } from './app-router';
import {
    AppsIcon,
    AccountCircleIcon,
    MenuIcon
} from '../components/material-ui/icon-wrapper';
import { decorate } from '../../lib/shared/style-helper';
import { withStore } from '../../lib/shared/react-frxp';
import { Theme } from 'material-ui';
import { StyledComponentBase } from '../../lib/bases/styled-component-base';

namespace InnerScope {
    export const getHeight = (theme: Theme) => {
        if (window.innerWidth >= theme.breakpoints.values.sm) {
            return theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight;
        }
        return theme.mixins.toolbar.minHeight;
    };
    interface Style {
        bar;
        title;
        menuButton;
    }
    const style: Style = {
        bar: {
            padding: 0
        },
        title: {
            flex: 1
        },
        menuButton: {
            marginLeft: -12,
            marginRight: 20
        }
    };
    interface State {
        profile: HTMLElement;
        menu: HTMLElement;
    }

    interface InnerProps {
        authenticated: boolean;
        onLogout: () => void;
    }
    const Inner = decorate(style)(
        class extends StyledComponentBase<Style, InnerProps, State> {
            constructor(props) {
                super(props);
                this.state = { profile: null, menu: null };
            }
            private handleOpenMenu(el: HTMLElement) {
                this.setState({ menu: el });
            }
            private handleCloseMenu() {
                this.setState({ menu: null });
            }
            private handleOpenProfile(el: HTMLElement) {
                this.setState({ profile: el });
            }
            private handleCloseProfile() {
                this.setState({ profile: null });
            }
            render() {
                return <Route render={this.getElement} />;
            }
            getElement = ({ history }: RouteComponentProps<{}>) => {
                return (
                    <AppBar position="static">
                        <AppToolbar className={this.props.classes.bar}>
                            <AppIconButton
                                color="inherit"
                                onClick={e => {
                                    history.push(Url.root);
                                }}
                            >
                                <AppsIcon />
                            </AppIconButton>
                            <AppTypography
                                variant="title"
                                color="inherit"
                                className={this.props.classes.title}
                            >
                                Title
                            </AppTypography>
                            {this.props.authenticated && (
                                <div>
                                    <AppIconButton
                                        aria-owns="menu-appbar"
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={e =>
                                            this.handleOpenProfile(
                                                e.currentTarget
                                            )
                                        }
                                    >
                                        <AccountCircleIcon />
                                    </AppIconButton>
                                    <AppMenu
                                        id="menu-appbar"
                                        anchorEl={this.state.profile}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        getContentAnchorEl={null}
                                        open={Boolean(this.state.profile)}
                                        onClose={() =>
                                            this.handleCloseProfile()
                                        }
                                    >
                                        <AppMenuItem
                                            onClick={() => {
                                                history.push(Url.homeSetting);
                                                this.handleCloseProfile();
                                            }}
                                        >
                                            設定
                                        </AppMenuItem>
                                        <AppDivider />
                                        <AppMenuItem
                                            onClick={() => {
                                                this.handleCloseProfile();
                                                this.props.onLogout();
                                            }}
                                        >
                                            LogOut
                                        </AppMenuItem>
                                    </AppMenu>
                                    <AppIconButton
                                        className={
                                            this.props.classes.menuButton
                                        }
                                        aria-haspopup="true"
                                        color="inherit"
                                        onClick={e =>
                                            this.handleOpenMenu(e.currentTarget)
                                        }
                                        aria-label="Menu"
                                    >
                                        <MenuIcon />
                                    </AppIconButton>
                                    <AppMenu
                                        id="menu-appbar"
                                        anchorEl={this.state.menu}
                                        anchorOrigin={{
                                            vertical: 'bottom',
                                            horizontal: 'right'
                                        }}
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right'
                                        }}
                                        getContentAnchorEl={null}
                                        open={Boolean(this.state.menu)}
                                        onClose={() => this.handleCloseMenu()}
                                    >
                                        <AppMenuItem
                                            onClick={() => {
                                                history.push(Url.homeAbout);
                                                this.handleCloseMenu();
                                            }}
                                        >
                                            About
                                        </AppMenuItem>
                                        <AppDivider />
                                        <AppMenuItem
                                            onClick={() => {
                                                history.push(Url.productsIndex);
                                                this.handleCloseMenu();
                                            }}
                                        >
                                            製品一覧
                                        </AppMenuItem>
                                    </AppMenu>
                                </div>
                            )}
                        </AppToolbar>
                    </AppBar>
                );
            };
        }
    );

    export const component = withStore(authAction)(() => (
        <Inner
            authenticated={authAction.store.authenticated}
            onLogout={() => authAction.next('logout')}
        />
    ));
}
export const getTopHeight = InnerScope.getHeight;
export const AppTop = InnerScope.component;
