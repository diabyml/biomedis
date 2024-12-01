import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  designation: string;
  company: string;
  image_url: string;
  rating: number;
  is_featured: boolean;
  order_index: number;
};

type UseTestimonialsOptions = {
  featuredOnly?: boolean;
  limit?: number;
};

export function useTestimonials(options: UseTestimonialsOptions = {}) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        let query = supabase
          .from('testimonials')
          .select('*')
          .order('order_index');

        if (options.featuredOnly) {
          query = query.eq('is_featured', true);
        }

        if (options.limit) {
          query = query.limit(options.limit);
        }

        const { data, error: supabaseError } = await query;

        if (supabaseError) throw supabaseError;

        setTestimonials(data || []);
      } catch (err) {
        console.error('Error fetching testimonials:', err);
        setError('Failed to load testimonials');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, [options.featuredOnly, options.limit]);

  return {
    testimonials,
    isLoading,
    error,
  };
}
