import { useState } from "react";
import { Form, Grid, message } from "antd";
import {
  PasswordFormItems,
  GdprFormItems,
  FormControls,
} from "../../molecules";
import { FormValues } from "../../../types";
import { initialFormValue } from "../../../utils";
import { useTask, useEngagementTracker } from "../../../hooks";
import { saveDataToApi } from "../../../data";
import { SaveGdprRequestPayload } from "../../../types";

import "./passwordGdprForm.less";

const { useBreakpoint } = Grid;

type GdprUpdatePasswordProps = {
  redirectUrl?: string;
};

/**
 * Main Form which are build from Password and GDPR form items
 * @param {string} redirectUrl - url to redirect user after once form has been submitted
 * @returns {JSX.Element}
 */
const PasswordGdprForm = ({ redirectUrl }: GdprUpdatePasswordProps) => {
  const [form] = Form.useForm<FormValues>();
  const [messageApi, contextHolder] = message.useMessage();
  const { lg: isDesktop } = useBreakpoint();
  const [isRedirectingUser, setIsRedirectingUser] = useState(false);
  const {
    totalTime: sessionTime,
    engagementPercentage,
    resetTracker,
  } = useEngagementTracker();

  const handleReset = () => {
    form.resetFields();
    // reset tracker manually in case user won't be redirected to other page
    resetTracker();
  };

  /* it's breaks Single Responsibility principle, but it's not possible
     to call this method in App.tsx since it requires messageApi */
  const redirectUser = (redirectUrl: string = "") => {
    if (typeof redirectUrl === "string") {
      setIsRedirectingUser(true);
      messageApi.open({
        type: "loading",
        content: `redirecting user to  ${redirectUrl}`,
        duration: 5,
        onClose: () => {
          setIsRedirectingUser(false);
          window.location.href = redirectUrl;
        },
      });
      const timeoutID = setTimeout(() => {
        window.location.href = redirectUrl;
        clearTimeout(timeoutID);
      }, 5000);
    }
  };

  const notifyAboutError = (error: string) => {
    messageApi.open({
      type: "error",
      content: error,
      duration: 5,
    });
  };

  // Submits the form(saves the data to API and if it's successful redirects the user)
  const [submitting, handleSubmit] = useTask(async (values: FormValues) => {
    const { passwordFirst, gdpr, company, email, location } = values;

    const [isGdprSaved, isPasswordSaved] = await Promise.all([
      saveGdpr({
        gdpr,
        company,
        email,
        location,
        sessionTime,
        engagementPercentage,
      } as SaveGdprRequestPayload),
      savePassword(passwordFirst),
    ]);
    if (isGdprSaved && isPasswordSaved) {
      handleReset();
      messageApi.open({
        type: "success",
        content: `Password and preferences successfully updated. User session time: ${sessionTime}, engagement: ${engagementPercentage}%`,
        duration: 5,
        onClose: () => {
          redirectUser(redirectUrl);
        },
      });
    }
  });

  const saveGdpr = async ({
    gdpr,
    company,
    email,
    location,
    sessionTime,
    engagementPercentage,
  }: SaveGdprRequestPayload): Promise<boolean> =>
    await saveDataToApi(
      "/manage/settings/general/save-gdpr",
      { gdpr, company, email, location, sessionTime, engagementPercentage },
      (error) => notifyAboutError(error),
    );

  const savePassword = async (
    password: FormValues["passwordFirst"],
  ): Promise<boolean> =>
    saveDataToApi(
      "/manage/settings/general/save-strong-password",
      { passwordFirst: password },
      (error) => notifyAboutError(error),
    );

  return (
    <>
      {isDesktop ? (
        <>
          {/* This solution provided by ant Design itself to make messageApi work */}
          {contextHolder}
          <Form<FormValues>
            className="password-gdpr-form"
            form={form}
            layout="vertical"
            requiredMark={false}
            onFinish={handleSubmit}
            initialValues={initialFormValue}
          >
            <PasswordFormItems form={form} />
            <GdprFormItems form={form} />
            <FormControls
              resetButton={{ onClick: handleReset, text: "Reset form" }}
              submitButton={{
                loading: submitting || isRedirectingUser,
                disabled: submitting || isRedirectingUser,
                text: "Update My Password & Preferences",
              }}
            />
          </Form>
        </>
      ) : (
        <main className="password-gdpr-form__no-support">
          This form is not available from mobile devices
        </main>
      )}
    </>
  );
};

export default PasswordGdprForm;
