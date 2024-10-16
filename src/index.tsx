import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import YearCircle from '../components/YearCircle';

const App = () => {
    return (
        <div className="container">
            <YearCircle />
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));