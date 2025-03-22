
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-[-50%] left-[-10%] w-[70%] h-[140%] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-30%] right-[-5%] w-[50%] h-[100%] bg-blue-500/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-6 py-16 md:py-28 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block mb-4 px-4 py-1.5 bg-primary/10 text-primary font-medium rounded-full text-sm animate-fade-in">
            Revolutionize Your Learning Experience
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-balance animate-slide-up">
            Master Any Subject with AI-Powered Study Tools
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto text-balance animate-slide-up" style={{ animationDelay: '100ms' }}>
            Omniscient combines AI, gamification, and proven learning methods to help you study smarter, retain more information, and achieve academic excellence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '200ms' }}>
            <Link
              to="/study-planner"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 group"
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link
              to="/file-upload"
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary bg-white border border-primary/20 rounded-lg shadow-sm hover:bg-primary/5 transition-all duration-300"
            >
              Upload Files
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
