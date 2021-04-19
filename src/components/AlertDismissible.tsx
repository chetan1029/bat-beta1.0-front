import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import { useTranslation } from 'react-i18next';

interface AlertDismissibleProps {
    heading: any,
    message: any,
    confirmBtnVariant?: string,
    confirmBtnLabel?: string,
    cancelBtnVariant?: string,
    cancelBtnLabel?: string,
}

const AlertDismissible = ({ heading, message, confirmBtnVariant, confirmBtnLabel, cancelBtnVariant, cancelBtnLabel }: AlertDismissibleProps) => {
    const { t } = useTranslation();
    const [show, setShow] = useState(true);

    return <>
      <Alert show={show} variant="success">
        <Alert.Heading className="mt-3">{heading}</Alert.Heading>
        <p>
          {message}
        </p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button href={'/get-started'} variant={confirmBtnVariant || "outline-success"}>
            {confirmBtnLabel || t('Confirm')}
          </Button>
          <Button onClick={() => setShow(false)} variant={cancelBtnVariant || "outline-danger"} className="ml-3">
            {cancelBtnLabel || t('Close')}
          </Button>
        </div>
      </Alert>

    </>;
}

export default AlertDismissible;
