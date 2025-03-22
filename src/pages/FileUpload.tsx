
import React, { useState } from 'react';
import { useAtomValue } from 'jotai';
import { apiKeysAtom } from '../lib/apiKeys';
import Layout from '../components/Layout';
import { Upload, FileText, File, Loader2, Youtube } from 'lucide-react';

const FileUpload: React.FC = () => {
  const apiKeys = useAtomValue(apiKeysAtom);
  const [file, setFile] = useState<File | null>(null);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleFileUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    if (!apiKeys.supabaseUrl || !apiKeys.supabaseAnonKey) {
      setNotes("Please add your Supabase API keys in the Settings page first.");
      return;
    }
    
    setLoading(true);
    try {
      // This is a mockup of file processing - in a real app, we'd extract text and use AI
      setTimeout(() => {
        setNotes(`Notes extracted from ${file.name}:\n\n` + 
          "This would contain AI-processed notes from your document. In a real implementation, we would:\n\n" +
          "1. Extract text from your PDF or PPTX\n" +
          "2. Use AI to generate summary notes\n" +
          "3. Create structured study materials\n" +
          "4. Generate practice questions\n\n" +
          "For now, this is a placeholder to show the UI flow."
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing file:", error);
      setNotes("Sorry, there was an error processing your file. Please try again later.");
      setLoading(false);
    }
  };
  
  const handleYoutubeProcess = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!youtubeUrl) return;
    
    if (!apiKeys.youtubeApiKey) {
      setNotes("Please add your YouTube API key in the Settings page first.");
      return;
    }
    
    setLoading(true);
    try {
      // This is a mockup of YouTube processing - in a real app, we'd get the transcript and use AI
      setTimeout(() => {
        setNotes(`Notes extracted from YouTube video (${youtubeUrl}):\n\n` + 
          "This would contain AI-processed notes from the video transcript. In a real implementation, we would:\n\n" +
          "1. Extract the transcript from the YouTube video\n" +
          "2. Use AI to generate summary notes\n" +
          "3. Create structured study materials\n" +
          "4. Highlight key concepts and timestamps\n\n" +
          "For now, this is a placeholder to show the UI flow."
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Error processing YouTube video:", error);
      setNotes("Sorry, there was an error processing your YouTube video. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto py-12 px-6 animate-fade-in">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h1 className="text-3xl font-bold mb-4">Smart Notes Generator</h1>
            <p className="text-gray-600 dark:text-gray-300">
              Upload study materials or YouTube videos to generate AI-enhanced notes and study guides.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-1 space-y-6">
              {/* File upload section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-medium mb-4">Document Upload</h2>
                <form onSubmit={handleFileUpload} className="space-y-4">
                  <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      id="file-upload"
                      className="hidden"
                      accept=".pdf,.pptx,.ppt,.docx,.doc"
                      onChange={handleFileChange}
                    />
                    <label 
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center justify-center space-y-2"
                    >
                      <Upload className="h-8 w-8 text-gray-400" />
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        PDF, PPTX, DOCX (Max 10MB)
                      </span>
                    </label>
                  </div>
                  
                  {file && (
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex items-center">
                      <FileText className="h-5 w-5 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-700 dark:text-gray-300 truncate">
                        {file.name}
                      </span>
                    </div>
                  )}
                  
                  <button
                    type="submit"
                    disabled={loading || !file}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <File className="mr-2 h-4 w-4" />
                        Process Document
                      </>
                    )}
                  </button>
                </form>
              </div>
              
              {/* YouTube section */}
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700">
                <h2 className="text-lg font-medium mb-4">YouTube Video</h2>
                <form onSubmit={handleYoutubeProcess} className="space-y-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      YouTube URL
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Youtube className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        value={youtubeUrl}
                        onChange={(e) => setYoutubeUrl(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                        placeholder="https://www.youtube.com/watch?v=..."
                      />
                    </div>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading || !youtubeUrl}
                    className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Youtube className="mr-2 h-4 w-4" />
                        Process Video
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
            
            {/* Result section */}
            <div className="md:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-100 dark:border-gray-700 min-h-[500px]">
                <h2 className="text-xl font-semibold mb-4">Generated Notes</h2>
                
                {loading ? (
                  <div className="flex flex-col items-center justify-center h-[400px]">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-gray-500 dark:text-gray-400">Processing your content...</p>
                  </div>
                ) : notes ? (
                  <div className="prose dark:prose-invert max-w-none">
                    <div className="whitespace-pre-line">{notes}</div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-[400px] text-center">
                    <FileText className="h-16 w-16 text-gray-300 dark:text-gray-600 mb-4" />
                    <p className="text-gray-500 dark:text-gray-400 mb-2">Your AI-generated notes will appear here</p>
                    <p className="text-sm text-gray-400 dark:text-gray-500">Upload a document or enter a YouTube URL to get started</p>
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

export default FileUpload;
