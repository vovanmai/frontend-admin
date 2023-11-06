class Constant {}

Constant.DEVELOPMENT = 'development'
Constant.LOCAL = 'local'
Constant.PRODUCTION = 'production'

Constant.TOKEN_KEY = 'access_token'

//Validation
Constant.REGEX_PHONE = '^(0)+([0-9]{9,10})$'
Constant.REGEX_CODE = '^[a-zA-Z0-9-_]+$'
Constant.REGEX_TAX_CODE = '^[0-9]{10}$'

// Http code
Constant.HTTP_OK = 200
Constant.HTTP_BAD_REQUEST = 400
Constant.HTTP_UNPROCESSABLE_ENTITY = 422
Constant.HTTP_UNAUTHORIZED = 401
Constant.HTTP_FORBIDDEN = 403
Constant.HTTP_NOT_FOUND = 404
Constant.HTTP_MAINTENANCE = 503
Constant.HTTP_BAD_GATEWAY = 502
Constant.HTTP_TIME_OUT = 504
Constant.HTTP_NOT_ACCEPTABLE = 406
Constant.HTTP_INTERNAL_SERVER_ERROR = 500

export default Constant
