import cx from "classnames";
import { Button, ButtonProps } from "antd";
import { SubmitButton, SubmitButtonProps } from "../../atoms";
import { omitKeys } from "../../../utils";

import "./formControls.less";

type FormControlsProps = React.HTMLAttributes<HTMLDivElement> & {
  resetButton?: Omit<ButtonProps, "htmlType" | "children" | "type"> & {
    text?: string;
  };
  submitButton?: Omit<SubmitButtonProps, "type" | "ghost" | "children"> & {
    text?: string;
  };
};

/**
 * Combined Form controls with 2 buttons: Submit and Reset
 * @param {FormControlsProps} props - consist of:
 * {string} className - alternative css class name of the main container;
 * {ButtonProps} resetButton - reset button options;
 * {SubmitButtonProps} submitButton - submit button options
 * @returns {JSX.Element}
 */
const FormControls = ({
  className,
  resetButton,
  submitButton,
  ...props
}: FormControlsProps) => (
  <div className={cx("custom-form-controls", className)} {...props}>
    {resetButton !== undefined && (
      <Button
        className={cx(
          "custom-form-controls__btn",
          "custom-form-controls__btn--reset",
          resetButton.className,
        )}
        htmlType="button"
        type="default"
        {...omitKeys(resetButton, ["className"])}
      >
        {resetButton?.text ?? "Reset"}
      </Button>
    )}
    <SubmitButton
      className={cx(
        "custom-form-controls__btn",
        "custom-form-controls__btn--submit",
        submitButton?.className,
      )}
      type="primary"
      {...omitKeys(submitButton ?? {}, ["className", "text"])}
    >
      {submitButton?.text ?? "Submit"}
    </SubmitButton>
  </div>
);

export default FormControls;
