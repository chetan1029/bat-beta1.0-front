import React, { useEffect } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Link, Redirect } from "react-router-dom";

//actions
import { getCompanies } from "../redux/actions";

import Loader from "../components/Loader";

interface RootComponentProps {

}

const Root = (props: RootComponentProps) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const { companies, loading, isCompaniesFetched } = useSelector((state: any) => ({
        loading: state.Company.Common.loading,
        companies: state.Company.Common.companies,
        isCompaniesFetched: state.Company.Common.isCompaniesFetched,
    }));


    useEffect(() => {
        dispatch(getCompanies());
    }, [dispatch]);

    const noOfCompanies = isCompaniesFetched ? companies.count : 0;

    const company = isCompaniesFetched && noOfCompanies >= 1 ? companies.results[0]: null;
    const isCompanyDetailsMissing = company && (!company['time_zone'] || !company['currency']); 
    const redirectUrl = company ? (isCompanyDetailsMissing ? `/companies/${company['id']}/edit`: `/dashboard/${company['id']}`): '';

    return <>
        {isCompaniesFetched && noOfCompanies >= 1 ? <Redirect to={redirectUrl} /> : null}

        <div className="h-100 d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md={5}>
                        <Card>
                            <Card.Body className="p-4">
                                <Row className="no-gutters">
                                    <Col>
                                        {loading ? <>
                                            <div className='position-relative'>
                                                <h5 className="my-0">{t('Fetching data, please wait...')}</h5>
                                                <Loader />
                                            </div>
                                        </> : <>

                                                {isCompaniesFetched ? <>
                                                    {noOfCompanies === 0 ? <>
                                                        <h5 className="my-0">{t('Opps! No companies!')}</h5>
                                                        <p className="text-muted mt-2">
                                                            {t('You are not a member any companies. Either create a new company or ask any existing company memner to invite you to their company.')}
                                                        </p>
                                                        <div className="mt-4 text-center">
                                                            <Link to='/companies/add' className='btn btn-primary'>{t('Create Company')}</Link>
                                                        </div>
                                                    </> : <>
                                                            {/* <h5 className="my-0">{t('Select Company')}</h5>
                                                            <p className="text-muted mt-1 mb-4">
                                                                {t('You are member of multiple companies. Select the company to continue.')}
                                                            </p>

                                                            <div className="mt-3">
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
                                                            </div> */}
                                                        </>}
                                                </> : null}
                                            </>}
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    </>;
}

export default Root;