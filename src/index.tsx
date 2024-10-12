import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import YearCircle from '../components/YearCircle';

const App = () => {
    return (
        <div className="container">
            <div className="main">
                <h1>Исторические даты</h1>
                <YearCircle fromYear={2009} toYear={2015} />
            </div>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));