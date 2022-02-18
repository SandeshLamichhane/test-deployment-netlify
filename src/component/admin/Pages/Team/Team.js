import React from 'react';
import { Form, Button, Card, Alert, Container, Nav, Tabs, Tab, Col, Row } from 'react-bootstrap'
import AddTeam from './AddTeam'
import ConfigureTeam from './ConfigureTeam';



export default function Team() {
    return <div>
        <Card>
            <Tabs defaultActiveKey="profile" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="home" title="Add Team">
                    <AddTeam />
                </Tab>
                <Tab eventKey="profile" title="All Team">
                    <ConfigureTeam />
                </Tab>


            </Tabs>
        </Card>
    </div >;
}
