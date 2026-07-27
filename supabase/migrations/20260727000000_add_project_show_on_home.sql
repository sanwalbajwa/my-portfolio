alter table public.projects
add column if not exists show_on_home boolean not null default false;

create index if not exists projects_show_on_home_display_order_idx
on public.projects (show_on_home, display_order asc, created_at desc);
