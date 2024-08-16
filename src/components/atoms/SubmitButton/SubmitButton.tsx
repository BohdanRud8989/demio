import { Button, ButtonProps, Form, FormInstance } from 'antd';

export type SubmitButtonProps = Omit<ButtonProps, 'htmlType'>;

const SubmitButton = ({
  disabled,
  children,
  ...props
}: SubmitButtonProps) => {
  const someFilled = (values: any[]): boolean =>
    values.some((value) => {
      if (
        !Array.isArray(value) &&
        (typeof value !== 'object' || value === null)
      ) {
        return value !== undefined;
      }
      return someFilled(!Array.isArray(value) ? Object.values(value) : value);
    });

  const hasErrors = (fieldError: ReturnType<FormInstance['getFieldsError']>) =>
    fieldError.some(({ errors }) => errors.length > 0);

  return (
    <Form.Item noStyle shouldUpdate>
      {({ getFieldsValue, getFieldsError }) => {
        const fieldsValue = getFieldsValue();
        const fieldsError = getFieldsError();

        return (
          <Button
            htmlType="submit"
            disabled={
              disabled ||
              hasErrors(fieldsError) ||
              !someFilled(Object.values(fieldsValue))
            }
            {...props}
          >
            {children}
          </Button>
        );
      }}
    </Form.Item>
  );
};

export default SubmitButton;
