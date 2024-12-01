import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export type Partner = {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  width: number;
  height: number;
};

export function usePartners() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const { data, error: supabaseError } = await supabase
          .from('partners')
          .select('*')
          .order('name');

        if (supabaseError) throw supabaseError;

        setPartners(data || []);
      } catch (err) {
        console.error('Error fetching partners:', err);
        setError('Failed to load partners');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPartners();
  }, []);

  return {
    partners,
    isLoading,
    error,
  };
}
