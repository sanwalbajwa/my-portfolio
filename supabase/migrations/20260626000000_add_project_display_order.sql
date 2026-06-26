alter table public.projects
add column if not exists display_order integer;

with ordered_projects as (
  select
    id,
    row_number() over (order by created_at desc) as new_display_order
  from public.projects
  where display_order is null
)
update public.projects
set display_order = ordered_projects.new_display_order
from ordered_projects
where public.projects.id = ordered_projects.id;

create index if not exists projects_display_order_created_at_idx
on public.projects (display_order asc, created_at desc);
