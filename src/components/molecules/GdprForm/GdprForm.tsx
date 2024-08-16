import {Form, Input, Switch} from 'antd';


import './gdprForm.less';

const GDPR_ITEM_NAME = 'gdpr';
const COMPANY_ITEM_NAME = 'company';
const EMAIL_ITEM_NAME = 'email';
const LOCATION_ITEM_NAME = 'location';

const GdprForm = () => {
    /*const activateGdpr = () => {
        /!*updateValue((prevValue) => ({
            ...prevValue,
            gdpr: true,
            errors: { ...prevValue.errors, company: undefined },
        }));*!/
    };

    const disableGdpr = () => {
        /!*updateValue((prevValue) => ({
            ...prevValue,
            gdpr: false,
            errors: { ...prevValue.errors, company: undefined },
        }));*!/
    };*/

    return (
        <section className="gdpr-form">
                <h3 className="gdpr-form__title">
                    Step 2: Confirm your GDPR compliancy settings
                </h3>
            <p className="gdpr-form__description">
                Enabling your GDPR compliancy settings in Demio will disable certain
                features and require registrants to confirm their request for more
                information. All EU companies should enable this setting.
            </p>

            <Form.Item<boolean>
                className="gdpr-form__form-item gdpr-form__form-item--left-aligned"
                name={GDPR_ITEM_NAME}
                label="Enable GDPR compliancy settings in Demio"
                valuePropName="checked"
            >
                <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
            </Form.Item>
            <Form.Item<string>
                className="gdpr-form__form-item"
                name={COMPANY_ITEM_NAME}
                label="Company name"
                hasFeedback
                messageVariables={{ label: 'Company name' }}
                rules={[
                    {
                        required: true,
                        whitespace: true,
                        max: 255,
                    },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                getFieldValue(GDPR_ITEM_NAME as any) === true &&
                                value === undefined
                            ) {
                                return Promise.reject(
                                    new Error('Please, enter your company name.')
                                );
                            }

                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input placeholder="Enter your company name" />
            </Form.Item>
            <Form.Item<string>
                className="gdpr-form__form-item"
                name={LOCATION_ITEM_NAME}
                label="Company location"
                hasFeedback
                messageVariables={{ label: 'Company location' }}
                rules={[
                    {
                        required: false,
                        whitespace: true,
                        max: 255,
                    },
                ]}
            >
                <Input placeholder="Enter your company location" />
            </Form.Item>
            <Form.Item<string>
                className="gdpr-form__form-item"
                name={EMAIL_ITEM_NAME}
                label="Your email"
                hasFeedback
                messageVariables={{ label: 'Your email' }}
                rules={[
                    {
                        required: false,
                        whitespace: true,
                        max: 255,
                    },
                    { type: 'email' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (
                                getFieldValue(GDPR_ITEM_NAME as any) === true &&
                                value === undefined
                            ) {
                                return Promise.reject(new Error('Please, enter your email.'));
                            }

                            return Promise.resolve();
                        },
                    }),
                ]}
            >
                <Input placeholder="Enter your email" />
            </Form.Item>
        </section>
    );
};

export default GdprForm;
