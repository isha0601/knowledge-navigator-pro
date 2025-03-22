
import React from 'react';
import { useAtom } from 'jotai';
import { apiKeysAtom } from '../lib/apiKeys';
import Layout from '../components/Layout';
import { Key, Save, Info } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const Settings: React.FC = () => {
  const [apiKeys, setApiKeys] = useAtom(apiKeysAtom);
  
  const handleChange = (key: string, value: string) => {
    setApiKeys(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const handleSave = () => {
    // In a real app, you might want to validate the keys before saving
    toast({
      title: "Settings saved",
      description: "Your API keys have been stored for this session.",
    });
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6 animate-fade-in">
        <div className="max-w-3xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4">API Settings</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Configure your API keys to enable Omniscient's features. 
              These keys are stored locally and never sent to our servers.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Info className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
              <p className="text-sm text-blue-800 dark:text-blue-300">
                Your API keys are stored in your browser for the current session only and will be used to make requests directly from your browser.
              </p>
            </div>
            
            <div className="space-y-6">
              {Object.keys(apiKeys).map((key) => (
                <div key={key} className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Key className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="password"
                      value={apiKeys[key as keyof typeof apiKeys]}
                      onChange={(e) => handleChange(key, e.target.value)}
                      className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                      placeholder={`Enter your ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                    />
                  </div>
                </div>
              ))}
              
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors duration-200"
              >
                <Save className="mr-2 h-4 w-4" />
                Save Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
