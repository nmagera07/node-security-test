import React from 'react';

import TestImage from '../images/testing.png'

const Home = (props) => {
    return ( 
        <div className="outer-container">
            <header className="home-info">
                <img src={TestImage} alt="caution testing in progress"></img>
                <h2>This application was created for testing purposes!</h2>
                <p>This application was intended to provide further learning for subjects such as:</p>
            </header>
            <main className="list-container">
                <section className="lists">
                    <ul>Front-End</ul>
                    <li>Responsive Design Concepts</li>
                    <li>Accessibility</li>
                    <li>State Management</li>
                    <li>Client-side app security</li>
                    <li>Automated Testing</li>
                    <li>Asynchronous Patterns</li>
                </section>
                <section className="lists">
                    <ul>Back-End</ul>
                    <li>Code organization and readability</li>
                    <li>When and why to use different technology</li>
                    <li>Data Validation</li>
                    <li>Error handling</li>
                    <li>Data persistence</li>
                    <li>Security</li>
                </section>
            </main>
        </div>
     );
}
 
export default Home;