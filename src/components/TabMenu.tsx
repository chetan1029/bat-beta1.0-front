import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from 'react-router-dom'


interface TabMenuProp {
    defaultSelectedItem?: string,
    items: Array<{
        label: string,
        name: string
    }>
}

const TabMenu = ({ items, defaultSelectedItem }: TabMenuProp) => {

    return <div className="px-2 pb-2 mb-4">
        <Nav variant="tabs" className="nav-bordered m-0" defaultActiveKey={defaultSelectedItem} as='ul'>
            {items.map((item: any, idx: number) => {
                return <Nav.Item as="li" key={idx}>
                    <Nav.Link className="pt-1" eventKey={item['name']} to={item['to']} as={Link}>{item['label']}</Nav.Link>
                </Nav.Item>
            })}

        </Nav>
    </div>
}

export default TabMenu;