import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';


//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import TabMenu from "../../components/TabMenu";


//actions
import { getSalesChannel } from "../../redux/actions";
import DisplayDate from "../../components/DisplayDate";


interface SalesChannelDetailsProps {
    match: any;
}
const SalesChannelDetails = (props: SalesChannelDetailsProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { loading, channel } = useSelector((state: any) => ({
        loading: state.Company.SalesChannels.loading,
        channel: state.Company.SalesChannels.channel
    }));

    const companyId = props.match.params.companyId;
    const categoryId = props.match.params.categoryId;
    const channelId = props.match.params.channelId;

    useEffect(() => {
        if (companyId && channelId) {
            dispatch(getSalesChannel(companyId, channelId));
        }
    }, [dispatch, channelId, companyId]);


    const rawAddress = () => {
        return { __html: channel['address'] };
    }

    const tabMenuItems: Array<any> = [
        { label: t('Details'), name: 'details', to: `/sales/${companyId}/channels/${categoryId}/${channelId}` },
        { label: t('Members'), name: 'members', to: `/settings/${channelId}/members` },
        { label: t('Bank'), name: 'banks', to: `/settings/${channelId}/banks` },
        { label: t('Location'), name: 'locations', to: `/settings/${channelId}/locations` },
        { label: t('Contracts'), name: 'contracts', to: `/settings/${channelId}/contracts` }
    ];

    const backUrl = `/sales/${companyId}/channels/${categoryId}`;

    return (
        <>
            <div className="py-4 px-3">
                <Row className='align-items-center'>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={backUrl}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Sales Channel Details')}</h1>
                        </div>
                    </Col>
                </Row>
            </div>

            <Row>
                <Col lg={12}>
                    <Card>
                        <Card.Body className="">
                            {loading ? <Loader /> : <div>

                                <TabMenu items={tabMenuItems} defaultSelectedItem={'details'} />

                                <Row>
                                    <Col lg={6}>
                                        <Card>
                                            <Card.Body className="">
                                                {channel ? <>
                                                    <div className="">
                                                        <Media className='pb-3 px-2'>
                                                            <Media.Body>
                                                                <h5 className="my-0">{channel['name']}</h5>
                                                                <p className="my-0 text-muted" dangerouslySetInnerHTML={rawAddress()}></p>
                                                            </Media.Body>
                                                        </Media>

                                                        <div className="pt-3 px-2 border-top">
                                                            <Row>
                                                                <Col>
                                                                    <span className="text-muted">{t('Created')}: </span> {channel['create_date'] ? <DisplayDate dateStr={channel['create_date']} /> : null}
                                                                </Col>
                                                                <Col>
                                                                    <span className="text-muted">{t('Updated')}: </span> {channel['update_date'] ? <DisplayDate dateStr={channel['update_date']} /> : null}
                                                                </Col>
                                                            </Row>
                                                        </div>
                                                    </div>
                                                </> : null}
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </Row>
                            </div>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </>
    );
}

export default withRouter(SalesChannelDetails);