import React from 'react'
import classes from './Logo.module.css'
import SmartBoardLogo from '../../assets/images/smart-board-logo.png'


const logo = (props) => (
    <div className={classes.Logo} style={{height: props.height}} onClick={props.clicked}>
        <img src={SmartBoardLogo} alt="Smart Board Logo"/>
    </div>
)

export default logo