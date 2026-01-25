import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
    return (
        <div className="home-container animate-fade-in">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="hero-content glass">
                    <span className="badge">✨ Trusted by 10k+ Students</span>
                    <h1 className="text-gradient">
                        Unlock Your Future with Global Scholarships
                    </h1>
                    <p className="hero-description">
                        ScholarAI uses advanced intelligence to match your unique profile with
                        thousands of funding opportunities. Generate professional SOPs in seconds
                        and track every application in one place.
                    </p>

                    <div className="hero-btns">
                        <Link to="/register" className="btn-primary">
                            Get Started
                        </Link>
                        <Link to="/scholarships" className="btn-secondary">
                            Explore Opportunities
                        </Link>
                    </div>
                </div>
                <div className="hero-visual">
                    {/* Background image is handled in CSS as a mask/overlay */}
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats-section">
                <div className="stats-grid">
                    <div className="stat-item">
                        <h2>5,000+</h2>
                        <p>Active Scholarships</p>
                    </div>
                    <div className="stat-item">
                        <h2>$2.5B+</h2>
                        <p>Total Funding</p>
                    </div>
                    <div className="stat-item">
                        <h2>98%</h2>
                        <p>SOP Acceptance Rate</p>
                    </div>
                    <div className="stat-item">
                        <h2>24/7</h2>
                        <p>AI Assistance</p>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features-section">
                <div className="section-header">
                    <h2 className="text-gradient">Why Choose ScholarAI?</h2>
                    <p>Powerful tools designed to simplify your scholarship journey.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(129, 140, 248, 0.2)" }}>🤖</div>
                        <h3>AI Matchmaking</h3>
                        <p>Our smart algorithms analyze your GPA, major, and location to find perfect matches automatically.</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(244, 114, 182, 0.2)" }}>✍️</div>
                        <h3>SOP Generator</h3>
                        <p>Instantly generate high-quality Statements of Purpose tailored to specific scholarship requirements.</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(52, 211, 153, 0.2)" }}>📊</div>
                        <h3>Smart Dashboard</h3>
                        <p>Track your applications, deadlines, and success rates in one comprehensive, organized view.</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(251, 191, 36, 0.2)" }}>🔔</div>
                        <h3>Deadlines Alerts</h3>
                        <p>Never miss an opportunity with automated reminders for upcoming scholarship deadlines.</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(167, 139, 250, 0.2)" }}>🌍</div>
                        <h3>Global Coverage</h3>
                        <p>Access scholarships from top universities and organizations across the USA, Europe, and Asia.</p>
                    </div>
                    <div className="feature-card glass">
                        <div className="feature-icon" style={{ backgroundColor: "rgba(248, 113, 113, 0.2)" }}>🛡️</div>
                        <h3>Verified Listings</h3>
                        <p>Every scholarship is vetted by our team to ensure it's legitimate and currently active.</p>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="how-it-works">
                <div className="section-header">
                    <h2 className="text-gradient">How It Works</h2>
                    <p>Three simple steps to fund your education.</p>
                </div>
                <div className="steps-container">
                    <div className="step-card">
                        <div className="step-number">1</div>
                        <h3>Build Profile</h3>
                        <p>Enter your academic details and interests to help our AI understand you.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">2</div>
                        <h3>Find Matches</h3>
                        <p>Instantly see a curated list of scholarships you're eligible to apply for.</p>
                    </div>
                    <div className="step-card">
                        <div className="step-number">3</div>
                        <h3>Apply & Win</h3>
                        <p>Use our tools to craft the perfect application and secure your funding.</p>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="testimonials">
                <div className="section-header">
                    <h2 className="text-gradient">Success Stories</h2>
                    <p>Hear from students who achieved their dreams with us.</p>
                </div>
                <div className="testimonials-grid">
                    <div className="testimonial-card glass">
                        <p>"ScholarAI matched me with a full-ride scholarship in Germany that I never would have found on my own."</p>
                        <div className="user-profile">
                            <div className="avatar">JD</div>
                            <div>
                                <h4>James Doe</h4>
                                <span>Master's Student, Berlin</span>
                            </div>
                        </div>
                    </div>
                    <div className="testimonial-card glass">
                        <p>"The SOP generator is a life-saver! It helped me draft three distinct essays in under 10 minutes."</p>
                        <div className="user-profile">
                            <div className="avatar">SC</div>
                            <div>
                                <h4>Sarah Chen</h4>
                                <span>PhD Candidate, Stanford</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq-section">
                <div className="section-header">
                    <h2 className="text-gradient">Common Questions</h2>
                </div>
                <div className="faq-list">
                    <div className="faq-item glass">
                        <h4>Is ScholarAI free to use?</h4>
                        <p>Yes! We offer a core set of features for free to help every student get started.</p>
                    </div>
                    <div className="faq-item glass">
                        <h4>How accurate is the AI matching?</h4>
                        <p>Our AI is trained on thousands of scholarship records, ensuring over 95% match accuracy.</p>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="final-cta">
                <div className="cta-box glass">
                    <h2>Ready to Start Your Journey?</h2>
                    <p>Join thousands of students who are already using ScholarAI to find their future.</p>
                    <Link to="/register" className="btn-primary">Create Your Account Today</Link>
                </div>
            </section>
        </div>
    );
}

export default Home;

