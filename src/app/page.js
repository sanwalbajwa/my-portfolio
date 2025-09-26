import { supabase } from '../lib/supabase'

export default async function Home() {
  // Test database connection
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Portfolio Test</h1>
      <p>Database Status: {error ? 'Error connecting' : 'Connected successfully'}</p>
      <p>Projects count: {projects?.length || 0}</p>
    </div>
  )
}