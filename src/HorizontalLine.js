import React, { Component } from 'react';

class ColoredLine extends Component {
    render() {

        return (
            <div>
                <hr
                    style={{
                        color: 'red',
                        backgroundColor: 'red',
                        height: 5
                    }}
                />
            </div>);
    }
}


export default ColoredLine;