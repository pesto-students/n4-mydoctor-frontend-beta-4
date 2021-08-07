import { createStyles, makeStyles } from "@material-ui/core";

export const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 900,
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      flexDirection: "column",
      margin: '16px',
      height: '80vh',
    },
    main: {
      height: '100%',
      boxShadow: theme.shadows[19],
      borderRadius: '10px',
      overflow: 'hidden',
    },
    chatList: {
      backgroundColor: theme.palette.grey[100],
      overflowY:'auto',
      height:'100%'
    },
    statusTitle: {
      padding: "8px",
      fontSize: '0.9rem',
      fontWeight: theme.typography.fontWeightBold,
      color: theme.palette.primary.main,
    },
    chatCardWrapper: {
      cursor: 'pointer',
      padding: "8px 0",
      alignItems: 'center',
      borderBottom: `1px solid ${theme.palette.divider}`,
      '& h6': {
        fontSize: '0.8rem',
        fontWeight: theme.typography.fontWeightBold
      },
      '& p':{
        fontSize: '0.6rem'
      },
      '&:hover': {
        backgroundColor: theme.palette.grey[200],
      }
    },
    chatCardSelected: {
      backgroundColor: theme.palette.grey[300],
    },
    chatTitle: {
      fontSize: '0.8rem',
      fontWeight: theme.typography.fontWeightBold,
    },
    chartHeader: {
      border: `1px solid ${theme.palette.divider}`,
      width: '100%'
    },
    chatFooter: {
      width: '80%',
      marginBottom: '16px',
    },
    chatBody: {
      width: '100%',
      flex: 1,
      overflowY: 'auto',
      padding: '16px 0',
    },
    textboxWrapper: {
      flex: '1',
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: '100px',
      fontSize: '0.8rem',
      color: theme.palette.text.secondary,
      padding: '8px',
      fontWeight: 600,
      '&:focus': {
        outline: 'none'
      }
    },
    chatLeft: {
      alignItems: 'flex-start',
      justifyContent: 'center',
      '& h6': {
        fontSize: '0.7rem',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '5px',      
        borderBottomLeftRadius: '0px',
        minHeight: '40px',
        color: theme.palette.primary.contrastText,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 8px',
      },
      '& span': {
        color: theme.palette.grey[600],
      },
      marginLeft: '16px',
      marginBottom: '8px',      
    },
    chatRight: {
      alignItems: 'flex-end',
      justifyContent: 'center',
      '& h6': {
        fontSize: '0.7rem',
        backgroundColor: theme.palette.grey[300],
        borderRadius: '5px',      
        borderBottomRightRadius: '0px',      
        minHeight: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
      },      
      '& span': {
        color: theme.palette.grey[600],
      },
      marginRight: '16px',
      marginBottom: '8px',      
    },
    sendButton: {
      marginLeft: '8px',
      borderRadius: '100px',
    }
  })
);
