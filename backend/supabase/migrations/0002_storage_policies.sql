begin;

-- Service images policies

drop policy if exists "service images public read" on storage.objects;
drop policy if exists "service images owner insert" on storage.objects;
drop policy if exists "service images owner update" on storage.objects;
drop policy if exists "service images owner delete" on storage.objects;

drop policy if exists "service images admin insert" on storage.objects;
drop policy if exists "service images admin update" on storage.objects;
drop policy if exists "service images admin delete" on storage.objects;

create policy "service images public read"
  on storage.objects
  for select
  using (bucket_id = 'service-images');

create policy "service images owner insert"
  on storage.objects
  for insert
  with check (
    bucket_id = 'service-images'
    and (
      owner = auth.uid()
      or coalesce((auth.jwt() ->> 'role'), '') = 'admin'
    )
  );

create policy "service images owner update"
  on storage.objects
  for update
  using (
    bucket_id = 'service-images'
    and (
      owner = auth.uid()
      or coalesce((auth.jwt() ->> 'role'), '') = 'admin'
    )
  )
  with check (
    bucket_id = 'service-images'
    and (
      owner = auth.uid()
      or coalesce((auth.jwt() ->> 'role'), '') = 'admin'
    )
  );

create policy "service images owner delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'service-images'
    and (
      owner = auth.uid()
      or coalesce((auth.jwt() ->> 'role'), '') = 'admin'
    )
  );

-- User avatars policies

drop policy if exists "user avatars read" on storage.objects;
drop policy if exists "user avatars write" on storage.objects;

create policy "user avatars read"
  on storage.objects
  for select
  using (
    bucket_id = 'user-avatars'
    and owner = auth.uid()
  );

create policy "user avatars write"
  on storage.objects
  for all
  using (
    bucket_id = 'user-avatars'
    and owner = auth.uid()
  )
  with check (
    bucket_id = 'user-avatars'
    and owner = auth.uid()
  );

-- Offline maps policies

drop policy if exists "offline maps read" on storage.objects;
drop policy if exists "offline maps write" on storage.objects;
drop policy if exists "offline maps update" on storage.objects;
drop policy if exists "offline maps delete" on storage.objects;

create policy "offline maps read"
  on storage.objects
  for select
  using (
    bucket_id = 'offline-maps'
    and coalesce((auth.jwt() ->> 'role'), '') = 'admin'
  );

create policy "offline maps write"
  on storage.objects
  for insert
  with check (
    bucket_id = 'offline-maps'
    and coalesce((auth.jwt() ->> 'role'), '') = 'admin'
  );

create policy "offline maps update"
  on storage.objects
  for update
  using (
    bucket_id = 'offline-maps'
    and coalesce((auth.jwt() ->> 'role'), '') = 'admin'
  )
  with check (
    bucket_id = 'offline-maps'
    and coalesce((auth.jwt() ->> 'role'), '') = 'admin'
  );

create policy "offline maps delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'offline-maps'
    and coalesce((auth.jwt() ->> 'role'), '') = 'admin'
  );

commit;
