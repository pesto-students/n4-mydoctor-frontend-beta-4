import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { useStyles } from './styles';



const Flex = (props) => {
  const { id, children, className, style, onClick } = props;
  const classes = useStyles(props);
  return (
    <div
      id={id}
      className={`${classes.root} ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

Flex.defaultProps = {
  row: false,
  column: false,
  center: false,
  centerX: false,
  centerY: false,
  startX: false,
  endX: false,
  startY: false,
  endY: false,
  className: '',
  children: null,
  style: {},
};

export default Flex;
