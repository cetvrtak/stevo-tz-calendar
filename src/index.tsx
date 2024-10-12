import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

const App = () => {
    return (
        <div className="container">
            <div className="main">
                <h1>Исторические даты</h1>
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));