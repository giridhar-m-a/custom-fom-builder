import { supabase } from '@/lib/supabase';
import { FormDetails } from '@/Types';

interface response {
  data: FormDetails[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
  count: number;
  status: number;
  statusText: string;
}
const getFormBySlug = async (
  slug: string,
): Promise<response> => {
  try {
    const formData = await supabase
      .from('forms')
      .select('*')
      .eq('slug', slug)
      .order('created_at', { ascending: false });
    return formData as response;
  } catch (err) {
    return err as response;
  }
};

export { getFormBySlug };

