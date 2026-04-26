-- Run this in your Supabase SQL Editor to set up the site_config table

create table if not exists site_config (
  id integer primary key default 1,
  primary_color text default '#C62828',
  accent_color text default '#FF7A00',
  bg_color text default '#F1F5F9',
  text_color text default '#212121',
  muted_color text default '#898989',
  heading_font text default 'Inter',
  body_font text default 'Poppins',
  hero_title_start text default 'End-to-End',
  hero_title_highlight text default 'Technology Consulting',
  hero_title_end text default 'from Silicon to Software',
  hero_description text default 'We provide end-to-end technical consulting services...',
  cta_label text default 'Contact Us',
  glow_color text default '#FF7A00',
  bg_color2 text default '#E8EDF2',
  hero_animation text default 'none',
  nav_links jsonb default '[{"label":"Home","href":"#home"},{"label":"About Us","href":"#about"},{"label":"Solutions","href":"#solutions"},{"label":"Services","href":"#services"}]',
  solutions jsonb default '[{"title":"Enterprise & SaaS Solutions","image_url":""},{"title":"Embedded Systems and IoT","image_url":""},{"title":"DevOps & Automations","image_url":""},{"title":"Data Engineering & Analysis","image_url":""}]',
  ensures jsonb default '[{"icon_url":"","title":"Reliable Delivery","subtitle":"On time, every time"},{"icon_url":"","title":"Client-Centric Approach","subtitle":"Built around your goals"},{"icon_url":"","title":"Scalable Solutions","subtitle":"Ready for real-world deployment"},{"icon_url":"","title":"Seamless Execution","subtitle":"From idea to delivery"},{"icon_url":"","title":"Quality Assured","subtitle":"Tested, validated, delivered"}]',
  updated_at timestamptz default now()
);

-- Allow public read (landing page)
alter table site_config enable row level security;

create policy "Public read" on site_config
  for select using (true);

-- Allow authenticated users to update (admin panel)
create policy "Authenticated update" on site_config
  for all using (auth.role() = 'authenticated');

-- Insert default row
insert into site_config (id) values (1) on conflict (id) do nothing;
