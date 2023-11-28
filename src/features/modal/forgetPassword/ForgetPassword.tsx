import {FC, useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import * as Yup from "yup";
import {useTranslation} from "react-i18next";

import "./ForgetPassword.scss"
import {useFormik} from "formik";
import clsx from "clsx";
import ButtonFirst from "../../components/button/ButtonFirst";
import {forgetPassword} from "../../../app/API/UserApi";
import {userSetUserName} from "../../../app/slice/UserSlice";


type Props = {
  active: boolean
  setStatusModal(value: string): void,
}

const ForgetPassword: FC<Props> = (props) => {

  const {active, setStatusModal} = props;

  const {success} = useAppSelector((state) => state.user)

  useEffect(() => {
    if (success === 'success' && active) setStatusModal('confirmPassword')
  }, [success])

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const forgetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .required(t('errors.required'))
      .email(t('errors.email'))
  })

  const [forgetPasswordValues] = useState({
    email: ''
  })


  useEffect(() => {
    if (!active) {
      formik.resetForm()
    }
  }, [active])


  const formik = useFormik({
    initialValues: forgetPasswordValues,
    validationSchema: forgetPasswordSchema,
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true)

      dispatch(forgetPassword(values.email))
      dispatch(userSetUserName(values.email))

    }

  })

  return (
    <div className={active ? "forget-password forget-password_active" : "forget-password forget-password_hidden"}>
      <div className={"forget-password__title"}>{t('popup.forgetPassword.title')}</div>
      <div className={"forget-password__description"}>{t('popup.forgetPassword.description')}</div>
      <form className={"forget-password__form"} onChange={formik.handleChange} onSubmit={formik.handleSubmit} noValidate>

        <div>
          <input
            {...formik.getFieldProps('email')}
            placeholder={t('input.email')}
            name='email'
            className={clsx(
              'forget-password__input',
              {'forget-password__input_invalid': formik.touched.email && formik.errors.email},
              {'forget-password__input_valid': formik.touched.email && !formik.errors.email}
            )}
            disabled={formik.isSubmitting}
          />
          {formik.touched.email && formik.errors.email && (
            <div className='forget-password__error'>
              <div className='forget-password__error_text'>
                <span role='alert'>{formik.errors.email}</span>
              </div>
            </div>
          )}
        </div>

        <div className='forget-password_mt40'></div>
        <ButtonFirst text={t('popup.forgetPassword.btn')} disable={formik.isSubmitting || !formik.isValid || !formik.touched}/>
      </form>
    </div>
  );
};

export default ForgetPassword;