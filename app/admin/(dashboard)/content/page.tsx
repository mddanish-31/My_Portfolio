import React from 'react';
import { getAdminSectionsOverview } from '@/lib/cms/data-access';
import { ContentEditorClient } from './ContentEditorClient';

export const metadata = {
  title: 'Content Studio & Editor — Admin Portal',
  description: 'Manage, edit, draft, and publish portfolio CMS sections',
};

export default async function AdminContentPage({
  searchParams,
}: {
  searchParams?: Promise<{ section?: string }>;
}) {
  const sections = await getAdminSectionsOverview();
  const resolvedParams = searchParams ? await searchParams : {};
  const defaultSelected = resolvedParams?.section;

  return (
    <ContentEditorClient
      initialSections={sections}
      defaultSelectedSectionId={defaultSelected}
    />
  );
}

