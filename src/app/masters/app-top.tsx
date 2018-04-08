import * as React from 'react';
import { themeAction } from '../actions/shared/theme-action';
import { decorateWithStore } from '../helper/app-style-helper';
import { authAction } from '../actions/shared/auth-action';
import { Route } from 'react-router';
import {
    AppBar,
    AppToolbar,
    AppIconButton,
    AppTypography
} from '../components/material-ui/wrapper';
import { Url } from './app-router';
import {
    AppsIcon,
    AccountCircleIcon,
    MenuIcon
} from '../components/material-ui/icon-wrapper';
import { Menu, MenuItem, Divider } from 'material-ui';

namespace InnerScope {
    export const getHeight = () => {
        const theme = themeAction.theme;
        if (window.innerWidth >= theme.breakpoints.values.sm) {
            return theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight;
        }
        return theme.mixins.toolbar.minHeight;
    };
    const styles = {
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
    export const component = decorateWithStore(styles, authAction.key)(
        sheet =>
            class extends React.Component<{}, State> {
                constructor(props: {}) {
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
                    return (
                        <Route
                            render={({ history, location }) => (
                                <AppBar position="static">
                                    <AppToolbar className={sheet.classes.bar}>
                                        <AppIconButton
                                            color="inherit"
                                            onClick={e => {
                                                history.push(Url.homeIndex);
                                            }}
                                        >
                                            <AppsIcon />
                                        </AppIconButton>
                                        <AppTypography
                                            variant="title"
                                            color="inherit"
                                            className={sheet.classes.title}
                                        >
                                            Title
                                        </AppTypography>
                                        {authAction.model.authenticated && (
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
                                                <Menu
                                                    id="menu-appbar"
                                                    anchorEl={
                                                        this.state.profile
                                                    }
                                                    anchorOrigin={{
                                                        vertical: 'bottom',
                                                        horizontal: 'right'
                                                    }}
                                                    transformOrigin={{
                                                        vertical: 'top',
                                                        horizontal: 'right'
                                                    }}
                                                    getContentAnchorEl={null}
                                                    open={Boolean(
                                                        this.state.profile
                                                    )}
                                                    onClose={() =>
                                                        this.handleCloseProfile()
                                                    }
                                                >
                                                    <MenuItem
                                                        onClick={() => {
                                                            history.push(
                                                                Url.homeSetting
                                                            );
                                                            this.handleCloseProfile();
                                                        }}
                                                    >
                                                        設定
                                                    </MenuItem>
                                                    <Divider />
                                                    <MenuItem
                                                        onClick={() => {
                                                            this.handleCloseProfile();
                                                            authAction.emit(
                                                                'logout'
                                                            );
                                                        }}
                                                    >
                                                        LogOut
                                                    </MenuItem>
                                                </Menu>
                                                <AppIconButton
                                                    className={
                                                        sheet.classes.menuButton
                                                    }
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={e =>
                                                        this.handleOpenMenu(
                                                            e.currentTarget
                                                        )
                                                    }
                                                    aria-label="Menu"
                                                >
                                                    <MenuIcon />
                                                </AppIconButton>
                                                <Menu
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
                                                    open={Boolean(
                                                        this.state.menu
                                                    )}
                                                    onClose={() =>
                                                        this.handleCloseMenu()
                                                    }
                                                >
                                                    <MenuItem
                                                        onClick={() => {
                                                            history.push(
                                                                Url.homeAbout
                                                            );
                                                            this.handleCloseMenu();
                                                        }}
                                                    >
                                                        About
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        )}
                                    </AppToolbar>
                                </AppBar>
                            )}
                        />
                    );
                }
            }
    );
}
export const getTopHeight = InnerScope.getHeight;
export const AppTop = InnerScope.component;
