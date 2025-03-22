
import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { apiKeysAtom } from '../lib/apiKeys';
import Layout from '../components/Layout';
import { askAI } from '../lib/ai';
import { BookOpen, Clock, AlarmClock, Loader2 } from 'lucide-react';

const StudyPlanner: React.FC = () => {
  const apiKeys = useAtomValue(apiKeysAtom);
  const [subject, setSubject] = useState('');
  const [hours, setHours] = useState('');
  const [plan, setPlan] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKeys.openRouterKey) {
      setPlan("Please add your OpenRouter API key in the Settings page first.");
      return;
    }
    
    if (!subject || !hours) {
      setPlan("Please enter both a subject and the number of hours you want to study.");
      return;
    }
    
    setLoading(true);
    try {
      const prompt = `Create a detailed, structured weekly study plan for ${subject} with ${hours} hours of total study time. 
      The plan should include:
      1. Learning objectives and target outcomes
      2. A daily breakdown of topics to cover
      3. Recommended resources and materials
      4. Specific learning techniques for better retention
      5. Study breaks and mental refreshers
      6. Assessment strategies to test understanding
      
      Format this as a beautiful, well-structured plan that's easy to follow.`;
      
      const response = await askAI(prompt, apiKeys.openRouterKey);
      setPlan(response);
    } catch (error) {
      console.error("Error generating study plan:", error);
      setPlan("Sorry, there was an error generating your study plan. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4">AI Study Planner</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Create a personalized study plan with DeepSeek's AI. 
              Enter your subject and available study time to get started.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              {/* Form section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject or Topic
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BookOpen className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="e.g. Organic Chemistry"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Study Hours (per week)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Clock className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        value={hours}
                        onChange={(e) => setHours(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="e.g. 10"
                        min="1"
                        required
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !subject || !hours}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Plan...
                      </>
                    ) : (
                      <>
                        <AlarmClock className="mr-2 h-4 w-4" />
                        Generate Study Plan
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* Tips section */}
              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="font-medium text-lg mb-3">Study Plan Tips</h3>
                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Be specific about your subject to get a more targeted plan</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Consider your other commitments when setting study hours</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>The AI will suggest breaks and better learning techniques</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>You can regenerate plans until you find one that works for you</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Result section */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 min-h-[500px]">
                <h2 className="text-xl font-semibold mb-4">Your Personalized Study Plan</h2>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Crafting your perfect study plan...</p>
                  </div>
                ) : plan ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line">{plan}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <BookOpen className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">Your AI-generated study plan will appear here</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Fill out the form to get started</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default StudyPlanner;
