import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useHandleAuthCallback } from '@/lib/hooks/useAuth';
import { Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleAuthCallback = useHandleAuthCallback();
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<string[]>([]);

  const addDebug = (msg: string) => {
    setDebug(prev => [...prev, `${new Date().toLocaleTimeString()}: ${msg}`]);
  };

  useEffect(() => {
    const token = searchParams.get('token');
    const errorParam = searchParams.get('error');
    
    addDebug('AuthCallback mounted');
    addDebug(`Token present: ${!!token}`);
    addDebug(`Error param: ${errorParam || 'none'}`);
    
    if (errorParam) {
      setError(`Authentication failed: ${errorParam}`);
      return;
    }
    
    if (token) {
      try {
        addDebug(`Token length: ${token.length}`);
        addDebug('Saving token to localStorage...');
        localStorage.setItem('auth_token', token);
        addDebug('Token saved successfully');
        
        const saved = localStorage.getItem('auth_token');
        addDebug(`Verification - Token in storage: ${!!saved}`);
        
        addDebug('Calling handleAuthCallback...');
        handleAuthCallback(token);
        addDebug('Redirecting to dashboard...');
      } catch (err: any) {
        addDebug(`Error: ${err.message}`);
        setError(`Failed to process token: ${err.message}`);
      }
    } else {
      addDebug('No token found in URL');
      setError('No token received from authentication');
    }
  }, [searchParams, navigate, handleAuthCallback]);

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="text-center space-y-4 max-w-2xl">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
          <div>
            <h2 className="text-xl font-bold mb-2">Authentication Error</h2>
            <p className="text-muted-foreground text-sm mb-4">{error}</p>
          </div>
          
          <div className="bg-card border border-border rounded-lg p-4 text-left">
            <h3 className="text-sm font-medium mb-2">Debug Log:</h3>
            <div className="space-y-1 font-mono text-xs text-muted-foreground">
              {debug.map((log, i) => (
                <div key={i}>{log}</div>
              ))}
            </div>
          </div>
          
          <Button onClick={() => navigate('/')} variant="outline">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center space-y-4 max-w-2xl">
        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
        <p className="text-muted-foreground">Completing authentication...</p>
        
        <div className="bg-card border border-border rounded-lg p-4 text-left">
          <h3 className="text-sm font-medium mb-2">Debug Log:</h3>
          <div className="space-y-1 font-mono text-xs text-muted-foreground">
            {debug.map((log, i) => (
              <div key={i}>{log}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthCallback;
