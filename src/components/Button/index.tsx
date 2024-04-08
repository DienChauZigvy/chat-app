import classNames from "classnames/bind";
import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  title: string;
  className?: string;
  onClick?: () => void;
  icon?: React.ElementType;
  el?: React.ReactNode | JSX.Element;

  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  title,
  className: externalClassName = "",
  onClick,
  icon: Icon,
  el,
  disabled,
  ...props
}) => {
  const cx = classNames.bind(styles);
  const buttonClass = cx(
    styles.button,
    ...(externalClassName ? externalClassName.split(" ") : []),
    {
      [styles.disabled]: disabled,
    },
  );

  // console.log("disabled", disabled);
  return (
    <button
      // disabled={disabled}
      {...props}
      className={buttonClass}
      onClick={onClick}
    >
      {Icon && <Icon size={24} className={styles.icon} />}
      {el && el}
      <div className={styles.title}>{title}</div>
    </button>
  );
};

export default Button;
