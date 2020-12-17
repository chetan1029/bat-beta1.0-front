import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media } from "react-bootstrap";
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import RolePermDisplayName from "../../components/RolePermDisplayName";
import MessageAlert from "../../components/MessageAlert";

import { getCompanies } from "../../redux/actions";


interface CompaniesProp {

}

const Companies = (props: CompaniesProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();


    const { companies, loading, isCompaniesFetched, companyCreated } = useSelector((state: any) => ({
        loading: state.Company.Common.loading,
        companies: state.Company.Common.companies,
        isCompaniesFetched: state.Company.Common.isCompaniesFetched,
        companyCreated: state.Company.Common.companyCreated,
    }));


    useEffect(() => {
        dispatch(getCompanies());
    }, [dispatch]);

    useEffect(() => {
        if (companyCreated) {
            dispatch(getCompanies());
        }
    }, [dispatch, companyCreated]);


    return <>
        <div className="py-4 px-3">
            <Row className="align-items-center">
                <Col lg={6}>
                    <div className="d-flex align-items-center">
                        <Icon name="bag" className="icon icon-xs mr-2" />
                        <h1 className="m-0">{t('My Companies')}</h1>
                    </div>
                </Col>
                {/* <Col className="text-sm-right" lg={6}>
                    <Link to={`/companies/add`} className="btn btn-primary">{t('Add New Company')}</Link>
                </Col> */}
            </Row>
        </div>

        <Card>
            <Card.Body className="">
                <div className="position-relative">
                    {loading ? <Loader /> : null}

                    <Row>
                        <Col lg={6}>
                            <h5>{t('Active companies')}</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={6}>
                            {isCompaniesFetched ? <>
                                {companies.results.map((company: any, index: number) => {
                                    return <Card key={index} className="mb-2">
                                        <Card.Body className="p-0">
                                            <Link to={`/dashboard/${company.id}`} className='p-3 w-100 h-100'>
                                                <h5 className="text-primary mb-1">{company.name}</h5>
                                                {company['roles'] ? <RolePermDisplayName name={company['roles'][0]} className="text-muted" /> : ''}
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                })}
                            </> : null}
                        </Col>
                        <Col lg={{ span: 5, offset: 1 }} xs={12}>
                            <div>
                                <Media>
                                    <div className="pt-1">
                                        <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                                    </div>
                                    <Media.Body>
                                        <div className="px-3">
                                            <h5 className="m-0 mb-2">{t('Some explaination')}</h5>
                                            <p className="text-wrap pb-0 text-muted">
                                                Eu malesuada leo tincidunt scelerisque vel sit. Tortor duis ipsum justo augue porta aliquam.
                                            </p>
                                        </div>
                                    </Media.Body>
                                </Media>
                            </div>
                        </Col>
                    </Row>
                </div>
            </Card.Body>
        </Card>

        {companyCreated ? <MessageAlert message={t('A new company is created')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
    </>;
}

export default Companies;