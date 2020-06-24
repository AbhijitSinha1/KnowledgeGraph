const handleResponse = res => (message, error, status) => res.status(status).send({ status, message, error });

const handleSuccess = res => (message, status = 200) => handleResponse(res)(message, null, status);

const handleError = res => (error, status = 500) => handleResponse(res)(null, error, status); 

module.exports = {
    handleSuccess,
    handleError
}