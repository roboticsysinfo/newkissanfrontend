import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (

        <div className='container'>
            <div className='row justify-content-center'>
                <div className='col-lg-6 col-xs-12 col-sm-12'>

                    <div style={styles.container}>
                        <img src="assets/images/bg/404-error.svg" alt="Page Not Found 404" />
                        <p style={styles.message}>
                            Oops! The page you're looking for seems to have taken a wrong turn. Let's guide you back on track.
                        </p>
                        <Link className="btn btn-rounded-lg btn-success" to="/">Back to Home</Link>
                    </div>

                </div>
            </div>
        </div>

    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    title: {
        fontSize: '80px',
        fontWeight: 'bold',
        color: '#ff0000',
    },
    message: {
        fontSize: '16',
        color: '#333',
        marginBottom: '20px',
    },

};

export default PageNotFound;
