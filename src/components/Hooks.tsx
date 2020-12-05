import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { APICore } from "../api/apiCore";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useUser = () => {
    const api = new APICore();

    const [user, setuser] = useState<any>();

    useEffect(() => {
        if (api.isUserAuthenticated()) {
            setuser(api.getLoggedInUser());
        }
    }, []);

    return { user };
};

export { useQuery, useUser };