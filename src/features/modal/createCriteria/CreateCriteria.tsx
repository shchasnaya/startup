import {FC, useEffect, useState} from 'react';
import * as Yup from "yup";
import {useTranslation} from "react-i18next";
import "./CreateCriteria.scss"
import {useFormik} from "formik";
import clsx from "clsx";
import ButtonFirst from "../../components/button/ButtonFirst";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {postCriteria, putCriteria} from "../../../app/API/CriteriaAPI";
import Loader from "../../components/loader/Loader";
import {NavLink} from "react-router-dom";

type Props = {
  active: boolean
}

const CreateCriteria: FC<Props> = (props) => {

  const {active} = props

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const {selected, criteria} = useAppSelector((state) => state.parameter)
  const {loadingStatus, status, action} = useAppSelector((state) => state.criteria)

  const createCriteriaSchema = Yup.object().shape({
    name: Yup.string()
      .max(50, t('errors.max50'))
      .required(t('errors.required')),
    description: Yup.string()
      .max(150, t('errors.max150'))
      .required(t('errors.required'))
  })

  const [criteriaValues] = useState({
    name: action === 'update' ? criteria.name : '',
    description: action === 'update' ? criteria.description : '',
  })


  useEffect(() => {
    if (!active) {
      if (action === 'update') {
        formik.setValues({
          name: criteria.name,
          description: criteria.description,
        })
      } else formik.resetForm()

    }
  }, [active, action])

  const formik = useFormik({
      initialValues: criteriaValues,
      validationSchema: createCriteriaSchema,
      onSubmit: async (values, {setSubmitting}) => {

        setSubmitting(true)
        const data = {
          id: action === 'update' ? criteria.id : undefined,
          name: values.name,
          description: values.description,
          criteriaIds: selected
        }
        if (action === 'create') {
          dispatch(postCriteria(data))
        } else dispatch(putCriteria(data))
      }
    })

  return (
    <div className={"create-criteria"}>
      <div className={"create-criteria__title"}>{action === 'update' ? t('popup.createCriteria.titleUpdate') : t('popup.createCriteria.title')}</div>
      {loadingStatus
        ?
        <Loader/>
        :
        (status === 'isCreate' || status === 'isUpdate')
        ?
          <div>
            <div className={"create-criteria__success"}>
              <div><img src={require("../../../_assets/icons/modal/success.svg").default} alt={"success upload icon"}/></div>
              <div>{action === 'update' ? t('popup.createCriteria.successUpdate') : t('popup.createCriteria.successCreate')}</div>
            </div>
            <NavLink className={"create-criteria__success_btn"} to={'/profile/criteria'}><ButtonFirst text={t('popup.createCriteria.btnToCabinet')} disable={false}/></NavLink>
          </div>
          :
          <>
            <div className={"create-criteria__description"}>{action === 'update' ? t('popup.createCriteria.descriptionUpdate') : t('popup.createCriteria.description')}</div>
            <form className={"create-criteria__form"} onChange={formik.handleChange} onSubmit={formik.handleSubmit} noValidate>

              <div>
                <input
                  {...formik.getFieldProps('name')}
                  placeholder={t('popup.createCriteria.nameCriteria')}
                  name='name'
                  id={"name"}
                  className={clsx(
                    'create-criteria__input',
                    {'create-criteria__input_invalid': formik.touched.name && formik.errors.name},
                    {'create-criteria__input_valid': formik.touched.name && !formik.errors.name}
                  )}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.name && formik.errors.name && (
                  <div className='create-criteria__error'>
                    <div className='create-criteria__error_text'>
                      <span role='alert'>{formik.errors.name}</span>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <input
                  {...formik.getFieldProps('description')}
                  placeholder={t('popup.createCriteria.descriptionCriteria')}
                  name='description'
                  id={"description"}
                  className={clsx(
                    'create-criteria__input create-criteria__input_w600',
                    {'create-criteria__input_invalid': formik.touched.description && formik.errors.description},
                    {'create-criteria__input_valid': formik.touched.description && !formik.errors.description}
                  )}
                  disabled={formik.isSubmitting}
                />
                {formik.touched.description && formik.errors.description && (
                  <div className='create-criteria__error'>
                    <div className='create-criteria__error_text'>
                      <span role='alert'>{formik.errors.description}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className='create-criteria_mt40'></div>
              <ButtonFirst text={action === 'update' ? t('popup.createCriteria.btnUpdate') : t('popup.createCriteria.btn')} disable={formik.isSubmitting || !formik.isValid || !formik.touched}/>
            </form>
          </>
      }
    </div>
  );
};

export default CreateCriteria;