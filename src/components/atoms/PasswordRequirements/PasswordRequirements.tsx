import cx from "classnames";
import { validatePassword } from "../../../utils";

import "./passwordRequirements.less";

type PasswordRequirementsProps = Omit<
  React.HTMLAttributes<HTMLUListElement>,
  "children"
> & {
  value?: string;
};

/**
 * Validates the password and displays which rules are fulfilled and which are not
 * @param {string} value - password to validate
 * @param {string} className - alternative css class name of the main container
 * @param {Object} props - rest of props
 * @returns {JSX.Element}
 */
const PasswordRequirements = ({
  value,
  className,
  ...props
}: PasswordRequirementsProps) => {
  const { details } =
    value !== undefined
      ? validatePassword(value, true)
      : { details: undefined };

  return (
    <ul className={cx("password-requirements", className)} {...props}>
      <li
        className={cx("password-requirements__item", {
          "password-requirements__item--success": details?.exceedsMinLength,
        })}
      >
        At least 8 characters in length
      </li>
      <li
        className={cx("password-requirements__item", {
          "password-requirements__item--success": details?.containsUpperCase,
        })}
      >
        At least one uppercase character [A-Z]
      </li>
      <li
        className={cx("password-requirements__item", {
          "password-requirements__item--success": details?.containsDigit,
        })}
      >
        At least one digit
      </li>
    </ul>
  );
};

export default PasswordRequirements;
