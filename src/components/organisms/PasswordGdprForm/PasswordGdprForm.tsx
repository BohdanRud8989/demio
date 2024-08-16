import { Form, Grid, message } from 'antd';
import { PasswordForm, GdprForm, FormControls } from '../../molecules';
import { FormValues } from '../../../types';
import { initialFormValue } from '../../../utils';
import { useTask, useEngagementTracker } from '../../../hooks';
import { saveDataToApi } from '../../../data';

import './passwordGdprForm.less';

const { useBreakpoint } = Grid;

type GdprUpdatePasswordProps = {
    redirectUrl?: string;
};

const PasswordGdprForm = ({ redirectUrl }: GdprUpdatePasswordProps) => {
    const [form] = Form.useForm<FormValues>();
    const [messageApi, contextHolder] = message.useMessage();
    const { lg: isDesktop } = useBreakpoint();
    const {
        totalTime: sessionTime,
        engagementPercentage,
        resetTracker,
    } = useEngagementTracker();

    const handleReset = () => {
        form.resetFields();
    };

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
            }),
            savePassword(passwordFirst),
        ]);
        if (isGdprSaved && isPasswordSaved) {
            handleReset();
            messageApi.open({
                type: 'success',
                content: `Password and preferences successfully updated. User session time: ${sessionTime}, engagement: ${engagementPercentage}%`,
                duration: 5,
                onClose: () => {
                    resetTracker();
                    messageApi.open({
                        type: 'success',
                        content: `redirecting user to  ${redirectUrl}`,
                        duration: 5,
                    });
                },
            });
            if (redirectUrl !== undefined) {
                setTimeout(() => {
                    window.location.href = redirectUrl;
                }, 10000);
            }
        }
    });

    const saveGdpr = async ({
                                gdpr,
                                company,
                                email,
                                location,
                                sessionTime,
                                engagementPercentage,
                            }: Omit<FormValues, 'passwordFirst' | 'passwordSecond'> & {
        sessionTime: number;
        engagementPercentage: string;
    }): Promise<boolean> =>
        await saveDataToApi(
            '/manage/settings/general/save-gdpr',
            { gdpr, company, email, location, sessionTime, engagementPercentage },
            (error) => {
                messageApi.open({
                    type: 'error',
                    content: error,
                    duration: 5,
                });
            }
        );

    const savePassword = async (
        password: FormValues['passwordFirst']
    ): Promise<boolean> =>
        saveDataToApi(
            '/manage/settings/general/save-strong-password',
            { passwordFirst: password },
            (error) => {
                messageApi.open({
                    type: 'error',
                    content: error,
                    duration: 5,
                });
            }
        );

    return (
        <>
            {!isDesktop ? (
                <main className="password-gdpr-form__no-support">
                    This form is not available from mobile devices
                </main>
            ) : (
                <>
                    {contextHolder}
                    <Form<FormValues>
                        className="password-gdpr-form"
                        form={form}
                        layout="vertical"
                        requiredMark={false}
                        onFinish={handleSubmit}
                        initialValues={initialFormValue}
                    >
                        <PasswordForm form={form} />
                        <GdprForm />
                        <FormControls
                            resetButton={{ onClick: handleReset, text: 'Reset form' }}
                            submitButton={{
                                loading: submitting,
                                disabled: submitting,
                                text: 'Update My Password & Preferences',
                            }}
                        />
                    </Form>
                </>
            )}
        </>
    );
};

export default PasswordGdprForm;
