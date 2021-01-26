import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Card, Form, Media, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import classNames from "classnames";
import { useFormik } from 'formik';
import * as Yup from 'yup';

//components
import Icon from "../../components/Icon";
import Loader from "../../components/Loader";
import MessageAlert from "../../components/MessageAlert";
import TabMenu from "../../components/TabMenu";
import DisplayDate from "../../components/DisplayDate";
import { useUser } from "../../components/Hooks";
import { LANGS, LanguageDropdown } from "../../components/LanguageDropdown";
import TimezoneDropdown from "../../components/TimezoneDropdown";


import avatarPlaceholder from "../../assets/images/avatar-placeholder.jpg";

import { updateProfile, updateProfilePicture } from "../../redux/actions";


interface ProfileProp {
    match: any
}

const Profile = (props: ProfileProp) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();

    const companyId = props.match.params.companyId;

    const { user } = useUser();

    const [profile, setprofile] = useState<any>({ ...user });

    useEffect(() => {
        setprofile(user);
    }, [user]);


    const { loading, profileUpdated, error, updatedUser } = useSelector((state: any) => ({
        loading: state.Auth.loading,
        profileUpdated: state.Auth.profileUpdated,
        error: state.Auth.error,
        updatedUser: state.Auth.user
    }));

    const menuItems: Array<any> = [
        { label: t('General info'), name: 'general', to: `/profile/${companyId}/general` },
        { label: t('Change password'), name: 'change-password', to: `/profile/${companyId}/change-password` }
    ];

    const fullName = profile ? profile['first_name'] + " " + profile['last_name'] : "";

    const onProfilePic = (e: any) => {
        const file = e.target.files[0];
        if (file)
            dispatch(updateProfilePicture(user['username'], file));
    }

    useEffect(() => {
        if (profileUpdated) {
            setprofile({ ...updatedUser });
            setshowEditName(false);
        }
    }, [profileUpdated, updatedUser]);

    const [showEditName, setshowEditName] = useState(false);

    const updateName = (field, value) => {
        const modifiedInfo = { ...profile };
        modifiedInfo[field] = value;
        setprofile(modifiedInfo);
    }

    const saveName = () => {
        dispatch(updateProfile(user['username'], { 'first_name': profile['first_name'], 'last_name': profile['last_name'] }));
    }

    const validator = useFormik({
        enableReinitialize: true,
        initialValues: {
            phone_number: profile ? profile['phone_number'] : "",
            language: profile ? { label: LANGS[profile['language']], value: profile['language'] } : "",
            timezone: profile ? { label: profile['timezone'], value: profile['timezone'] } : ""
        },
        validationSchema: Yup.object({}),
        onSubmit: values => {
            dispatch(updateProfile(user['username'], { ...values, timezone: values['timezone']['value'], language: values['language']['value'] }));
        },
    });


    return <>
        <div className="py-4 px-3">
            <Row>
                <Col>
                    <div className="d-flex align-items-center">
                        <Icon name="user" className="icon icon-xs mr-2" />
                        <h1 className="m-0">{t('Profile')}</h1>
                    </div>
                </Col>
            </Row>
        </div>

        <Card>
            <Card.Body className="">
                <TabMenu items={menuItems} defaultSelectedItem={'general'} />

                <div className="mt-3 position-relative">
                    {loading ? <Loader /> : null}

                    {profile ? <>
                        <Row>
                            <Col>
                                <Media className=''>
                                    <div className="position-relative mr-3 align-self-center">
                                        <img width={60} height={60} className={classNames("rounded-circle", { "border": !profile['profile_picture'] })}
                                            src={profile['profile_picture'] || avatarPlaceholder} alt="" />
                                        <div className='profile-pic-edit'>
                                            <Icon name='pencil' className="icon icon-xxxs" />
                                            <input type="file" onChange={onProfilePic} accept="image/x-png,image/gif,image/jpeg" />
                                        </div>
                                    </div>

                                    <Media.Body>
                                        {showEditName ? <Row className="mb-2">
                                            <Col lg={4}>
                                                <Row noGutters>
                                                    <Col>
                                                        <Form.Control type="text" name="first_name" size="sm" value={profile['first_name']}
                                                            onChange={(e) => updateName('first_name', e.target.value)}></Form.Control>
                                                    </Col>
                                                    <Col>
                                                        <Form.Control type="text" name="last_name" size="sm" value={profile['last_name']}
                                                            onChange={(e) => updateName('last_name', e.target.value)} className="ml-2"></Form.Control>
                                                    </Col>
                                                    <Col>
                                                        <Button variant='primary' size='sm' onClick={saveName} className="ml-3">
                                                            <Icon name='check' className='icon icon-xxxs'></Icon>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row> : <>
                                                <h5 className="mt-1">
                                                    {fullName}
                                                    <Button variant="link" className="ml-2 p-0 mt-n1" onClick={() => setshowEditName(!showEditName)}>
                                                        <Icon name='pencil' className="icon icon-xxxs text-primary" />
                                                    </Button>
                                                </h5>
                                            </>}

                                        <p className="mb-0">
                                            <span className="text-muted">{t('Register on')}:</span>
                                            <span className="ml-2"><DisplayDate dateStr={profile['date_joined']} timeClass={"ml-1"} /></span>
                                        </p>
                                    </Media.Body>

                                    <div className="ml-auto">
                                        <p className="mb-0">
                                            <span className="text-muted">{t('Last login')}:</span>
                                            <span className="ml-2"><DisplayDate dateStr={profile['last_login']} timeClass={"ml-1"} /></span>
                                        </p>
                                    </div>
                                </Media>
                            </Col>
                        </Row>

                        <Row>
                            <Col lg={6}>
                                <div className="py-4 mt-3 pr-sm-5">
                                    <Form noValidate onSubmit={validator.handleSubmit} className="">
                                      <Row>
                                        <Col lg={6} xs={12}>
                                          <Form.Group>
                                              <Form.Label>{t('User name')}</Form.Label>

                                              <Form.Control type="text" placeholder={t("User name")}
                                                  name="username" id="username"
                                                  value={profile.username}
                                                  readOnly />
                                          </Form.Group>
                                        </Col>
                                        <Col lg={6} xs={12}>
                                          <Form.Group>
                                              <Form.Label>{t('Email address')}</Form.Label>

                                              <Form.Control type="email" placeholder={t("Email address")}
                                                  name="email" id="email"
                                                  value={profile.email}
                                                  readOnly />
                                          </Form.Group>
                                        </Col>
                                      </Row>

                                      <Form.Group>
                                          <Form.Label>{t('Phone number')}</Form.Label>

                                          <Form.Control type="text" placeholder={t("Phone number")}
                                              name="phone_number" id="phone_number"
                                              onChange={validator.handleChange}
                                              onBlur={validator.handleBlur}
                                              value={validator.values.phone_number}
                                              isInvalid={validator.touched.phone_number && validator.errors && validator.errors.phone_number ? true : false} />

                                          {validator.touched.phone_number && validator.errors.phone_number ? (
                                              <Form.Control.Feedback type="invalid">{validator.errors.phone_number}</Form.Control.Feedback>
                                          ) : null}
                                      </Form.Group>

                                      <Row>
                                        <Col lg={6} xs={12}>
                                          <Form.Group>
                                              <Form.Label>{t('Language')}</Form.Label>
                                              <LanguageDropdown name='language' placeholder={t('Language')}
                                                  className={validator.touched.language && validator.errors.language ? "is-invalid" : ""}
                                                  onChange={(value) => validator.setFieldValue('language', value)}
                                                  value={validator.values.language} />

                                              {validator.touched.language && validator.errors.language ? (
                                                  <Form.Control.Feedback type="invalid" className="d-block">
                                                      {validator.errors.language}
                                                  </Form.Control.Feedback>
                                              ) : null}
                                          </Form.Group>
                                        </Col>
                                        <Col lg={6} xs={12}>
                                          <Form.Group>
                                              <Form.Label>{t('Time zone')}</Form.Label>
                                              <TimezoneDropdown name='timezone' placeholder={t('Timezone')}
                                                  className={validator.touched.timezone && validator.errors.timezone ? "is-invalid" : ""}
                                                  onChange={(value) => validator.setFieldValue('timezone', value)}
                                                  value={validator.values.timezone} />

                                              {validator.touched.timezone && validator.errors.timezone ? (
                                                  <Form.Control.Feedback type="invalid" className="d-block">
                                                      {validator.errors.timezone}
                                                  </Form.Control.Feedback>
                                              ) : null}
                                          </Form.Group>
                                        </Col>
                                      </Row>
                                      <Form.Group className="mb-0">
                                          <Button variant="primary" type="submit">{t('Submit')}</Button>
                                      </Form.Group>
                                    </Form>
                                </div>
                            </Col>

                            <Col lg={6}>
                                <div>
                                    <Media>
                                        <div className="pt-1">
                                            <Icon name="info" className="icon icon-sm svg-outline-secondary" />
                                        </div>
                                        <Media.Body>
                                            <div className="px-3">
                                                <h2 className="m-0 mb-2">{t('Additional info')}</h2>
                                                <p className="text-wrap pb-0 text-muted w-75">
                                                    {t("Username and email address is unique for each account. You can't change it.")}
                                                </p>
                                            </div>
                                        </Media.Body>
                                    </Media>
                                </div>
                            </Col>
                        </Row>
                    </> : null}
                </div>
            </Card.Body>
        </Card>

        {error ? <MessageAlert message={error} icon={"x"} iconWrapperClass="bg-danger text-white p-2 rounded-circle" iconClass="icon-md" /> : null}
        {profileUpdated ? <MessageAlert message={t('Your profile is saved')} icon={"check"} iconWrapperClass="bg-success text-white p-2 rounded-circle" iconClass="icon-sm" /> : null}
    </>;
}

export default withRouter(Profile);
