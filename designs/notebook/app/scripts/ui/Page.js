var React = window.React = require('react'),
    Codemirror = require('react-codemirror');


var Page = React.createClass({

    getInitialState: function() {
        return {
            code: this.props.page.content
        };
    },
    updateCode: function(newCode) {
        this.setState({
            code: newCode
        });
    },
    render: function() {
        var options = {
          lineNumbers:true
        };
        return (
            <div className="page">
                <b>Page
                    {this.props.pageIndex}</b>
                <Codemirror value={this.state.code} onChange={this.updateCode} options={options}/>
            </div>
          );
    }
});

module.exports = Page;
