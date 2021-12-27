import React, { Component } from 'react';
import BlockChainService from '../services/blockchain.service';
import {
    BlockComponent
} from './index';

const newBlockChain = new BlockChainService();
console.log(newBlockChain.getBlock());

class BlockChainComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: newBlockChain.getBlock(),
        }
    }

    render() {
        const listBlocks = this.state.blocks.map((item, index) => {
            return (
                <div style = {{
                    display: 'flex',
                    flexDirection: 'row'
                }} key = {index}>
                    <BlockComponent hash = {item.hash} previousHash = {item.prevHash} timestamp = {item.timeStamp}/>
                </div>
            );
        })

        return (
            <div style = {{
                display: 'flex',
                flexDirection: 'row',
                overflow: 'scroll',
                whiteSpace: 'nowrap',
                height: '450px',
                width: 'auto',
                paddingTop: '10px',
            }}>
                {listBlocks}
            </div>
        );
    }
}

export default BlockChainComponent;