import { createClient } from '@/lib/supabase/server'

export default async function TagList() {
    const supabase = await createClient()
    const { data: tags, error } = await supabase.from('tag').select('id, tag_name');
    
    if (error) {
      console.error('Error fetching tags:', error);
      return <div>Error loading tags</div>;
    }   
    return (
      <div>
        <h1 className="text-2xl font-bold mt-10">Tags</h1>
        {tags?.map(tag => <div key={tag.id}>{tag.tag_name}</div>)}
      </div>
    );
  }
  