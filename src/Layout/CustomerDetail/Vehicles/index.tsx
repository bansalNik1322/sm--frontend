'use client';
import Image from 'next/image';
import React, { memo } from 'react';
import { Button, Dropdown, Form, Tab, Table, Tabs } from 'react-bootstrap';

function Index() {
  return (
    <Tabs defaultActiveKey="vehicles" id="uncontrolled-tab-example">
      <Tab eventKey="vehicles" title="Vehicles">
        <div className="Tabfilter">
          <div>
            <div className="searchArea">
              <div className="searchInput">
                <Image alt="searchIcon" src="/assets/images/search.svg" height={16} width={16} />{' '}
                <Form.Control type="text" placeholder="Search " />
              </div>
            </div>
          </div>
          <div>
            <Button className="customBtn SmBtn">
              {' '}
              <Image alt="addIcon" src="/assets/images/add.svg" height={16} width={16} /> Add a new vehicle
            </Button>
          </div>
        </div>

        <div className="WhtBox mt10">
          <div className="TableTop">
            <div className="TopAction">
              <ul>
                <li>
                  <a href="">
                    <Image alt="editIcon" src="/assets/images/edit.svg" height={16} width={16} /> Edit
                  </a>
                </li>
                <li>
                  <a href="">
                    <Image alt="deleteIcon" src="/assets/images/delete.svg" height={16} width={16} /> Delete
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="table-responsive dataTable">
            <Table hover>
              <thead>
                <tr className="lightBg">
                  <th style={{ width: '10px' }}>
                    <Form.Check aria-label="option 1" />
                  </th>
                  <th>
                    Licence Plate Number <img src="/assets/images/upDown.svg" />
                  </th>
                  <th>
                    Reminder Date <img src="/assets/images/upDown.svg" />
                  </th>
                  <th>
                    Greenslip Expiry Date <img src="/assets/images/upDown.svg" />
                  </th>
                  <th>
                    Duration <img src="/assets/images/upDown.svg" />
                  </th>
                  <th style={{ width: '1px' }}></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <Image alt="editIcon" height={16} width={16} src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Check aria-label="option 1" />
                  </td>
                  <td>AA00AA</td>
                  <td>08-06-2024</td>
                  <td>08-06-2024</td>
                  <td>3 months</td>
                  <td>
                    <Dropdown className="actionDropDown">
                      <Dropdown.Toggle id="dropdown-basic">
                        <img src="/assets/images/menu.svg" />
                      </Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          <img src="/assets/images/edit.svg" /> Edit details
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          <img src="/assets/images/delete.svg" /> Delete
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </div>
      </Tab>
      {/* <Tab eventKey="novehicles" title="No Vehicles">
        <div className="WhtBox mt-3">
          <div className="noVechicles">
            <span className="carIcon">
              <img src="/assets/images/car.svg" />
            </span>
            <h3>
              No vehicle found <span>There is no vehicle found.</span>
            </h3>
            <div>
              {' '}
              <Button className="customBtn SmBtn">
                {' '}
                <img src="/assets/images/add.svg" /> Add a new vehicle
              </Button>
            </div>
          </div>
        </div>
      </Tab> */}
    </Tabs>
  );
}

export default memo(Index);
