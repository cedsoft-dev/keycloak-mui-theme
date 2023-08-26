import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import kcContext from "./KcApp/kcContext";
import KcApp from "./KcApp/KcApp";
import {SnackbarProvider} from "notistack";

function renderContent() {
    const context = kcContext.kcContext;
    if (!context) {
        return <App/>
    }
    return (
        <SnackbarProvider maxSnack={3}>
            <KcApp kcContext={context}/>
        </SnackbarProvider>
    )

}

ReactDOM.render(
    <React.StrictMode>
        {renderContent()}
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
