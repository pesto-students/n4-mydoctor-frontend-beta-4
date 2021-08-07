import { makeStyles } from "@material-ui/core";

export const useStyles = makeStyles(() => ({
    root: ({
      row,
      column,
      center,
      centerX,
      centerY,
      startX,
      endX,
      startY,
      endY,
      full,
    }) => {
      return {
        display: 'flex',
        flexDirection: (row && 'row') || (column && 'column') || 'row',
        ...(center
          ? {
              justifyContent: 'center',
              alignItems: 'center',
            }
          : {}),
        ...(centerX ? { justifyContent: 'center' } : {}),
        ...(centerY ? { alignItems: 'center' } : {}),
        ...(startX ? { justifyContent: 'flex-start' } : {}),
        ...(startY ? { alignItems: 'flex-start' } : {}),
        ...(endX ? { justifyContent: 'flex-end' } : {}),
        ...(endY ? { alignItems: 'flex-end' } : {}),
        ...(full ? { width: '100%' } : {}),
      };
    },
  }));
  