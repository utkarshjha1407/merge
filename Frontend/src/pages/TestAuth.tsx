import { useState } from 'react';
import { Button } from '@/components/ui/button';

const TestAuth = () => {
  const [logs, setLogs] = useState<string[]>([]);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testDirectAuth = () => {
    addLog('Testing direct auth URL...');
    const authUrl = 'http://localhost:8080/auth/github';
    addLog(`Redirecting to: ${authUrl}`);
    window.location.href = authUrl;
  };

  const testWithEnv = () => {
    addLog('Testing with env variable...');
    const apiUrl = import.meta.env.VITE_API_URL;
    addLog(`VITE_API_URL: ${apiUrl || 'NOT SET'}`);
    const authUrl = `${apiUrl || 'http://localhost:8080'}/auth/github`;
    addLog(`Full URL: ${authUrl}`);
    window.location.href = authUrl;
  };

  const checkBackend = async () => {
    addLog('Checking backend health...');
    try {
      const response = await fetch('http://localhost:8080/auth/github', {
        method: 'GET',
        redirect: 'manual'
      });
      addLog(`Backend response status: ${response.status}`);
      addLog(`Response type: ${response.type}`);
    } catch (error: any) {
      addLog(`Error: ${error.message}`);
    }
  };

  const checkEnvVars = () => {
    addLog('Checking environment variables...');
    addLog(`VITE_API_URL: ${import.meta.env.VITE_API_URL || 'NOT SET'}`);
    addLog(`MODE: ${import.meta.env.MODE}`);
    addLog(`DEV: ${import.meta.env.DEV}`);
  };

  return (
    <div className="flex-1 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">OAuth Debug Page</h1>
        
        <div className="space-y-2">
          <Button onClick={checkEnvVars} variant="outline" className="w-full">
            Check Environment Variables
          </Button>
          <Button onClick={checkBackend} variant="outline" className="w-full">
            Check Backend Connection
          </Button>
          <Button onClick={testDirectAuth} className="w-full">
            Test Direct Auth (localhost:8080)
          </Button>
          <Button onClick={testWithEnv} className="w-full">
            Test Auth with Env Variable
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-medium mb-2">Debug Logs:</h2>
          <div className="space-y-1 font-mono text-xs">
            {logs.length === 0 ? (
              <p className="text-muted-foreground">No logs yet...</p>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="text-foreground">{log}</div>
              ))
            )}
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-4">
          <h2 className="text-sm font-medium mb-2">Expected Flow:</h2>
          <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
            <li>Click login button</li>
            <li>Redirect to: http://localhost:8080/auth/github</li>
            <li>Backend redirects to GitHub OAuth</li>
            <li>GitHub redirects back to: http://localhost:8080/auth/github/callback</li>
            <li>Backend generates JWT and redirects to: http://localhost:3000/auth/callback?token=...</li>
            <li>Frontend saves token and redirects to dashboard</li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default TestAuth;
