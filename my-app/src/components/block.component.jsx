import React, { Component } from 'react';

class BlockComponent extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div style = {{
                height: '400px',
                width: '350px',
                border: 'solid 0.5px black',
                margin: '10px',
                borderRadius: '5px'
            }}>

                {/* Title div */}
                <div style = {{
                    borderBottom: 'solid 0.5px grey',
                    height: '20%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                }}>
                    <span style = {{
                        marginLeft: '10px',
                        fontSize: '25px',
                        fontWeight: 'bold',
                    }}>Block</span>
                </div>

                {/* Block information div*/}
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '28%',
                    width: 'auto',
                    borderBottom: 'solid 0.5px grey',
                    padding: '10px',
                    overflow: 'hidden',
                }}>
                    <span style = {{
                        color: '#ff1ab3',
                        fontWeight: 'bold',
                    }}>Hash</span>
                    <span>{this.props.hash}</span>

                    <span style = {{
                        color: '#00e673',
                        fontWeight: 'bold',
                    }}>Previous hash</span>
                    <span>{this.props.previousHash}</span>
                </div>

                {/* Nonce div */}
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '20%',
                    width: 'auto',
                    borderBottom: 'solid 0.5px grey',
                    padding: '10px'
                }}>
                    <span style = {{
                        fontWeight: 'bold',
                    }}>Nonce</span>
                    <span>0</span>
                </div>

                {/* Timestamp div */}
                <div style = {{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-around',
                    height: '20%',
                    width: 'auto',
                    padding: '10px'
                }}>
                    <span style = {{
                        fontWeight: 'bold',
                    }}>Timestamp</span>
                    <span>{this.props.timestamp}</span>
                </div>
            </div>
        );
    }
}

export default BlockComponent;
