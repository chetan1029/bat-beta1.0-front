import React, { useEffect } from 'react';
import { Alert } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';

import { logoutUser } from "../../redux/actions";

const Logout = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutUser());
    }, [dispatch]);

    const { userLogout, error } = useSelector((state: any) => ({
        error: state.Auth.error,
        userLogout: state.Auth.userLogout
    }));

    return <>
        {userLogout ? <Redirect to='/login' /> : null}

        <div className="">
            {error && <Alert variant="danger" className="my-2">{error}</Alert>}
        </div>
    </>;
}

export default withRouter(Logout);