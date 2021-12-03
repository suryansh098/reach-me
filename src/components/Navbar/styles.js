import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    position: "sticky",
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: "rgb(0, 0, 0, 0.3)",
    backdropFilter: 'blur(10px)',
    marginBottom: '30px',
  },
  mainContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0.5rem 1rem',
    marginInline: '2.5rem',
    maxWidth: '1280px',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: '700',
    fontFamily: "'Dancing Script', cursive",
    letterSpacing: '1px',
    color: '#ffffff',
    textDecoration: 'none',
  },
  image: {
    marginRight: '0.5rem',
    transition: 'transform .5s ease-in-out',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  profile: {
    display: 'flex',
    position: 'relative',
    justifyContent: 'space-around',
    gap: 15
  },
  dropdown: {
    backgroundColor: '#fff',
    position: 'absolute',
    top: 'calc(100% + 10px)',
    right: 0,
    padding: 10,
    gap: 10,
    width: 'fit-content',
    minWidth: '12em'
  },
  outerGreeting: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 10px',
    color: 'crimson',
    fontWeight: 600
  },
  innerGreeting: {
    display: 'none',
    alignItems: 'center',
    padding: '5px 10px',
    color: 'crimson',
    fontWeight: 600
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: '1.5rem',
    '&:hover': {
      cursor: 'pointer',
      '& $image': {
        transform: 'rotate(360deg)'
      }
    }
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  dFlex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer'
  },
  [theme.breakpoints.down('md')]: {
    mainContainer: {
      marginInline: '0.5rem',
    }
  },
  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      marginInline: '0',
    },
    image: {
      margin: 0
    },
  },
  [theme.breakpoints.down('xs')]: {
    outerGreeting: {
      display: 'none'
    },
    innerGreeting: {
      display: 'flex'
    }
  }
}));