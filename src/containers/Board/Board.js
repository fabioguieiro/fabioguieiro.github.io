import React, { Component } from 'react';
import axios from '../../axios'; 

import { connect } from 'react-redux'
import Aux from '../../hoc/Auxiliary';
import Table from '../../components/Table/Table';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import classes from './Board.module.css';



class Board extends Component {
    state = {
        coins: [],
        search: "",
        paginationIndex: 0
    }
    async componentDidMount() { //loads the data from the endpoints
        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies');
            const coinsValuesResponse = await axios.get('public?command=returnTicker');
            const coins = Object.keys(coinsResponse.data).map(coin => {
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`] })
            });
            this.setState({ coins });
            this.cleanCoinsArray();
            this.orderCoins();
            this.sliceContent(0);
        } catch (error) {
            console.log(error)
        }
    }
    cleanCoinsArray() { //Removes the coins that not have a pair with USDT. 
        let cleanedCoins = [];
        this.state.coins.map((coin) => {
            if (coin.last) {
                const twoDecimals = (coin.last.length - 6);    //finds out the number of characters that the string must have
                coin.last = coin.last.slice(0, twoDecimals);   //slices the string so I can show just 2 decimal numbers 
                coin.percentChange = coin.percentChange.slice(0, 4); //slices the string so I can show just 2 decimal numbers
                if(coin.percentChange.includes("-")) 
                    coin.negativeChange=true;
                else 
                    coin.negativeChange=false;
                cleanedCoins.push(coin);
            }
            return coin;
        })
        this.setState({
            coins: cleanedCoins
        })
    }

    orderCoins() { //Orders the array, so the most valuable coins are shown first  
        let auxCoins = this.state.coins;
        auxCoins.sort((a, b) => { return b.last - a.last });
        this.setState({ coins: auxCoins });
    }
    sliceContent(number){ //slices the content for pagination 
        const base = number * 20;
        const floor = base + 20;
        return this.state.coins.slice(base, floor);
    }
    createPagination(){ //creates the pagination buttons
        let numberOfPages = Math.ceil(this.state.coins.length /20);
        let pages = [];
        for(let i = 1;i <= numberOfPages; i++)
            pages.push(i);
        let pagination = pages.map((page,index) => {
            return <button 
                        className={ this.state.paginationIndex === index ? classes.selected : classes.button}
                        key={index} 
                        onClick={() => {this.setState({paginationIndex: index})}}> { page }
                    </button>
        })
        return pagination;
    }
    render() {
        
        if (this.state.coins.length === 0) {
            return (
                <Aux>
                    <Toolbar />
                    <div className={classes.center}>
                        <div className={classes.loader}></div>
                    </div>
                </Aux>
            )
        }
        const paginatedContent = this.sliceContent(this.state.paginationIndex)
        return (
            <Aux>
                <Toolbar />
                <Table coins={paginatedContent} history={this.props.history} />
                <div className={classes.buttonContainer}>
                    {this.createPagination()}
                </div>
            </Aux>
        )
    }
}

const mapStateToProps = (state) => ({
    starred: state.starred.starred
})

export default connect(mapStateToProps,null)(Board);

