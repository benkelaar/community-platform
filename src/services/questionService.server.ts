import type { SupabaseClient } from '@supabase/supabase-js'

const getBySlug = (client: SupabaseClient, slug: string) => {
  return client
    .from('questions')
    .select(
      `
       id,
       created_at,
       created_by,
       modified_at,
       comment_count,
       description,
       moderation,
       slug,
       category:category(id,name),
       tags,
       title,
       total_views,
       images,
       author:profiles(id, display_name, username, is_verified, is_supporter, country)
     `,
    )
    .or(`slug.eq.${slug},previous_slugs.cs.{"${slug}"}`)
    .or('deleted.eq.false,deleted.is.null')
    .single()
}

export const questionServiceServer = {
  getBySlug,
}
