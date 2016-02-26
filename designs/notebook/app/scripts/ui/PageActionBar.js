import React from 'react';
import AppBar from 'material-ui/lib/app-bar';
import IconButton from 'material-ui/lib/icon-button';
import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import MenuItem from 'material-ui/lib/menus/menu-item';

export default class PageActionBar extends React.Component {
  render (){
    return (
      <AppBar
        title={this.props.title}
        style={this.props.titleStyle}
        iconElementLeft={<IconButton disabled={(this.props.close!==undefined&&this.props.close==false)} onClick={this.props.onClose}><NavigationClose /></IconButton>}
        iconElementRight={
          (this.props.children!==undefined?<IconMenu
            desktop={true}
            iconButtonElement={
              <IconButton><MoreVertIcon /></IconButton>
            }
            targetOrigin={{horizontal: 'right', vertical: 'top'}}
            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
          >
            {this.props.children}
          </IconMenu>:null)
        }
      />
    );
  }
}
