import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ICU from 'i18next-icu';
import CreateCriteria from "../features/modal/createCriteria/CreateCriteria";
import Authorization from "../features/modal/authorization/Authorization";

i18n
  .use(ICU)
  .use(initReactI18next) // Подключаем react-i18next
  .init({
    fallbackLng: 'ua', // Язык по умолчанию
    debug: true,
    resources: {
      ua: {
        translation: {
          header: {
            analise: 'Аналіз стартапу',
            calculator: 'Калькулятор стартапу',
            authorization: 'Авторизація',
            logout: 'Вийти'
          },
          landing: {
            main: {
              title: 'Система комплексної оцінки рівня успішності стартап - проєктів',
              description: 'Зробіть аналіз Стартапу, отримайте оцінку та рекомендації',
              button: 'Аналіз стартапу',
              countAll: 'Оцінено стартапів',
              countAverage: 'Середня оцінка роботи сервісу',
            },
            howWork: {
              title: 'Як працює сервіс',
              description: 'Основною метою інформаційної системи є забезпечення ефективної та детальної оцінки startup-проєкту, спираючись на важливі для споживача критерії, а також реалізація процесу прогнозування розвитку startup-проекту з урахуванням вхідних даних, попереднього досвіду вітчизняних та міжнародних бізнес-проектів,  зовнішніх та внутрішніх факторів, що можуть вплинути на startup-проєкт. Процес має реалізовувати надання корисних рекомендацій та стратегій відносно можливих перспектив і наявних вразливостей, а також створення прогнозу його подальшого розвитку.',
              subTitle1: 'Реєструйтесь на сервісі',
              subTitle2: 'Пройдіть оцінку свого стартапу',
              subTitle3: 'Отримайте оцінку свого стартапу, та рекомендації на що звернути увагу для покращення бізнес моделі',
              subDescription2: '* Можливість налаштувати параметри для оцінки',
              step1: 'Крок 1',
              step2: 'Крок 2',
              step3: 'Крок 3',
            },
            audience: {
              title: 'Цільова аудиторія',
              items: [
                'Менеджери',
                'Стартапери',
                'Власники стартап-платформ',
                'Агенції регіонального розвитку',
                'Університети',
                'Власники бізнес-шкіл',
                'Власники бізнес-інкубаторів',
                'Інвестори',
                'Власники інших сервісів зі схожою тематикою'
              ],
              item1: 'Менеджери',
              item2: 'Стартапери',
              item3: 'Власники стартап-платформ',
              item4: 'Агенції регіонального розвитку',
              item5: 'Університети',
              item6: 'Власники бізнес-шкіл',
              item7: 'Власники бізнес-інкубаторів',
              item8: 'Інвестори',
              item9: 'Власники інших сервісів зі схожою тематикою'
            },
            result: {
              title: "Результат аналізу",
              subTitle1: "Загальна оцінка",
              subTitle2: "Оцінка \n по кожному критерію",
              subTitle3: "Рекомендації\nдо кожної категорії"
            }
          },
          profile: {
            tab1: 'Інформація про себе',
            tab2: 'Перегляд статистики',
            tab3: 'Налаштування набору критеріїв',
            criteria: {
              criteriaByMe: 'Мої набори критеріїв',
              defaultCriteria: 'Базові набори критеріїв',
              columnName: 'Назва',
              columnDescr: 'Опис',
              columnAction: 'Інструменти',
              button: 'Створити набір'
            }
          },
          popup: {
            selectCriteria: {
              title: 'Оберіть набір для аналізу стартапу',
              description: 'Оберіть набір налаштувань\nз допомогою якого Ви будете проводити оцінку стартап проєкту',
              criteriaByMe: 'Мої набори критеріїв',
              defaultCriteria: 'Базові набори критеріїв',
              btn: 'Почати'
            },
            createCriteria: {
              title: 'Створення назви набору',
              titleUpdate: 'Оновлення назви набору',
              description: 'Ви створили особистий набір критеріїв для аналізу стартапу,\nвведіть назву та опис.',
              descriptionUpdate: 'Ви оновили особистий набір критеріїв для аналізу стартапу,\nвведіть, за необхідності, назву та опис.',
              nameCriteria: 'Назва',
              descriptionCriteria: 'Опис',
              btn: 'Створити',
              btnUpdate: 'Оновити',
              btnToCabinet: 'В кабінет',
              successCreate: 'Ви створили особистий набір критеріїв для аналізу стартапу, набір буде відображено в особистому кабінеті та при виборі набору аналізу стартапу.',
              successUpdate: 'Ви оновили особистий набір критеріїв для аналізу стартапу, набір буде відображено в особистому кабінеті та при виборі набору аналізу стартапу.'
            },
            authorization: {
              title: 'Вхід',
              description: 'Увійдіть в аккаунт для повноцінного використання функціоналу cистеми',
              btn: 'Увійти',
              notAccount: 'У Вас немає аккаунту, ',
              registration: 'Зареєструвати',
              forgetPassword: 'Відновити пароль'
            },
            registration: {
              title: `Реєстрація`,
              description: `Введіть дані для реєстрації`,
              btn: 'Зареєструвати',
              isExistAcc: 'Увійти в існуючий аккаунт'
            },
            forgetPassword: {
              title: `Відновлення паролю`,
              description: `Ввійдіть електронну пошту, ми надішлемо лист з кодом для відновалння паролю`,
              btn: 'Надіслати лист',
            },
            confirmPassword: {
              title: `Відновлення паролю`,
              description: `Введіть код підтвердження та встановіть новий пароль`,
              btn: 'Замінити',
            }
          },
          setParameter: {
            title: 'Створення набору критеріїв',
            titleUpdate: 'Оновлення набору критеріїв',
            btnPrevious: 'Назад',
            btnNext: 'Далі',
            btnSend: 'Створити',
            btnUpdate: 'Оновити',
            notSelected: 'Потрібно обрати набори критеріїв'
          },
          analise: {
            skipQuestion: 'Пропустити питання',
            skipBlock: 'Пропустити блок питаннь',
            notAllAnswers: 'Потрібно надати відповіді на всі питання'
          },
          errors: {
            required: `Обов'язкове поле`,
            min8: 'Мінімум 8 символів',
            max16: 'Мінімум 16 символів',
            max50: 'Максимум 50 символів',
            max150: 'Максимум 150 символів',
            email: 'Некоректна електронна пошта',
            notMatchPassword: 'Не збігаються паролі',
            notUpperLetter: 'Не має літери у верхньому регістрі',
            notLowLetter: 'Не має літери у нижньому регістрі',
            isSpaces: 'Не повинен містити пробіли',
            notSymbol: 'Повинен містити спеціальний симпвол',
            fiveLetter: 'Не може містити 5 літер підряд',
            fiveNumbers: 'Не може містити 5 цифр підряд',
          },
          input: {
            email: 'Електронна пошта',
            password: 'Пароль',
            confirmPassword: 'Повторіть пароль',
            name: `Призвіще, ім'я, по батькові`,
            sphere: 'Сфера діяльності',
            spheresOfActivity: [
              "ІТ та технології",
              "Освіта та навчання",
              "Медицина та охорона здоров'я",
              "Фінанси та банківські послуги",
              "Мистецтво та розваги",
              "Туризм та подорожі",
              "Спорт та фітнес",
              "Харчова промисловість та ресторани",
              "Мода та одяг",
              "Автомобільна промисловість",
              "Нерухомість та будівництво",
              "Право та юридичні послуги",
              "Маркетинг та реклама",
              "Наука та дослідження",
              "Соціальні послуги та благодійність"
            ],
            organization: 'Організація',
            confirmCode: 'Код з листа'
          }
        },
      },
      en: {
        translation: {
          header: {
            analise: 'Startup analysis',
            calculator: 'Startup calculator',
            authorization: 'Authorization'
          },
          landing: {
            main: {
              title: 'The system for comprehensive assessment of the level of success of start-up projects',
              description: 'Analyze the Startup, get an assessment and recommendations',
              btn: 'Startup analysis',
              countAll: 'Evaluated startups',
              countAverage: 'Average rating of the service',
            }
          }
        },
      },
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

export default i18n;