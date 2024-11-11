import Image from 'next/image';
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

import styles from '@/styles/Components/Customer/Customer.module.scss';
import { KEYPAIR } from '@/types/interfaces';

interface PROPS {
  model: string;
  state: {
    columns?: {
      selected: string[];
      view: string[];
    };
  };
  dispatch: React.Dispatch<KEYPAIR>;
}
const EditColumns = (props: PROPS) => {
  const [dragging, setDragging] = useState('');
  const { state, dispatch } = props;
  const dragStart = (position: string) => {
    console.log('klg-20', 'Drag start', position);
    setDragging(position);
  };

  const dragEnter = (position: string) => {
    console.log('klg-25', 'Drag End', position);
    setDragging(position);
  };
  const drop = (event: any, col: string, type: string) => {
    // if (type !== dragging) return;
    if (type === 'view') {
      let viewCol = state?.columns?.view;
      viewCol = viewCol?.filter(vr => vr !== col);
      const selectedCol = state?.columns?.selected;
      selectedCol?.push(col);
      dispatch({ columns: { view: viewCol, selected: selectedCol } });
    }
    if (type === 'selected') {
      let selectedCol = state?.columns?.selected;
      selectedCol = selectedCol?.filter(vr => vr !== col);
      const viewCol = state?.columns?.view;
      viewCol?.push(col);
      dispatch({ columns: { view: viewCol, selected: selectedCol } });
    }
  };
  return (
    <div className={styles.customerModel}>
      {/* Left panel */}
      <div className={styles.LeftPannel}>
        <div className={`${styles.custSearch} searchArea `}>
          <div className="searchInput ModelSearch">
            <Image alt="search" height={24} width={24} src="/assets/images/search.svg" />
            <Form.Control type="text" placeholder="Search column name" />
          </div>
        </div>

        <div className={styles.ColumnsList}>
          <h3>Columns</h3>
          <ul>
            {state?.columns?.view?.map((pr, index) => (
              <li
                key={index}
                onDragStart={e => dragStart('view')}
                onDragEnter={e => dragEnter('view')}
                onDragEnd={event => drop(event, pr, 'view')}
                draggable
              >
                <span>
                  <Form.Check aria-label="option 1" />
                </span>{' '}
                {pr}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Right panel */}
      <div className={styles.RightPannel}>
        <h3>Selected columns</h3>

        {state?.columns?.selected?.map((pr, index) => (
          <div
            className={styles.selectedCol}
            key={index}
            onDragStart={e => dragStart('selected')}
            onDragEnter={e => dragEnter('selected')}
            onDragEnd={event => drop(event, pr, 'selected')}
            draggable
          >
            <div>
              <span className={styles.ListIcon}>
                <Image alt="listIcon" height={24} width={24} src="/assets/images/listIcon.svg" />
              </span>
              <span>{pr}</span>
            </div>
            <div className={styles.closeIcon}>
              {' '}
              <Image alt="close" height={24} width={24} src="/assets/images/close.svg" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditColumns;
