import React, { Component } from 'react'
import { connect } from 'react-redux'
import {addStarred, removeStarred} from '../../store/actions'
import axios from '../../axios';
import Chart from '../../components/Chart/Chart'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import Aux from '../../hoc/Auxiliary'
import classes from './CryptoCoin.module.css'
import EmptyStar from '../../assets/icons/star-regular.svg'
import FullStar from '../../assets/icons/star-solid.svg'
import BackIcon from '../../assets/icons/back.svg'

class CryptoCoin extends Component {

    state = {
        coins: [],
        chosenCoin: {},
        coinHistory: []
    }
    async componentDidMount() {

        try {
            const coinsResponse = await axios.get('public?command=returnCurrencies')
            const coinsValuesResponse = await axios.get('public?command=returnTicker')
            const coins = Object.keys(coinsResponse.data).map(coin => {
                return ({ ...coinsResponse.data[coin], ...coinsValuesResponse.data[`USDT_${coin}`], coin })
            });
            this.setState({ coins });
            this.cleanCoinsArray();
            this.chooseCoin();
            this.requestHistory();
        } catch (error) {
            console.log(error);
        }
    }
    cleanCoinsArray() {
        let cleanedCoins = [];
        cleanedCoins = this.state.coins.filter((coin) => {
                return coin.last;
        })
        this.setState({
            coins: cleanedCoins
        })
    }

    toggleStarred(coinId){
        if(this.props.starred.includes(coinId)){
            this.props.removeStarred({coinId});
        }else{
            this.props.addStarred({coinId});
        }
    }

    chooseCoin() {
        const id = parseInt(this.props.match.params.id);
        const coin = this.state.coins.find(coin => {
            return coin.id === id 
        })
        this.setState({ chosenCoin: coin })
    }
    async requestHistory(){
        
        try{
            const coinsHistoryResponse = await axios.get(`public?command=returnChartData&currencyPair=USDT_${this.state.chosenCoin.coin}&start=1588413600&end=1591092000&period=14400`)
            this.setState({coinHistory: coinsHistoryResponse.data})
        }
        catch{
            console.log('request error')
        }
    }
    logoClickedHandler(props) {
        props.history.push({ pathname: '/' })
    }
    goBackHandler(props){
        props.history.goBack()
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
        return (
            <Aux>
                <Toolbar clicked={() => this.logoClickedHandler(this.props)} />
                <img className={classes.BackIcon} alt={'back button'} src={BackIcon} onClick={() => this.goBackHandler(this.props)}></img>
                <div className={classes.div}>
                    <img alt={'star button'} src={this.props.starred.includes(this.state.chosenCoin.id) ? FullStar : EmptyStar} onClick={() => this.toggleStarred(this.state.chosenCoin.id)} className={classes.star}></img>
                    <div className={classes.head}>
                        <img alt={'coin logo'} src={'/logos/' + this.state.chosenCoin.id + '.svg'} className={classes.logo} />
                        <h1 className={classes.title}>{this.state.chosenCoin.name}</h1>
                    </div>
                    <div className={classes.chart}>
                        <Chart  historicValues={this.state.coinHistory}/>
                    </div>
                    <p className={classes.value}> U$ {this.state.chosenCoin.last}</p>
                    <hr className={classes.divisor}></hr>
                    <div className={classes.infoContainer}>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitle}> Volume (24h)</p>
                            <p className={classes.info}> U$ {this.state.chosenCoin.baseVolume}</p>
                        </div>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitle}> variação</p>
                            <p className={classes.info}> {this.state.chosenCoin.percentChange}%</p>
                        </div>
                        <div className={classes.infoCard}>
                            <p className={classes.cardTitle}> Taxa para transação</p>
                            <p className={classes.info}>{this.state.chosenCoin.txFee} {this.state.chosenCoin.coin}</p>
                        </div>
                    </div>
                </div>
            </Aux>
        )
    }
}


const mapStateToProps = (state) => ({
    starred: state.starred.starred
})
const mapDispatchToProps = (dispatch) => ({
    addStarred: ( coinId ) => dispatch( addStarred(coinId) ),
    removeStarred: (coinId) => dispatch( removeStarred(coinId) )
})

export default connect(mapStateToProps,mapDispatchToProps)(CryptoCoin);

