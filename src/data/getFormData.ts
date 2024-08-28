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
const getFormBySlug = async (slug: string): Promise<response> => {
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
const getFormById = async (id: number): Promise<response> => {
  try {
    const formData = await supabase
      .from('forms')
      .select('*')
      .eq('id', id)
      .order('created_at', { ascending: false });
    return formData as response;
  } catch (err) {
    return err as response;
  }
};

const getAllForms = async (): Promise<response> => {
  try {
    const formData = await supabase
      .from('forms')
      .select('*')
      .order('created_at', { ascending: false });
    return formData as response;
  } catch (err) {
    return err as response;
  }
};

const getFormSubmissionCount = async (form_id: number): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('submissions')
      .select('form_id', { count: 'exact' })
      .eq('form_id', form_id); // Filter by form_id

    if (error) {
      throw error; // Handle error appropriately
    }

    return count as number; // Return the exact count
  } catch (error) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-expect-error
    console.error('Error fetching submission count:', error.message);
    return 0; // Return null or handle as needed
  }
};

const setViewCount = async (formData: FormDetails) => {
  await supabase
    .from('forms')
    .update({ views: formData.views + 1 })
    .eq('id', formData.id);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const formSubmissions = async (id: number): Promise<any> => {
  try {
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('form_id', id);
    if (error) {
      throw new Error(error.message);
    }
    return data;
  } catch (err) {
    console.log(err);
    return err;
  }
};

export {
  getFormBySlug,
  getAllForms,
  getFormSubmissionCount,
  setViewCount,
  formSubmissions,
  getFormById
};
