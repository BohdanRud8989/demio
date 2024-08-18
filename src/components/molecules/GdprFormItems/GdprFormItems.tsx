import * as React from "react";
import { Form, FormInstance, Input, Switch } from "antd";
import { FormValues } from "../../../types";

import "./gdprFormItems.less";

type GdprFormProps = {
  form: FormInstance<FormValues>;
};

const GDPR_ITEM_NAME = "gdpr";
const COMPANY_ITEM_NAME = "company";
const EMAIL_ITEM_NAME = "email";
const LOCATION_ITEM_NAME = "location";

/**
 * GDPR compliance form items: gathers all info about GDPR policies
 * @param {GdprFormProps} form - The instance of the parent form, where this component will be used
 * @field gdpr - string
 * @field company - string
 * @field email - string
 * @field location - string
 * @returns {JSX.Element}
 */
const GdprFormItems = React.memo(({ form }: GdprFormProps) => {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  const gdpr = Form.useWatch<FormValues["gdpr"]>(GDPR_ITEM_NAME as any, form);
  /* eslint-enable */

  return (
    <section className="gdpr-form-items">
      <h3 className="gdpr-form-items__title">
        Step 2: Confirm your GDPR compliancy settings
      </h3>
      <p className="gdpr-form-items__description">
        Enabling your GDPR compliancy settings in Demio will disable certain
        features and require registrants to confirm their request for more
        information. All EU companies should enable this setting.
      </p>

      <Form.Item<boolean>
        className="gdpr-form-items__form-item gdpr-form-items__form-item--left-aligned"
        name={GDPR_ITEM_NAME}
        label="Enable GDPR compliancy settings in Demio"
        valuePropName="checked"
      >
        <Switch checkedChildren="Active" unCheckedChildren="Disabled" />
      </Form.Item>

      {(gdpr as FormValues["gdpr"]) && (
        <>
          <Form.Item<string>
            className="gdpr-form-items__form-item"
            name={COMPANY_ITEM_NAME}
            label="Company name"
            hasFeedback
            messageVariables={{ label: "Company name" }}
            rules={[
              {
                required: true,
                whitespace: true,
                max: 255,
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  if (
                    getFieldValue(GDPR_ITEM_NAME as any) === true &&
                    value === undefined
                  ) {
                    return Promise.reject(
                      new Error("Please, enter your company name."),
                    );
                  }
                  /* eslint-enable */

                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Enter your company name" />
          </Form.Item>
          <Form.Item<string>
            className="gdpr-form-items__form-item"
            name={EMAIL_ITEM_NAME}
            label="Your email"
            hasFeedback
            messageVariables={{ label: "Your email" }}
            rules={[
              {
                required: false,
                whitespace: true,
                max: 255,
              },
              { type: "email" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  /* eslint-disable @typescript-eslint/no-explicit-any */
                  // disabled since ant Design don't expose NamePath<Values> type
                  if (
                    getFieldValue(GDPR_ITEM_NAME as any) === true &&
                    value === undefined
                  ) {
                    return Promise.reject(
                      new Error("Please, enter your email."),
                    );
                  }
                  /* eslint-enable */
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item<string>
            className="gdpr-form-items__form-item"
            name={LOCATION_ITEM_NAME}
            label="Company location"
            hasFeedback
            messageVariables={{ label: "Company location" }}
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
        </>
      )}
    </section>
  );
});

export default GdprFormItems;
