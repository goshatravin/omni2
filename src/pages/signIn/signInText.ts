/* eslint-disable import/prefer-default-export */
export const Text = {
  inputs: {
    userName: {
      placeholder: 'Логин',
      validation: {
        required: 'Поле логин обязательно к заполнению',
        minLength: {
          message: 'Должно присутствовать минимум 3 символа'
        }
      }
    },
    password: {
      placeholder: 'Пароль',
      validation: {
        required: 'Поле логин обязательно к заполнению',
        minLength: {
          message: 'Должно присутствовать минимум 3 символа'
        }
      }
    }
  },
  buttons: {
    signInSend: {
      value: 'Войти'
    }
  },
  logo: {
    text: 'стаканчик.'
  }
};
