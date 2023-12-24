import React from 'react';
import classNames from 'classnames/bind';

import styles from './spinner.module.css';

const cx = classNames.bind(styles);

type SpinnerProps = {
  spinnerWrapperStyle?: string;
  spinnerLoaderStyle?: string;
};

export const Spinner = (props: SpinnerProps) => {
  return (
    <div className={cx(styles.load3, props.spinnerWrapperStyle)} data-cy="spinner">
      <div className={cx(styles.loader, props.spinnerLoaderStyle)} />
    </div>
  );
};
