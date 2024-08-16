import { Form, FormInstance, Input } from 'antd';
import { validatePassword } from '../../../utils';
import { FormValues } from '../../../types';
import { PasswordRequirements } from '../../atoms';

import './passwordForm.less';

const { Password } = Input;

type PasswordFormProps = {
    form: FormInstance<FormValues>;
};

const PASSWORD_FIRST_ITEM_NAME = 'passwordFirst';
const PASSWORD_SECOND_ITEM_NAME = 'passwordSecond';

const PasswordForm = ({ form }: PasswordFormProps) => {
    // TODO get rid of any
    const passwordFirst = Form.useWatch<FormValues["passwordFirst"]>(
        PASSWORD_FIRST_ITEM_NAME as any,
        form
    );

    return (
        <section className="password-form">

                <h3 className="password-form__title">Step 1: Update your password</h3>

            <PasswordRequirements value={passwordFirst as FormValues["passwordFirst"]} />
            <Form.Item<string>
                className="password-form__form-item"
                name={PASSWORD_FIRST_ITEM_NAME}
                label="New password"
                hasFeedback
                validateFirst
                rules={[
                    {
                        required: true,
                        whitespace: true,
                    },
                    {
                        validator: (_, value: string) => {
                            const { valid } = validatePassword(value, true);
                            return !valid
                                ? Promise.reject(
                                    new Error(
                                        'Password length must be at least 8 characters containing at least 1 uppercase letter and 1 number.'
                                    )
                                )
                                : Promise.resolve();
                        },
                    },
                ]}
                messageVariables={{ label: 'Password' }}
            >
                <Password placeholder="Set your new  password" autoFocus />
            </Form.Item>
            <Form.Item<string>
                className="password-form__form-item"
                name={PASSWORD_SECOND_ITEM_NAME}
                label="Repeat new password"
                hasFeedback
                validateFirst
                rules={[
                    {
                        required: true,
                        whitespace: true,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                value === undefined ||
                                getFieldValue(PASSWORD_FIRST_ITEM_NAME as any) === value
                            ) {
                                // TODO get rid of any
                                return Promise.resolve();
                            }

                            return Promise.reject(new Error("Passwords don't match"));
                        },
                    }),
                ]}
                messageVariables={{ label: 'password one more time' }}
            >
                <Password placeholder="Repeat your new password" />
            </Form.Item>
        </section>
    );
};

export default PasswordForm;
