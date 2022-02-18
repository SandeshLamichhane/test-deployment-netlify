import React from 'react';
import AddNews from './AddNews';
import ConfigureNews from './ConfigureNews';

import '../News.css'
import { Form, Button, Card, Alert, Container, Nav, Tabs, Tab, Col, Row } from 'react-bootstrap'
export default function AdminNews() {
  return <div>
    <Card>
      <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="home" title="Add News">
          <AddNews />
        </Tab>
        <Tab eventKey="profile" title="All News">
          <ConfigureNews />
        </Tab>
        <Tab eventKey="contact" title="Contact" disabled>
          hyy
        </Tab>
      </Tabs>
    </Card>

  </div>;
}
