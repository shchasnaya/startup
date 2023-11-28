import {FC, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {useFormik} from "formik";
import "./ConfirmPassword.scss"
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {confirmPassword, signUp} from "../../../app/API/UserApi";
import clsx from "clsx";
import ButtonFirst from "../../components/button/ButtonFirst";

type Props = {
  active: boolean
  setStatusModal(value: string): void,
}

const ConfirmPassword: FC<Props> = (props) => {

  const {active, setStatusModal} = props

  const {success, errorData, userName} = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (success === 'success' && active) setStatusModal('auth')
  }, [success])

  const confirmPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .required(t('errors.required'))
      .min(8, t('errors.min8'))
      .max(16, t('errors.max16'))
      .test('password-notUpperLetter', t('errors.notUpperLetter'), value => /[A-Z]/.test(value))
      .test('password-notLowLetter', t('errors.notLowLetter'), value => /[a-z]/.test(value))
      .test('password-isSpaces', t('errors.isSpaces'), value => !/\s/.test(value))
      .test('password-notSymbol', t('errors.notSymbol'), value => /[!@#$%^&*(),.?":{}|<>_-]/.test(value))
      .test('password-fiveLetter', t('errors.fiveLetter'), value => !/(.)\1{4,}/.test(value))
      .test('password-fiveNumbers', t('errors.fiveNumbers'), value => !/\d{5,}/.test(value)),
    confirmPassword: Yup.string()
      .required(t('errors.required')).when('password', (password, field) =>
        password ? field.oneOf([Yup.ref('password')], t('errors.notMatchPassword')) : field),
    confirmCode:  Yup.string()
      .required(t('errors.required'))

  })

  const [confirmPasswordValues] = useState({
    email: userName,
    password: '',
    confirmPassword: '',
    confirmCode: ''
  })


  useEffect(() => {
    if (!active) {
      formik.resetForm()
    }
  }, [active])

  const formik = useFormik({
    initialValues: confirmPasswordValues,
    validationSchema: confirmPasswordSchema,
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true)

      const data = {
        email: values.email,
        password: values.password,
        confirmCode: values.confirmCode
      }

      dispatch(confirmPassword(data))
    }
  })

  return (
    <div className={active ? "confirm-password confirm-password_active" : "confirm-password confirm-password_hidden"}>
      <div className={"confirm-password__title"}>{t('popup.confirmPassword.title')}</div>
      <div className={"confirm-password__description"}>{t('popup.confirmPassword.description')}</div>
      <form className={"confirm-password__form"} onChange={formik.handleChange} onSubmit={formik.handleSubmit} noValidate>

        <div>
          <input
            {...formik.getFieldProps('confirmCode')}
            placeholder={t('input.confirmCode')}
            name='confirmCode'
            className={clsx(
              'confirm-password__input',
              {'confirm-password__input_invalid': formik.touched.confirmCode && formik.errors.confirmCode},
              {'confirm-password__input_valid': formik.touched.confirmCode && !formik.errors.confirmCode}
            )}
            disabled={formik.isSubmitting}
          />
          {formik.touched.confirmCode && formik.errors.confirmCode && (
            <div className='confirm-password__error'>
              <div className='confirm-password__error_text'>
                <span role='alert'>{formik.errors.confirmCode}</span>
              </div>
            </div>
          )}
        </div>

        <div className={"registration__form_wrap"} >

          <div>
            <input
              {...formik.getFieldProps('password')}
              placeholder={t('input.password')}
              name='password'
              type={"password"}
              className={clsx(
                'confirm-password__input',
                {'confirm-password__input_invalid': formik.touched.password && formik.errors.password},
                {'confirm-password__input_valid': formik.touched.password && !formik.errors.password}
              )}
              disabled={formik.isSubmitting}
            />
            {formik.touched.password && formik.errors.password && (
              <div className='confirm-password__error'>
                <div className='confirm-password__error_text'>
                  <span role='alert'>{formik.errors.password}</span>
                </div>
              </div>
            )}
          </div>

          <div className={"registration__form_ml40"}>
            <input
              {...formik.getFieldProps('confirmPassword')}
              placeholder={t('input.confirmPassword')}
              name='confirmPassword'
              type={"password"}
              className={clsx(
                'confirm-password__input',
                {'confirm-password__input_invalid': formik.touched.confirmPassword && formik.errors.confirmPassword},
                {'confirm-password__input_valid': formik.touched.confirmPassword && !formik.errors.confirmPassword}
              )}
              disabled={formik.isSubmitting}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className='confirm-password__error'>
                <div className='confirm-password__error_text'>
                  <span role='alert'>{formik.errors.confirmPassword}</span>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className='confirm-password_mt40'></div>
        <ButtonFirst text={t('popup.confirmPassword.btn')} disable={formik.isSubmitting || !formik.isValid || !formik.touched}/>
      </form>
    </div>
  );
};

export default ConfirmPassword;