import React from 'react';

interface Props {
    children : any
}

const Index = (props : Props) => {
    return (
        <React.Fragment>
            {
                props.children
            }
        </React.Fragment>
    );
}

export default Index;