import { createClient } from '@/lib/supabase/server'

export default async function TagList() {
    const supabase = await createClient()
    const { data: tags, error } = await supabase.from('tag').select('id, tag_name');
      if (error) {
      console.error('Error fetching tags:', error);
      return <div>Error loading tags</div>;
    }  
    console.log(tags)
    return tags 
    // return (
    //   <div className='flex'>
    //      {tags?.map(tag => <button className='bg-blue-500 m-2 p-1' key={tag.id}> {tag.tag_name}</button>)}
    //   </div>
    // );
  }
  
  /*
  Change to client component
  bc, interactivity for button clicks 
  handleFilter and set tag as params - same logic as search.tsx
  
  issue: would it chain automatically with & 
  */