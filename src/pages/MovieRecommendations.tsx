
import React, { useState } from 'react';
import { Film, Search, ThumbsUp } from 'lucide-react';
import Layout from '../components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useAtom } from 'jotai';
import { apiKeysAtom } from '@/lib/apiKeys';
import { askAI } from '@/lib/ai';

interface Movie {
  title: string;
  year?: string;
  description: string;
  genres?: string[];
  rating?: string;
}

const MovieRecommendations: React.FC = () => {
  const [preferences, setPreferences] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [apiKeys] = useAtom(apiKeysAtom);
  const { toast } = useToast();
  
  const generateRecommendations = async () => {
    if (!preferences.trim()) {
      toast({
        title: "Error",
        description: "Please enter your movie preferences",
        variant: "destructive",
      });
      return;
    }

    if (!apiKeys.openRouterKey) {
      toast({
        title: "API Key Missing",
        description: "Please add your OpenRouter API key in Settings",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const prompt = `Based on these preferences: "${preferences}", recommend 5 movies. Format your response as a JSON array with objects having these properties: title, year, description, genres (array), rating. ONLY return the JSON array, nothing else.`;
      
      const response = await askAI(prompt, apiKeys.openRouterKey);
      
      // Try to parse the response as JSON
      try {
        // Extract JSON from the response if it's wrapped in backticks or has extra text
        const jsonMatch = response.match(/\[\s*\{.*\}\s*\]/s);
        const jsonString = jsonMatch ? jsonMatch[0] : response;
        const parsedMovies = JSON.parse(jsonString);
        
        if (Array.isArray(parsedMovies) && parsedMovies.length > 0) {
          setMovies(parsedMovies);
        } else {
          throw new Error("Invalid response format");
        }
      } catch (jsonError) {
        console.error("Failed to parse AI response as JSON:", jsonError);
        toast({
          title: "Format Error",
          description: "Could not parse the AI response. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error getting recommendations:", error);
      toast({
        title: "Error",
        description: "Failed to get movie recommendations. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getMoviePoster = (title: string, year?: string) => {
    // This would ideally be replaced with a real movie API
    // For now we'll use a placeholder image with the movie title
    const searchTerm = `${title} ${year || ''}`.trim();
    return `https://via.placeholder.com/300x450.png?text=${encodeURIComponent(searchTerm)}`;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <Film className="inline-block mr-2 h-8 w-8" /> 
              AI Movie Recommendations
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Tell us what movies you like, and our AI will suggest films you might enjoy.
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>What kind of movies do you like?</CardTitle>
              <CardDescription>
                Describe your preferences, favorite genres, actors, directors, or any specific themes you enjoy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Textarea 
                  placeholder="For example: I enjoy sci-fi movies with philosophical themes like Blade Runner. I also like comedies directed by Wes Anderson and thrillers from the 90s."
                  value={preferences}
                  onChange={(e) => setPreferences(e.target.value)}
                  className="min-h-[120px]"
                />
                <Button 
                  onClick={generateRecommendations} 
                  className="w-full"
                  disabled={isLoading || preferences.trim() === ''}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2">Finding Movies</span>
                      <span className="animate-pulse">...</span>
                    </>
                  ) : (
                    <>
                      <Search className="mr-2 h-4 w-4" />
                      Get Recommendations
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {movies.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Recommended Movies</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map((movie, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div className="aspect-[2/3] relative bg-gray-100 dark:bg-gray-800">
                      <img 
                        src={getMoviePoster(movie.title, movie.year)} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-xl">
                        {movie.title} {movie.year && <span className="text-gray-500">({movie.year})</span>}
                      </CardTitle>
                      {movie.rating && (
                        <div className="flex items-center text-yellow-500">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          <span>{movie.rating}</span>
                        </div>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-2">{movie.description}</p>
                      {movie.genres && movie.genres.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {movie.genres.map((genre, idx) => (
                            <span key={idx} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                              {genre}
                            </span>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default MovieRecommendations;
