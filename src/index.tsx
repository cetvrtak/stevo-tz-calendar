import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';

const App = () => {
    return (
        <div className="container">
            <h1>Hello, React with TypeScript!</h1>
        </div>
    );
};

ReactDOM.render(<App />, document.getElementById('root'));