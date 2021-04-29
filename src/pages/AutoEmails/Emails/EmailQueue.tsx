import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Media, Table, Accordion, Button } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { map, uniqBy, get } from "lodash";
import searchIcon from "../../../assets/images/search_icon.svg";
//components
import Icon from "../../../components/Icon";

//actions
import { getEmailQueues } from "../../../redux/actions";

import Loader from "../../../components/Loader";

interface EmailQueueCardItemProps {
    emailqueues: any;
    companyId: any;
    onChangePage?: any;
}

const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const EmptyState = () => {
    const { t } = useTranslation();
    return (
        <Card className="payment-terms-card mb-2">
            <Card.Body>
                <div className="p-2">
                    <h5 className="font-weight-normal my-0">{t('There are no email found for the specific filter')}</h5>
                </div>
            </Card.Body>
        </Card>
    )
}


const EmailQueueTable = ({ emailqueues, companyId, onChangePage }: EmailQueueCardItemProps) => {
  const { t } = useTranslation();
  const history = useHistory();

  const openDetails = (domain: string, orderid: string) => {
      window.open(`https://sellercentral.${domain.toLowerCase()}/orders-v3/order/${orderid}`, '_blank');
  }

  const [records, setRecords] = useState<Array<any>>([]);
  const [nextUrl, setNextUrl] = useState<string>(emailqueues ? emailqueues.next : '');
  const [previousUrl, setPreviousUrl] = useState<string>(emailqueues ? emailqueues.previous : '');

  useEffect(() => {
		if (emailqueues) {
			setRecords(prevArray => [...prevArray, ...emailqueues.results]);
			setNextUrl(emailqueues.next);
      setPreviousUrl(emailqueues.previous);
		}
	}, [emailqueues]);


  const uniq = uniqBy(records, (e) => {
		return e.id;
	});


  const loadPrevious = useCallback(() => {
		if (previousUrl) {
			const urlParams = new URLSearchParams(new URL(previousUrl).search);
      onChangePage(urlParams.get('offset'));
		}
	}, [previousUrl, onChangePage]);

  const loadNext = useCallback(() => {
		if (nextUrl) {
			const urlParams = new URLSearchParams(new URL(nextUrl).search);
			onChangePage(urlParams.get('offset'));
		}
	}, [nextUrl, onChangePage]);

    return (<>
      <Table hover>
        <thead>
            <tr>
                <th>{t('Order ID')}</th>
                <th>{t('Email Campaign')}</th>
                <th>{t('Email')}</th>
                <th>{t('Status')}</th>
            </tr>
        </thead>
        <tbody>
        {map(uniq, (email, i) =>
        <tr key={i} onClick={() =>openDetails(email.amazonorder.sales_channel, email.amazonorder.order_id)}>
          <td>{email.amazonorder.order_id}</td>
          <td>{email.emailcampaign.name}</td>
          <td>{email.sent_to}</td>
          <td>{capitalizeFirstLetter(email.status.name)}</td>
        </tr>
        )
        }
        </tbody>
      </Table>
      <div className="text-center">
        { previousUrl ?
        <Button variant="outline-primary" onClick={loadPrevious}>{t('Previous')}</Button> : null
        }
        { nextUrl ?
				<Button variant="outline-primary ml-2" onClick={loadNext}>{t('Next')}</Button> : null
        }
			</div>
    </>
    )
}

interface EmailQueueProps {
    match: any;
}
const EmailQueue = (props: EmailQueueProps) => {
    const { t } = useTranslation();

    const dispatch = useDispatch();

    const { emailQueues, isEmailQueuesFetched } = useSelector((state: any) => ({
        emailQueues: state.Company.AutoEmails.emailQueues,

        //flags
        isEmailQueuesFetched: state.Company.AutoEmails.isEmailQueuesFetched,
    }));

    const companyId = props.match.params.companyId;
    const campaignId = props.match.params.campaignId || "";
    const status = props.match.params.status || "";
    /*
        Email Queue
    */
    const limit = 100
    const [filters, setFilters] = useState<any>({
      emailcampaign_id: campaignId,
  		is_active: true,
  		status: status,
  		limit,
  		offset: 0
  	});
    const [search, setSearch] = useState<any>({
      emailcampaign_id: campaignId,
      is_active: true,
      status: status,
      limit,
      offset: 0
    });

    /*
    Email Queue
    */
    useEffect(() => {
        const companyId = props.match.params.companyId;
        if (companyId) {
            dispatch(getEmailQueues(companyId, filters));
        }
    }, [filters, dispatch, props.match.params.companyId]);


    const handleSearchKeyDown = (event: any) => {
  		const { value } = event.target;
  		setSearch(value);
  		if ([13].includes(event.keyCode)) {
  			setFilters({ ...filters, search: value, offset: 0 });
  		}
  	};

    const onChangePage = useCallback((offset) => {
  		const off = offset ? parseInt(offset) : offset;

  		if (filters) {
  			setFilters(prevState => ({ ...prevState, offset: off }));
  		}
  	}, [filters]);


    return (
        <>
            <div className="py-4 px-3">
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            <Link to={`/auto-emails/${companyId}/campaigns`}>
                                <Icon name="arrow_left_2" className="icon icon-xs  mr-2" />
                            </Link>
                            <h1 className="m-0">{t('Email Queue')}</h1>
                        </div>
                    </Col>

                </Row>
            </div>

            {
                !isEmailQueuesFetched ?
                    <Loader />
                    :
                    <div>
                        <Card>
                            <Card.Body className="">
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                  <div className="d-flex align-items-center w-50">
                                    <div className="search">
                                      <input type="text" placeholder={t("Search By Order ID")}
                                        onChange={(e: any) => setSearch(e.target.value)}
                                        onKeyDown={handleSearchKeyDown} />
                                      <button type="submit">
                                        <img src={searchIcon} alt=""
                                          onClick={() => setFilters({ ...filters, search, offset: 0 })} />
                                      </button>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                    {
                                        get(emailQueues, "count") > 0 ?
                                        <EmailQueueTable emailqueues={emailQueues}
                                            companyId={companyId} onChangePage={onChangePage}
                                        />
                                        : <EmptyState />

                                    }
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
            }

        </>
    );
}

export default withRouter(EmailQueue);
