import cx from 'classnames';
import { validatePassword } from '../../../utils';

import './passwordRequirements.less';

type PasswordRequirementsProps = Omit<
    React.HTMLAttributes<HTMLUListElement>,
    'children'
    > & {
    value?: string;
};

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
        <ul className={cx('password-requirements', className)} {...props}>
            <li
                className={cx('password-requirements__item', {
                    'password-requirements__item--success': details?.exceedsMinLength,
                })}
            >
                At least 8 characters in length
            </li>
            <li
                className={cx('password-requirements__item', {
                    'password-requirements__item--success': details?.containsUpperCase,
                })}
            >
                At least one uppercase character [A-Z]
            </li>
            <li
                className={cx('password-requirements__item', {
                    'password-requirements__item--success': details?.containsDigit,
                })}
            >
                At least one digit
            </li>
        </ul>
    );
};

export default PasswordRequirements;
