import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer glass">
            <div className="footer-content">
                <div className="footer-section brand">
                    <Link to="/" className="logo">ScholarAI</Link>
                    <p>Empowering students with AI-driven scholarship matching and SOP generation.</p>
                </div>

                <div className="footer-section links">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/scholarships">Scholarships</Link></li>
                        <li><Link to="/dashboard">Dashboard</Link></li>
                    </ul>
                </div>

                <div className="footer-section links">
                    <h4>Resources</h4>
                    <ul>
                        <li><Link to="/sop">SOP Generator</Link></li>
                        <li><Link to="/matches">AI Matching</Link></li>
                        <li><Link to="/profile">My Profile</Link></li>
                    </ul>
                </div>

                <div className="footer-section social">
                    <h4>Connect</h4>
                    <div className="social-links">
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} ScholarAI. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
