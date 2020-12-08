import { useEffect, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { APICore } from "../api/apiCore";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
}

const useUser = () => {
    const api = useMemo(() => (new APICore()), []);

    const [user, setuser] = useState<any>();

    useEffect(() => {
        if (api.isUserAuthenticated()) {
            setuser(api.getLoggedInUser());
        }
    }, [api]);

    return { user };
};

export { useQuery, useUser };