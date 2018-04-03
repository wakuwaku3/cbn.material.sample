import * as React from 'react';
import { Link } from 'react-router-dom';
import { Cbn } from '../../lib/shared/cbn';
import {
    AppBar,
    IconMenu,
    IconButton,
    MenuItem,
    IconMenuProps,
    RaisedButton,
    Drawer,
    MenuItemProps
} from 'material-ui';
import { AppMain } from './app-main';
import { App } from '../shared/app';
import { AppRouter } from './app-router';
import { Route } from 'react-router';
import { MenuItemLink } from '../../lib/components/mui/menu-item-link';
import {
    NavigationChevronLeft,
    NavigationChevronRight,
    NavigationClose,
    NavigationMenu,
    NavigationMoreVert
} from 'material-ui/svg-icons';

export namespace AppTop {
    const barColor = App.getTheme().appBar.textColor;
    const styles = {
        bar: {}
    };
    const classes = Cbn.Jss.attachStyles(styles);
    interface MenuOption {
        isLeft: boolean;
        onClick?: React.MouseEventHandler<{}>;
    }
    const getMenuItems = (option: MenuOption) => [
        <MenuItem
            primaryText="Home"
            key={Cbn.getKey()}
            leftIcon={option.isLeft ? null : <NavigationChevronLeft />}
            rightIcon={option.isLeft ? <NavigationChevronRight /> : null}
            menuItems={[
                <MenuItemLink.component
                    key={Cbn.getKey()}
                    primaryText="Index"
                    url={AppRouter.homeIndex}
                    onClick={option.onClick}
                />,
                <MenuItemLink.component
                    key={Cbn.getKey()}
                    primaryText="About"
                    url={AppRouter.homeAbout}
                    onClick={option.onClick}
                />
            ]}
        />,
        <MenuItem
            primaryText="Products"
            key={Cbn.getKey()}
            leftIcon={option.isLeft ? null : <NavigationChevronLeft />}
            rightIcon={option.isLeft ? <NavigationChevronRight /> : null}
            menuItems={[
                <MenuItemLink.component
                    key={Cbn.getKey()}
                    primaryText="一覧"
                    url={AppRouter.productsIndex}
                    onClick={option.onClick}
                />
            ]}
        />,
        <MenuItem
            key={Cbn.getKey()}
            primaryText="Refresh"
            insetChildren={!option.isLeft}
            onClick={option.onClick}
        />
    ];
    interface LeftProps extends LeftState {}
    interface LeftState {
        isOpen: boolean;
    }
    class Left extends React.Component<LeftProps, LeftState> {
        constructor(props) {
            super(props);
            this.state = { ...props };
        }
        handleToggle = () => this.setState({ isOpen: !this.state.isOpen });
        handleClose = () => this.setState({ isOpen: false });
        render() {
            return (
                <div>
                    <IconButton
                        onClick={this.handleToggle}
                        className={classes['left-button']}
                    >
                        {this.state.isOpen ? (
                            <NavigationClose color={barColor} />
                        ) : (
                            <NavigationMenu color={barColor} />
                        )}
                    </IconButton>
                    <Drawer
                        docked={false}
                        open={this.state.isOpen}
                        overlayClassName={classes.bar}
                        onRequestChange={isOpen => this.setState({ isOpen })}
                    >
                        {getMenuItems({
                            isLeft: true,
                            onClick: this.handleClose
                        })}
                    </Drawer>
                </div>
            );
        }
    }
    const Right = () => (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <NavigationMoreVert color={barColor} />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            {getMenuItems({ isLeft: false })}
        </IconMenu>
    );
    Right['muiName'] = 'IconMenu';
    export const component = () => (
        <AppBar
            title="Title"
            className={classes.bar}
            iconElementLeft={<Left isOpen={false} />}
            iconElementRight={<Right />}
        />
    );
}
