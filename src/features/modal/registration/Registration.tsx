import {FC, useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import * as Yup from "yup";
import {useFormik} from "formik";
import "./Registration.scss"
import clsx from "clsx";
import ButtonFirst from "../../components/button/ButtonFirst";
import {signUp} from "../../../app/API/UserApi";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";

type Props = {
  active: boolean
  setStatusModal(value: string): void,
}

const Registration: FC<Props> = (props) => {

  const {active, setStatusModal} = props

  const {success, errorData} = useAppSelector((state) => state.user)

  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  useEffect(() => {
    if (success === 'success' && active) setStatusModal('auth')
  }, [success])

  const spheresOfActivity = t('input.spheresOfActivity')

  const registrationSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('errors.required'))
      .max(150, t('errors.max150')),
    email: Yup.string()
      .required(t('errors.required'))
      .email(t('errors.email')),
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
    sphere: Yup.string()
      .required(t('errors.required')),
    organization: Yup.string()
      .required(t('errors.required'))
      .max(150, t('errors.max150')),

  })

  const [registrationValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    sphere: '',
    organization: ''
  })


  useEffect(() => {
    if (!active) {
      formik.resetForm()
    }
  }, [active])

  const formik = useFormik({
    initialValues: registrationValues,
    validationSchema: registrationSchema,
    onSubmit: (values, {setSubmitting}) => {
      setSubmitting(true)

      const data = {
        email: values.email,
        password: values.password,
        name: values.name,
        sphere: values.sphere,
        organization: values.organization
      }

      dispatch(signUp(data))
    }
  })

  return (
    <div className={active ? "registration registration_active" : "registration registration_hidden"}>
      <div className={"registration__title"}>{t('popup.registration.title')}</div>
      <div className={"registration__description"}>{t('popup.registration.description')}</div>
      <form className={"registration__form"} onChange={formik.handleChange} onSubmit={formik.handleSubmit} noValidate>
        <div>
          <input
            {...formik.getFieldProps('name')}
            placeholder={t('input.name')}
            name='name'
            className={clsx(
              'registration__input registration__input_w440',
              {'registration__input_invalid': formik.touched.name && formik.errors.name},
              {'registration__input_valid': formik.touched.name && !formik.errors.name}
            )}
            disabled={formik.isSubmitting}
          />
          {formik.touched.name && formik.errors.name && (
            <div className='registration__error'>
              <div className='registration__error_text'>
                <span role='alert'>{formik.errors.name}</span>
              </div>
            </div>
          )}
        </div>

        <div className={"registration__form_wrap"} >

          <div>
            <input
              {...formik.getFieldProps('email')}
              type={"email"}
              placeholder={t('input.email')}
              name='email'
              className={clsx(
                'registration__input',
                {'registration__input_invalid': formik.touched.email && formik.errors.email},
                {'registration__input_valid': formik.touched.email && !formik.errors.email}
              )}
              disabled={formik.isSubmitting}
            />
            {formik.touched.email && formik.errors.email && (
              <div className='registration__error'>
                <div className='registration__error_text'>
                  <span role='alert'>{formik.errors.email}</span>
                </div>
              </div>
            )}
          </div>

          <div className={"registration__form_ml40"}>
            <select
              {...formik.getFieldProps('sphere')}
              name="sphere"
              className={clsx(
                'registration__select',
                {'registration__select_invalid': formik.touched.sphere && formik.errors.sphere},
                {'registration__select_valid': formik.touched.sphere && !formik.errors.sphere}
              )}
            >
              <option value="" disabled defaultValue={""} hidden>{t('input.sphere')}</option>
              {spheresOfActivity && spheresOfActivity.map((item: string) => <option key={item} value={item} >{item}</option>)}
            </select>
            {formik.touched.sphere && formik.errors.sphere && (
              <div className='registration__error'>
                <div className='registration__error_text'>
                  <span role='alert'>{formik.errors.sphere}</span>
                </div>
              </div>
            )}
          </div>

          <div className={"registration__form_ml40"}>
            <input
              {...formik.getFieldProps('organization')}
              placeholder={t('input.organization')}
              name='organization'
              className={clsx(
                'registration__input',
                {'registration__input_invalid': formik.touched.organization && formik.errors.organization},
                {'registration__input_valid': formik.touched.organization && !formik.errors.organization}
              )}
              disabled={formik.isSubmitting}
            />
            {formik.touched.organization && formik.errors.organization && (
              <div className='registration__error'>
                <div className='registration__error_text'>
                  <span role='alert'>{formik.errors.organization}</span>
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
               'registration__input',
               {'registration__input_invalid': formik.touched.password && formik.errors.password},
               {'registration__input_valid': formik.touched.password && !formik.errors.password}
             )}
             disabled={formik.isSubmitting}
           />
           {formik.touched.password && formik.errors.password && (
             <div className='registration__error'>
               <div className='registration__error_text'>
                 <span role='alert'>{formik.errors.password}</span>
               </div>
             </div>
           )}
         </div>

          <div className={"registration__form_ml40"}>
            <input
              {...formik.getFieldProps('confirmPassword')}
              placeholder={t('input.confirmPassword')}
              type={"password"}
              name='confirmPassword'
              className={clsx(
                'registration__input',
                {'registration__input_invalid': formik.touched.confirmPassword && formik.errors.confirmPassword},
                {'registration__input_valid': formik.touched.confirmPassword && !formik.errors.confirmPassword}
              )}
              disabled={formik.isSubmitting}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <div className='registration__error'>
                <div className='registration__error_text'>
                  <span role='alert'>{formik.errors.confirmPassword}</span>
                </div>
              </div>
            )}
          </div>

        </div>

        <div className='registration_mt40'></div>
        <ButtonFirst text={t('popup.registration.btn')} disable={formik.isSubmitting || !formik.isValid || !formik.touched}/>
      </form>
    </div>
  );
};

export default Registration;