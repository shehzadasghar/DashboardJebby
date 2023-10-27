// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import Container from '@material-ui/core/Container';
// import Link from '@material-ui/core/Link';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     marginTop: theme.spacing(10),
//   },
//   image: {
//     width: '100%',
//     maxWidth: 400,
//   },
//   link: {
//     marginTop: theme.spacing(2),
//   },
// }));

// const Error=()=> {
//   const classes = useStyles();

//   return (
//     <Container className={classes.root}>
//       <Typography variant="h1">Error 404: Page Not Found</Typography>
//       <Typography variant="subtitle1">
//         Sorry, the page you were trying to access could not be found.
//       </Typography>

//       <Link href="/" className={classes.link}>
//         Go back to the homepage
//       </Link>
//     </Container>
//   );
// }

// export default Error;



import React from 'react';
function Error() {
    return (
        <>
            <div className='d-flex justify-content-center align-items-center'>
                <h1>Error 404 Page not found</h1>
            </div>
        </>
    );
}

export default Error;
