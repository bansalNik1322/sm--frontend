// Components
import { Metadata } from 'next';

import Branding from '@/Layout/Settings/Branding';
import { getSettingsDetail } from '@/Layout/Settings/service';
import { KEYPAIR } from '@/types/interfaces';

export const metadata: Metadata = {
  title: 'Branding',
  description: 'Branding',
};

async function fetchSettings() {
  const branding = (await getSettingsDetail({
    payload: {
      model: 'branding',
    },
  })) as { columnData: KEYPAIR };

  return branding;
}

async function Index() {
  const branding = await fetchSettings();
  if (!branding) return;
  return (
    <>
      <Branding branding={branding} />
    </>
  );
}

export default Index;
