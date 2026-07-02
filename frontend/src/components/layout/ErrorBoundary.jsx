import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0B0B0F', color: '#F5F5F7', padding: '20px', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', marginBottom: '1rem', color: '#EF4444' }}>Oops! Something went wrong.</h1>
          <p style={{ color: '#9CA3AF', marginBottom: '2rem', maxWidth: '500px', lineHeight: '1.6' }}>
            We are sorry, but an unexpected error has occurred in the application. Please try refreshing the page.
          </p>
          <button 
            onClick={() => window.location.href = '/'} 
            style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem' }}
          >
            Back to Home
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
