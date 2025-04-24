import React from 'react'
import { Col, Nav, Row, Tab } from 'react-bootstrap'
import AboutForm from '../../components/admin/AboutForm'
import SiteLogoForm from '../../components/admin/SiteLogoForm'
import ContactForm from '../../components/admin/ContactForm'
import SocialMediaForm from '../../components/admin/SocialMediaForm'
import BannerForm from '../../components/admin/BannerForm'

const SiteSettings = () => {
    return (
        <>

            <Tab.Container id="left-tabs-example" className="mt-60" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column accountsidebar">
                            <Nav.Item>
                                <Nav.Link eventKey="first">Site Logo</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="second">Site Contact</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="third">Site About</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="fourth">Site Social Media</Nav.Link>
                            </Nav.Item>

                            <Nav.Item>
                                <Nav.Link eventKey="five">Site Banner</Nav.Link>
                            </Nav.Item>

                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content>

                            {/* Site Logo  */}
                            <Tab.Pane eventKey="first">

                                <div className='site_logo_section'>

                                    <SiteLogoForm />

                                </div>

                            </Tab.Pane>

                            {/* Contact Details  */}
                            <Tab.Pane eventKey="second">

                                <ContactForm />

                            </Tab.Pane>

                            {/* About Form  */}
                            <Tab.Pane eventKey="third">

                                <AboutForm />

                            </Tab.Pane>

                            {/* Social Media  */}
                            <Tab.Pane eventKey="fourth">

                                <SocialMediaForm />

                            </Tab.Pane>

                            {/* Banner  */}
                            <Tab.Pane eventKey="five">

                                <BannerForm />

                            </Tab.Pane>

                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </>
    )
}

export default SiteSettings