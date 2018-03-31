import * as React from 'react';
import { Link } from 'react-router-dom';
import { Cbn } from '../../lib/shared/cbn';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import CloseIcon from 'material-ui/svg-icons//navigation/close';
import {
    AppBar,
    IconMenu,
    IconButton,
    MenuItem,
    IconMenuProps,
    RaisedButton,
    Drawer
} from 'material-ui';
import { AppMain } from './app-main';
import { App } from '../shared/app';
import { AppRouter } from './app-router';

export namespace AppTop {
    const getTheme = () => App.theme;
    const getBarColor = () => App.theme.appBar.textColor;
    const styles = {
        bar: {}
    };
    const classes = Cbn.Jss.attachStyles(styles);
    const MenuItems = () => (
        <div>
            <MenuItem
                primaryText="Home"
                containerElement={<Link to={AppRouter.homeIndex} />}
            />
            <MenuItem
                primaryText="About"
                containerElement={<Link to={AppRouter.homeAbout} />}
            />
            <MenuItem primaryText="Refresh" />
        </div>
    );
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
        render() {
            let theme = getTheme();
            return (
                <div>
                    <IconButton
                        onClick={this.handleToggle}
                        className={classes['left-button']}
                    >
                        {this.state.isOpen ? (
                            <CloseIcon color={getBarColor()} />
                        ) : (
                            <MenuIcon color={getBarColor()} />
                        )}
                    </IconButton>
                    <Drawer
                        docked={false}
                        open={this.state.isOpen}
                        overlayClassName={classes.bar}
                        onRequestChange={isOpen => this.setState({ isOpen })}
                    >
                        <MenuItems />
                    </Drawer>
                </div>
            );
        }
    }
    const Right = () => (
        <IconMenu
            iconButtonElement={
                <IconButton>
                    <MoreVertIcon color={getBarColor()} />
                </IconButton>
            }
            targetOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
            <MenuItems />
        </IconMenu>
    );

    export const component = () => (
        <AppBar
            title="Title"
            className={classes.bar}
            iconElementLeft={<Left isOpen={false} />}
            iconElementRight={<Right />}
        />
    );
}
