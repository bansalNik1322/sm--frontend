import Image from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { useApp } from '@/components/App';
import styles from '@/styles/Components/Container/Header.module.scss';

import { useContainerContext } from '../context';

function Header() {
  const { logout, state: globalState } = useContainerContext();
  const { getGlobalSettings } = useApp();

  const headerImageLoader = () => {
    return getGlobalSettings()?.logo;
  };

  return (
    <>
      <div className={styles.Header}>
        <div className="container-fluid">
          <div className={styles.HeaderInner}>
            <div>
              <Link href={'/customer'}>
                <Image
                  alt="mainlogo"
                  loader={headerImageLoader}
                  height={32.083}
                  width={32.083}
                  src={getGlobalSettings()?.logo}
                />{' '}
                <span className="ml24">Customers</span>
              </Link>
            </div>
            <div className={styles.HeaderRight}>
              <ul>
                <li>
                  <Link href={'/settings/accounts'}>
                    <Image alt="settings" height={24} width={24} src="/assets/images/settings.svg" />
                  </Link>
                </li>
                <li>
                  <div className={styles.topUserHead}>
                    <div>
                      <span className={styles.userIcon}>
                        <Image alt="settings" height={20} width={20} src="/assets/images/user.svg" />
                      </span>
                    </div>
                    <div>
                      <Dropdown>
                        <Dropdown.Toggle className="text-capitalize" id="header-dropdown-toogle">{`${
                          globalState?.profileDetail?.role?.toLowerCase() || ''
                        } Account`}</Dropdown.Toggle>
                        <Dropdown.Menu>
                          {/* <Dropdown.Item as={Link} href={`/settings`}>
                            <Image alt="settings" src={'/assets/images/settings.svg'} height={20} width={20} />
                            &nbsp; Settings
                          </Dropdown.Item> */}
                          <Dropdown.Item href="#" onClick={logout}>
                            &nbsp;
                            <Image alt="logout" src={'/assets/images/logout-icon.svg'} height={15} width={15} />
                            &nbsp;&nbsp; Logout
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default memo(Header);
