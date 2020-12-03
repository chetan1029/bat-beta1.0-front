import React, { useState, useEffect } from "react";
import { Row, Col, Card, Form, Collapse } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import Icon from "../../../components/Icon";

const getFriendlyName = (value: string) => {
    return value.split('_').join(' ');
}

const chunk = (arr: Array<any>, chunkSize: number) => {
    if (chunkSize <= 0) return arr;
    let res: Array<any> = [];
    for (var i = 0, len = arr.length; i < len; i += chunkSize)
        res.push(arr.slice(i, i + chunkSize));
    return res;
}
interface RolePermissionsProps {
    role: string,
    permissions: Array<string>,
    onChange: any,
    selectedRole: string,
    onSelectionRole: any,
    defaultSelectedPermissions?: Array<any>,
}

const RolePermissions = ({ role, permissions, selectedRole, onSelectionRole, onChange, defaultSelectedPermissions }: RolePermissionsProps) => {
    const selected: boolean = selectedRole && role && selectedRole === role ? true : false;

    const [open, setOpen] = useState(selected);
    const { t } = useTranslation();

    useEffect(() => {
        const op = selectedRole && role && selectedRole === role ? true : false;
        setOpen(op);
        if (!op) {
            setselectedPerms(defaultSelectedPermissions || []);
        }
    }, [selectedRole, role, defaultSelectedPermissions]);

    const permChunks: Array<any> = chunk(permissions, 3);

    const [selectedPerms, setselectedPerms] = useState<Array<any>>(defaultSelectedPermissions || []);

    const onSelectPerms = (e: any, perm: string) => {
        let modifiedSelection: Array<any> = [...selectedPerms];
        if (e.target.checked) {
            modifiedSelection.push(perm);
        } else {
            modifiedSelection = modifiedSelection.filter(p => p !== perm);
        }
        setselectedPerms(modifiedSelection);
        onChange(modifiedSelection);
    }

    return <>
        <Card className="mb-2">
            <Card.Body>
                <div className="d-flex">
                    <Form.Check type='radio' id={`role-${role}`} label={<span className='font-weight-bold capitalize'>{getFriendlyName(role)}</span>}
                        checked={selected}
                        onChange={(e: any) => {
                            if (e.target.checked) {
                                onSelectionRole(role);
                            }
                        }} />
                    <span className="text-muted ml-3">({permissions.length} {t('permissions')})</span>

                    <Link to='#' onClick={() => setOpen(!open)} className='ml-auto'>
                        <Icon name={open ? "chevron-top" : "chevron-down"} className="icon text-primary"></Icon>
                    </Link>
                </div>

                <Collapse in={open} className="mt-3">
                    <div className="bg-light p-3">
                        {(permChunks.map((chunk, idx) => {
                            return <Row key={idx} className="mb-2">
                                {chunk.map((perm: string, iidx: number) => {
                                    return <Col lg={4} key={`${idx}-p-${iidx}`}>
                                        <Form.Check type='checkbox' id={`${role}-perm-${idx}-i-${iidx}-${perm}`} label={<span className='capitalize'>{getFriendlyName(perm['name'])}</span>}
                                            checked={selectedPerms.includes(perm['name'])}
                                            onChange={(e: any) => onSelectPerms(e, perm['name'])} />
                                    </Col>
                                })}
                            </Row>
                        }))}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    </>;
}

export default RolePermissions;