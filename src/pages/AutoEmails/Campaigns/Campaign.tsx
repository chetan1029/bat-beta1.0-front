import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";

import { useTranslation } from 'react-i18next';

//components
import Loader from "../../../components/Loader";
import Icon from "../../../components/Icon";


//actions
import { updateCampaign } from "../../../redux/actions";


interface CampaignProps {
    campaign: any;
    companyId: string | number;
}
const Campaign = ({ companyId, campaign }: CampaignProps) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    return (
        <>
            {campaign ? <>

            </> : null}

            {/* {isClientArchived ? <MessageAlert message={t('The client is archived successfully')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null} */}

        </>
    );
}

export default withRouter(Campaign);