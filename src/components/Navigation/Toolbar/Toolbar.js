import React from 'react'
import Logo from '../../Logo/Logo'
import classes from './Toolbar.module.css'

const toolbar = (props) => (
    <header className={classes.Toolbar}>
        <div className={classes.Logo}>
            <Logo clicked={props.clicked} height="200%"/>
        </div>
        <nav className={classes.DesktopOnly}></nav>
    </header> 
)

export default toolbar