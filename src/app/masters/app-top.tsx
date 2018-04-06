import * as React from 'react';
import { Link } from 'react-router-dom';
import { Cbn } from '../../lib/shared/cbn';
import {
    Divider,
    AppBar,
    MenuItem,
    Drawer,
    withStyles,
    Theme,
    Toolbar,
    WithStyles,
    Menu
} from 'material-ui';
import { AppMain } from './app-main';
import { App } from '../shared/app';
import { AppRouter } from './app-router';
import { Route } from 'react-router';
import {
    ChevronLeft,
    AccountCircle,
    Apps,
    Menu as MenuIcon
} from 'material-ui-icons';
import { LogIn } from '../components/login';
import { AuthAction } from '../actions/shared/auth-action';
import {
    AppIconButton,
    AppTypography
} from '../components/material-ui/wrapper';

export namespace AppTop {
    export const getHeight = () => {
        let theme = App.getTheme();
        return window.innerWidth >= theme.breakpoints.values.sm
            ? theme.mixins.toolbar[theme.breakpoints.up('sm')].minHeight
            : theme.mixins.toolbar.minHeight;
    };
    export const styles = (theme: Theme) => {
        return {
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
    };
    interface State {
        profile: HTMLElement;
        menu: HTMLElement;
    }
    export const component = App.decorateWithStore(styles, AuthAction.key)(
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
                                    <Toolbar className={sheet.classes.bar}>
                                        <AppIconButton.component
                                            onClick={e => {
                                                history.push(
                                                    AppRouter.homeIndex
                                                );
                                            }}
                                        >
                                            <Apps />
                                        </AppIconButton.component>
                                        <AppTypography.component
                                            variant="title"
                                            color="inherit"
                                            className={sheet.classes.title}
                                        >
                                            Title
                                        </AppTypography.component>
                                        {AuthAction.action.model
                                            .authenticated && (
                                            <div>
                                                <AppIconButton.component
                                                    aria-owns="menu-appbar"
                                                    aria-haspopup="true"
                                                    color="inherit"
                                                    onClick={e =>
                                                        this.handleOpenProfile(
                                                            e.currentTarget
                                                        )
                                                    }
                                                >
                                                    <AccountCircle />
                                                </AppIconButton.component>
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
                                                        onClick={() =>
                                                            this.handleCloseProfile()
                                                        }
                                                    >
                                                        Profile
                                                    </MenuItem>
                                                    <Divider />
                                                    <MenuItem
                                                        onClick={() => {
                                                            this.handleCloseProfile();
                                                            AuthAction.action.emitter.emit(
                                                                'logout'
                                                            );
                                                        }}
                                                    >
                                                        LogOut
                                                    </MenuItem>
                                                </Menu>
                                                <AppIconButton.component
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
                                                </AppIconButton.component>
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
                                                                AppRouter.homeAbout
                                                            );
                                                            this.handleCloseMenu();
                                                        }}
                                                    >
                                                        About
                                                    </MenuItem>
                                                </Menu>
                                            </div>
                                        )}
                                    </Toolbar>
                                </AppBar>
                            )}
                        />
                    );
                }
            }
    );
}
