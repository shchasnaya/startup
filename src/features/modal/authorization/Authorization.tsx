import React, {FC, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {useFormik} from "formik";
import clsx from "clsx";
import ButtonFirst from "../../components/button/ButtonFirst";
import "./Authorization.scss"
import {login} from "../../../app/API/UserApi";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {Navigate, Route, Routes} from "react-router-dom";

type Props = {
  active: boolean
  setStatusModal(value: string): void,
}

const Authorization: FC<Props> = (props) => {

  const {active, setStatusModal} = props;

  const [redirect, setRedirect] = useState(false);

  const {success} = useAppSelector((state) => state.user)

  useEffect(() => {
    if (success === 'success' && active) setRedirect(true)
  }, [success])

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const authSchema = Yup.object().shape({
    username: Yup.string()
      .required(t('errors.required'))
      .email(t('errors.email')),
    password: Yup.string()
      .required(t('errors.required'))
  })

  const [authValues] = useState({
    username: '',
    password: '',
  })


  useEffect(() => {
    if (!active) {
      formik.resetForm()
    }
  }, [active])


  const formik = useFormik({
    initialValues: authValues,
    validationSchema: authSchema,
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true)

      const data = {
        username: values.username,
        password: values.password
      }

      dispatch(login(data))
    }

  })

  return (
    <div className={active ? "authorization authorization_active" : "authorization authorization_hidden"}>
      <div className={"authorization__title"}>{t('popup.authorization.title')}</div>
      <div className={"authorization__description"}>{t('popup.authorization.description')}</div>
      <form className={"authorization__form"} onChange={formik.handleChange} onSubmit={formik.handleSubmit} noValidate>

        <div>
          <input
            {...formik.getFieldProps('username')}
            placeholder={t('input.email')}
            name='username'
            className={clsx(
              'authorization__input',
              {'authorization__input_invalid': formik.touched.username && formik.errors.username},
              {'authorization__input_valid': formik.touched.username && !formik.errors.username}
            )}
            disabled={formik.isSubmitting}
          />
          {formik.touched.username && formik.errors.username && (
            <div className='authorization__error'>
              <div className='authorization__error_text'>
                <span role='alert'>{formik.errors.username}</span>
              </div>
            </div>
          )}
        </div>

        <div>
          <input
            {...formik.getFieldProps('password')}
            placeholder={t('input.password')}
            type={"password"}
            name='password'
            className={clsx(
              'authorization__input',
              {'authorization__input_invalid': formik.touched.password && formik.errors.password},
              {'authorization__input_valid': formik.touched.password && !formik.errors.password}
            )}
            disabled={formik.isSubmitting}
          />
          {formik.touched.password && formik.errors.password && (
            <div className='authorization__error'>
              <div className='authorization__error_text'>
                <span role='alert'>{formik.errors.password}</span>
              </div>
            </div>
          )}
        </div>

        <div className='authorization_mt40'></div>
        <ButtonFirst text={t('popup.authorization.btn')} disable={formik.isSubmitting || !formik.isValid || !formik.touched}/>
      </form>
      <button onClick={() => setStatusModal('forgetPassword')} className={"authorization__forget-password"}>{t('popup.authorization.forgetPassword')}</button>
      <div className={"authorization__not-account"}>
        <div className={"authorization__not-account_title"}>{t('popup.authorization.notAccount')}</div>
        <button onClick={() => setStatusModal('registration')} className={"authorization__not-account_btn"}>{t('popup.authorization.registration')}</button>
      </div>
      {redirect && (
        <Routes>
          <Route index element={<Navigate to='/profile'/>}/>
        </Routes>
      )}
    </div>
  );
};

export default Authorization;