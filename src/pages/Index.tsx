
import React from 'react';
import { Brain, FileText, UserPlus, Trophy, Youtube, BookOpen } from 'lucide-react';
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import FeatureCard from '../components/FeatureCard';

const Index: React.FC = () => {
  const features = [
    {
      title: "AI-Powered Study Plans",
      description: "Get personalized study plans created by DeepSeek R1, with intelligent scheduling based on your goals.",
      icon: <Brain className="w-6 h-6" />,
      delay: 0
    },
    {
      title: "PDF & Presentation Notes",
      description: "Upload study materials and get AI-enhanced notes, summaries, and key points automatically.",
      icon: <FileText className="w-6 h-6" />,
      delay: 100
    },
    {
      title: "YouTube Video Learning",
      description: "Extract knowledge from educational videos with AI-generated transcripts and summaries.",
      icon: <Youtube className="w-6 h-6" />,
      delay: 200
    },
    {
      title: "Interactive Quizzes",
      description: "Test your knowledge with personalized quizzes generated from your study materials.",
      icon: <BookOpen className="w-6 h-6" />,
      delay: 300
    },
    {
      title: "Study Groups",
      description: "Connect with study partners through Discord integration for collaborative learning.",
      icon: <UserPlus className="w-6 h-6" />,
      delay: 400
    },
    {
      title: "Gamified Learning",
      description: "Earn XP, unlock achievements, and track your progress with Habitica integration.",
      icon: <Trophy className="w-6 h-6" />,
      delay: 500
    }
  ];

  return (
    <Layout>
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 md:py-24 px-6 relative overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">Powerful Tools for Effective Learning</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 animate-fade-in" style={{ animationDelay: '100ms' }}>
              Omniscient combines cutting-edge AI with proven learning techniques to help you master any subject efficiently.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                delay={feature.delay}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary/5 py-16 md:py-24 px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl font-bold mb-6 animate-fade-in">Ready to Transform Your Study Habits?</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '100ms' }}>
                Set up your AI-powered study environment today and experience a more effective way to learn and retain information.
              </p>
              <a 
                href="/settings" 
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary rounded-lg shadow-lg hover:bg-primary/90 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: '200ms' }}
              >
                Configure Your Settings
              </a>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
