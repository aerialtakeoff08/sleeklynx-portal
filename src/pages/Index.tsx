
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Redirecting to Dashboard...</h1>
        <p className="text-xl text-gray-600">Please wait, or click <a href="/dashboard" className="text-crm-primary">here</a> if you are not redirected automatically.</p>
      </div>
    </div>
  );
};

export default Index;
